import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type EmergencyScreenProp = StackNavigationProp<RootStackParamList, 'Emergency'>;

const EmergencyScreen = () => {
  const navigation = useNavigation<EmergencyScreenProp>();
  const [sosActive, setSosActive] = useState(false);

  const emergencyContacts = [
    {id: '1', name: 'Police', number: '911', icon: '🚓'},
    {id: '2', name: 'Ambulance', number: '911', icon: '🚑'},
    {id: '3', name: 'Fire Department', number: '911', icon: '🚒'},
  ];

  const savedContacts = [
    {id: '1', name: 'Mom', number: '+1 234-567-8901'},
    {id: '2', name: 'Dad', number: '+1 234-567-8902'},
    {id: '3', name: 'Emergency Contact', number: '+1 234-567-8903'},
  ];

  const handleSOS = () => {
    if (sosActive) {
      Alert.alert('SOS Deactivated', 'Emergency alert has been cancelled');
      setSosActive(false);
    } else {
      Alert.alert(
        'SOS Activated!',
        'Emergency alert sent to your contacts and RideX support team.\n\nYour location is being shared in real-time.',
        [
          {
            text: 'OK',
            onPress: () => setSosActive(true),
          },
        ],
      );
    }
  };

  const handleCall = (number: string) => {
    Alert.alert(
      'Emergency Call',
      `Do you want to call ${number}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#d32f2f" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency</Text>
        <View style={styles.placeholder} />
      </View>

      {/* SOS Button */}
      <View style={styles.sosSection}>
        <Text style={styles.sosTitle}>Emergency SOS</Text>
        <Text style={styles.sosDescription}>
          Tap to alert emergency contacts and support team
        </Text>

        <TouchableOpacity
          style={[styles.sosButton, sosActive && styles.sosButtonActive]}
          onPress={handleSOS}
          activeOpacity={0.8}>
          <View style={[styles.sosInner, sosActive && styles.sosInnerActive]}>
            <Text style={styles.sosText}>SOS</Text>
          </View>
        </TouchableOpacity>

        {sosActive && (
          <View style={styles.activeAlert}>
            <Text style={styles.activeAlertText}>
              🚨 Emergency Alert Active
            </Text>
            <Text style={styles.activeAlertSubtext}>
              Location sharing enabled • Support team notified
            </Text>
          </View>
        )}
      </View>

      {/* Emergency Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Services</Text>

        {emergencyContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactCard}
            onPress={() => handleCall(contact.number)}>
            <Text style={styles.contactIcon}>{contact.icon}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
            <View style={styles.callButton}>
              <Text style={styles.callIcon}>📞</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Saved Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>

        {savedContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactCard}
            onPress={() => handleCall(contact.number)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {contact.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
            <View style={styles.callButton}>
              <Text style={styles.callIcon}>📞</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Safety Info */}
      <View style={styles.safetyInfo}>
        <Text style={styles.safetyText}>
          💡 Your safety is our priority. In case of emergency, we share your
          ride details and location with authorities.
        </Text>
      </View>
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
    backgroundColor: '#d32f2f',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  sosSection: {
    backgroundColor: '#fff',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sosTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  sosDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#d32f2f',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#f44336',
    shadowOpacity: 0.5,
  },
  sosInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#b71c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosInnerActive: {
    backgroundColor: '#c62828',
  },
  sosText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  activeAlert: {
    backgroundColor: '#ffebee',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  activeAlertText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 4,
  },
  activeAlertSubtext: {
    fontSize: 12,
    color: '#d32f2f',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 13,
    color: '#666',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 24,
  },
  safetyInfo: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
  },
  safetyText: {
    fontSize: 13,
    color: '#856404',
    textAlign: 'center',
  },
});

export default EmergencyScreen;
