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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type PaymentScreenProp = StackNavigationProp<RootStackParamList, 'Payment'>;

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'cash';
  icon: string;
  name: string;
  details?: string;
  isDefault?: boolean;
}

const PaymentScreen = () => {
  const navigation = useNavigation<PaymentScreenProp>();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      icon: '💳',
      name: 'Visa ending in 1234',
      details: 'Expires 12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      icon: '💳',
      name: 'Mastercard ending in 5678',
      details: 'Expires 08/26',
    },
    {
      id: '3',
      type: 'wallet',
      icon: '💰',
      name: 'RideX Wallet',
      details: 'Balance: $45.50',
    },
    {
      id: '4',
      type: 'cash',
      icon: '💵',
      name: 'Cash',
      details: 'Pay driver directly',
    },
  ]);

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill all card details');
      return;
    }

    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      icon: '💳',
      name: `Card ending in ${cardNumber.slice(-4)}`,
      details: `Expires ${expiryDate}`,
    };

    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    Alert.alert('Success', 'Card added successfully!');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
    Alert.alert('Success', 'Default payment method updated');
  };

  const handleRemoveCard = (id: string) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(m => m.id !== id));
          },
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Payment Methods List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Payment Methods</Text>

          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                method.isDefault && styles.paymentCardDefault,
              ]}
              onLongPress={() =>
                method.type !== 'cash' && handleRemoveCard(method.id)
              }>
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>{method.name}</Text>
                {method.details && (
                  <Text style={styles.paymentDetails}>{method.details}</Text>
                )}
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
              {!method.isDefault && method.type !== 'cash' && (
                <TouchableOpacity
                  onPress={() => handleSetDefault(method.id)}
                  style={styles.setDefaultButton}>
                  <Text style={styles.setDefaultText}>Set Default</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Card Form */}
        {showAddCard ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add New Card</Text>

            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={16}
              placeholderTextColor="#999"
            />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowAddCard(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAddCard}>
                <Text style={styles.addButtonText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={() => setShowAddCard(true)}>
            <Text style={styles.addCardIcon}>+</Text>
            <Text style={styles.addCardText}>Add New Card</Text>
          </TouchableOpacity>
        )}

        {/* Payment Security Info */}
        <View style={styles.securityInfo}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  paymentCardDefault: {
    borderColor: '#667eea',
  },
  paymentIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  paymentDetails: {
    fontSize: 13,
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  setDefaultButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#667eea',
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addCardIcon: {
    fontSize: 24,
    color: '#667eea',
    marginRight: 8,
  },
  addCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#667eea',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  addButton: {
    backgroundColor: '#667eea',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  securityText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default PaymentScreen;
