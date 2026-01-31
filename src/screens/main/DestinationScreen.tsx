import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type DestinationScreenProp = StackNavigationProp<
  RootStackParamList,
  'Destination'
>;

interface Suggestion {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  latitude: number;
  longitude: number;
}

const DestinationScreen = () => {
  const navigation = useNavigation<DestinationScreenProp>();
  const [pickup, setPickup] = useState('Current Location');
  const [destination, setDestination] = useState('');

  const suggestions: Suggestion[] = [
    {
      id: '1',
      icon: '📌',
      title: 'Downtown Shopping Center',
      subtitle: '123 Market Street, 2.5 km away',
      latitude: 37.7905,
      longitude: -122.4305,
    },
    {
      id: '2',
      icon: '⭐',
      title: 'City Airport',
      subtitle: 'Airport Road, 15 km away',
      latitude: 37.6213,
      longitude: -122.3790,
    },
    {
      id: '3',
      icon: '🏥',
      title: 'Central Hospital',
      subtitle: '45 Health Avenue, 5 km away',
      latitude: 37.7886,
      longitude: -122.4247,
    },
    {
      id: '4',
      icon: '🏨',
      title: 'Grand Hotel',
      subtitle: '78 Luxury Lane, 8 km away',
      latitude: 37.7949,
      longitude: -122.4194,
    },
  ];

  const handleSelectDestination = (suggestion: Suggestion) => {
    navigation.navigate('RideConfirm', {
      pickup: {
        latitude: 37.78825,
        longitude: -122.4324,
        address: pickup,
      },
      destination: {
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
        address: suggestion.title,
      },
    });
  };

  const renderSuggestion = ({item}: {item: Suggestion}) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectDestination(item)}>
      <Text style={styles.suggestionIcon}>{item.icon}</Text>
      <View style={styles.suggestionText}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
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

        <View style={styles.inputsContainer}>
          <View style={styles.routeLine} />
          <View style={[styles.routeDot, styles.routeDotPickup]} />
          <View style={[styles.routeDot, styles.routeDotDestination]} />

          <TextInput
            style={styles.input}
            value={pickup}
            editable={false}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Where to?"
            value={destination}
            onChangeText={setDestination}
            autoFocus
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.suggestionsList}
      />
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backIcon: {
    fontSize: 32,
    color: '#333',
  },
  inputsContainer: {
    flex: 1,
    position: 'relative',
    paddingLeft: 40,
  },
  routeLine: {
    position: 'absolute',
    left: 19,
    top: 30,
    bottom: 30,
    width: 2,
    backgroundColor: '#667eea',
  },
  routeDot: {
    position: 'absolute',
    left: 13,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#fff',
  },
  routeDotPickup: {
    top: 15,
    backgroundColor: '#667eea',
  },
  routeDotDestination: {
    bottom: 15,
    backgroundColor: '#764ba2',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  suggestionsList: {
    padding: 20,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  suggestionSubtitle: {
    fontSize: 13,
    color: '#999',
  },
});

export default DestinationScreen;
