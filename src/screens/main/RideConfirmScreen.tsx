import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type RideConfirmScreenProp = StackNavigationProp<
  RootStackParamList,
  'RideConfirm'
>;
type RideConfirmRouteProp = RouteProp<RootStackParamList, 'RideConfirm'>;

interface RideType {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: string;
  eta: string;
}

const RideConfirmScreen = () => {
  const navigation = useNavigation<RideConfirmScreenProp>();
  const route = useRoute<RideConfirmRouteProp>();
  const {pickup, destination} = route.params;

  const [selectedRide, setSelectedRide] = useState('1');
  const [promoCode, setPromoCode] = useState('');

  const rideTypes: RideType[] = [
    {
      id: '1',
      icon: '🚗',
      name: 'Economy Car',
      description: 'Affordable 4-wheeler • 2 min away',
      price: '$12.50',
      eta: '2 min',
    },
    {
      id: '2',
      icon: '🚙',
      name: 'Premium SUV',
      description: 'Luxury 4-wheeler • 3 min away',
      price: '$18.00',
      eta: '3 min',
    },
    {
      id: '3',
      icon: '🏍️',
      name: 'Bike',
      description: 'Quick 2-wheeler • 1 min away',
      price: '$6.50',
      eta: '1 min',
    },
    {
      id: '4',
      icon: '🛺',
      name: 'Auto Rickshaw',
      description: 'Budget 3-wheeler • 2 min away',
      price: '$4.00',
      eta: '2 min',
    },
  ];

  const handleRequestRide = () => {
    const selectedRideType = rideTypes.find(r => r.id === selectedRide);
    Alert.alert(
      'Ride Requested',
      `Your ${selectedRideType?.name} has been requested!\n\nThis is a demo. In the full app, you would see driver matching and ride tracking.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a ride</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Ride Types */}
        {rideTypes.map(ride => (
          <TouchableOpacity
            key={ride.id}
            style={[
              styles.rideOption,
              selectedRide === ride.id && styles.rideOptionSelected,
            ]}
            onPress={() => setSelectedRide(ride.id)}>
            <Text style={styles.rideIcon}>{ride.icon}</Text>
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{ride.name}</Text>
              <Text style={styles.rideDescription}>{ride.description}</Text>
            </View>
            <Text style={styles.ridePrice}>{ride.price}</Text>
          </TouchableOpacity>
        ))}

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <View style={styles.promoInput}>
            <Text style={styles.promoIcon}>🎟️</Text>
            <TextInput
              style={styles.promoTextInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.fareBreakdown}>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base fare</Text>
            <Text style={styles.fareValue}>$2.50</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Distance (5 km)</Text>
            <Text style={styles.fareValue}>$8.00</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Time (10 min)</Text>
            <Text style={styles.fareValue}>$2.00</Text>
          </View>
          <View style={[styles.fareRow, styles.fareTotal]}>
            <Text style={styles.fareTotalLabel}>Total</Text>
            <Text style={styles.fareTotalValue}>$12.50</Text>
          </View>
        </View>

        {/* Request Button */}
        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestRide}>
          <Text style={styles.requestButtonText}>
            Request {rideTypes.find(r => r.id === selectedRide)?.name}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rideOptionSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f8f9ff',
  },
  rideIcon: {
    fontSize: 36,
    marginRight: 15,
  },
  rideDetails: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  rideDescription: {
    fontSize: 13,
    color: '#666',
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  promoSection: {
    marginVertical: 20,
  },
  promoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
  },
  promoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  promoTextInput: {
    flex: 1,
    fontSize: 15,
  },
  applyButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  fareBreakdown: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fareLabel: {
    fontSize: 14,
    color: '#666',
  },
  fareValue: {
    fontSize: 14,
    color: '#333',
  },
  fareTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 5,
  },
  fareTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  fareTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  requestButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RideConfirmScreen;
