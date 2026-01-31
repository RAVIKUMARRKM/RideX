import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type RideHistoryScreenProp = StackNavigationProp<RootStackParamList, 'RideHistory'>;

interface Ride {
  id: number;
  date: string;
  pickup: string;
  destination: string;
  fare: string;
  driver: string;
  rating: number;
}

const RideHistoryScreen = () => {
  const navigation = useNavigation<RideHistoryScreenProp>();

  const rides: Ride[] = [
    {
      id: 1,
      date: 'Today, 2:30 PM',
      pickup: '123 Main St, Downtown',
      destination: '456 Oak Ave, Uptown',
      fare: '$15.50',
      driver: 'John Smith',
      rating: 5,
    },
    {
      id: 2,
      date: 'Yesterday, 5:45 PM',
      pickup: '789 Elm St, Suburb',
      destination: '321 Pine Rd, City Center',
      fare: '$22.75',
      driver: 'Sarah Johnson',
      rating: 5,
    },
    {
      id: 3,
      date: 'Jan 28, 9:00 AM',
      pickup: '555 Maple Dr, North Side',
      destination: '777 Birch Ln, South Side',
      fare: '$18.25',
      driver: 'Mike Davis',
      rating: 4,
    },
  ];

  const renderRide = ({item}: {item: Ride}) => (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.fare}>{item.fare}</Text>
      </View>

      <View style={styles.route}>
        <View style={styles.routeIndicator}>
          <View style={[styles.dot, styles.dotPickup]} />
          <View style={styles.line} />
          <View style={[styles.dot, styles.dotDestination]} />
        </View>

        <View style={styles.addresses}>
          <Text style={styles.address} numberOfLines={1}>
            {item.pickup}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {item.destination}
          </Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <Text style={styles.driver}>🚗 {item.driver}</Text>
        <View style={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <Text key={i} style={styles.star}>
              {i < item.rating ? '⭐' : '☆'}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🚗</Text>
            <Text style={styles.emptyText}>No rides yet</Text>
            <Text style={styles.emptySubtext}>
              Your completed rides will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  list: {
    padding: 15,
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  fare: {
    fontSize: 18,
    fontWeight: '700',
    color: '#667eea',
  },
  route: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  routeIndicator: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotPickup: {
    backgroundColor: '#667eea',
  },
  dotDestination: {
    backgroundColor: '#764ba2',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  addresses: {
    flex: 1,
    justifyContent: 'space-between',
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  driver: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginLeft: 2,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default RideHistoryScreen;
