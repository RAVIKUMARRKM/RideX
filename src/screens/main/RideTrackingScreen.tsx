import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type RideTrackingScreenProp = StackNavigationProp<RootStackParamList, 'RideTracking'>;
type RideTrackingRouteProp = RouteProp<RootStackParamList, 'RideTracking'>;

const RideTrackingScreen = () => {
  const navigation = useNavigation<RideTrackingScreenProp>();
  const route = useRoute<RideTrackingRouteProp>();
  const {rideId, pickup, destination} = route.params;

  const [driverLocation, setDriverLocation] = useState({
    latitude: pickup.latitude + 0.002,
    longitude: pickup.longitude + 0.002,
  });
  const [rideStatus, setRideStatus] = useState('arriving'); // arriving, picked_up, completed

  useEffect(() => {
    // Simulate driver movement
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.0005,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.0005,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            Alert.alert('Ride Cancelled', 'Your ride has been cancelled.');
            navigation.navigate('Home');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: (pickup.latitude + destination.latitude) / 2,
          longitude: (pickup.longitude + destination.longitude) / 2,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {/* Pickup Marker */}
        <Marker
          coordinate={pickup}
          title="Pickup"
          pinColor="#667eea"
        />

        {/* Destination Marker */}
        <Marker
          coordinate={destination}
          title="Destination"
          pinColor="#764ba2"
        />

        {/* Driver Marker */}
        <Marker
          coordinate={driverLocation}
          title="Driver"
          description="John Smith">
          <View style={styles.driverMarker}>
            <Text style={styles.driverMarkerText}>🚗</Text>
          </View>
        </Marker>

        {/* Route Line */}
        <Polyline
          coordinates={[pickup, destination]}
          strokeColor="#667eea"
          strokeWidth={3}
        />
      </MapView>

      {/* Driver Info Card */}
      <View style={styles.driverCard}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.avatarText}>JS</Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>John Smith</Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>⭐ 4.8</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.vehicleInfo}>Toyota Camry • ABC-1234</Text>
            </View>
          </View>
          <View style={styles.eta}>
            <Text style={styles.etaTime}>2 min</Text>
            <Text style={styles.etaLabel}>away</Text>
          </View>
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            {rideStatus === 'arriving'
              ? '🚗 Driver is on the way to your location'
              : rideStatus === 'picked_up'
              ? '🎯 On the way to destination'
              : '✅ Arrived at destination'}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancelRide}>
            <Text style={styles.actionIcon}>❌</Text>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  driverMarkerText: {
    fontSize: 24,
  },
  driverCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
  },
  separator: {
    marginHorizontal: 6,
    color: '#999',
  },
  vehicleInfo: {
    fontSize: 13,
    color: '#666',
  },
  eta: {
    alignItems: 'center',
  },
  etaTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#667eea',
  },
  etaLabel: {
    fontSize: 12,
    color: '#999',
  },
  status: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#ffe5e5',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});

export default RideTrackingScreen;
