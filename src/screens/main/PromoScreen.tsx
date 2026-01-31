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

type PromoScreenProp = StackNavigationProp<RootStackParamList, 'Promo'>;

const PromoScreen = () => {
  const navigation = useNavigation<PromoScreenProp>();
  const [promoCode, setPromoCode] = useState('');
  const [referralCode] = useState('RIDE2024XYZ');

  const availablePromos = [
    {
      id: '1',
      code: 'FIRST50',
      title: '50% OFF First Ride',
      description: 'Get 50% off on your first ride up to $10',
      discount: '50%',
      expiry: 'Valid till Feb 28, 2024',
    },
    {
      id: '2',
      code: 'SAVE20',
      title: '$20 OFF',
      description: 'Save $20 on rides above $30',
      discount: '$20',
      expiry: 'Valid for 7 days',
    },
    {
      id: '3',
      code: 'WEEKEND',
      title: 'Weekend Special',
      description: '30% off on weekend rides',
      discount: '30%',
      expiry: 'Every weekend',
    },
  ];

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      Alert.alert('Error', 'Please enter a promo code');
      return;
    }

    const promo = availablePromos.find(
      p => p.code.toLowerCase() === promoCode.toLowerCase(),
    );

    if (promo) {
      Alert.alert(
        'Promo Applied!',
        `${promo.title} - ${promo.description}`,
        [{text: 'OK', onPress: () => navigation.goBack()}],
      );
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code');
    }
  };

  const handleShareReferral = () => {
    Alert.alert(
      'Share Referral Code',
      `Your referral code: ${referralCode}\n\nShare this code with friends and earn $10 for each successful referral!`,
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
        <Text style={styles.headerTitle}>Promos & Referrals</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Apply Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apply Promo Code</Text>

          <View style={styles.promoInput}>
            <TextInput
              style={styles.input}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyPromo}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Promos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Promos</Text>

          {availablePromos.map(promo => (
            <TouchableOpacity
              key={promo.id}
              style={styles.promoCard}
              onPress={() => {
                setPromoCode(promo.code);
              }}>
              <View style={styles.promoDiscount}>
                <Text style={styles.discountText}>{promo.discount}</Text>
                <Text style={styles.offText}>OFF</Text>
              </View>

              <View style={styles.promoInfo}>
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <Text style={styles.promoDescription}>
                  {promo.description}
                </Text>
                <Text style={styles.promoExpiry}>{promo.expiry}</Text>
                <View style={styles.promoCode}>
                  <Text style={styles.codeLabel}>Code: </Text>
                  <Text style={styles.codeValue}>{promo.code}</Text>
                </View>
              </View>

              <Text style={styles.promoArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Referral Section */}
        <View style={styles.referralSection}>
          <Text style={styles.referralIcon}>🎁</Text>
          <Text style={styles.referralTitle}>Refer & Earn</Text>
          <Text style={styles.referralDescription}>
            Invite your friends and earn $10 for each successful referral!
          </Text>

          <View style={styles.referralCode}>
            <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeBoxText}>{referralCode}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareReferral}>
            <Text style={styles.shareButtonText}>📤 Share Code</Text>
          </TouchableOpacity>

          <View style={styles.referralStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Referred</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$120</Text>
              <Text style={styles.statLabel}>Earned</Text>
            </View>
          </View>
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
  promoInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  promoCard: {
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
  promoDiscount: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  discountText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  offText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  promoInfo: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  promoDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  promoExpiry: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  promoCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 12,
    color: '#999',
  },
  codeValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#667eea',
  },
  promoArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  referralSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referralIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  referralTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  referralDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  referralCode: {
    width: '100%',
    marginBottom: 16,
  },
  referralCodeLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
    textAlign: 'center',
  },
  codeBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#667eea',
    borderStyle: 'dashed',
  },
  codeBoxText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#667eea',
    textAlign: 'center',
    letterSpacing: 2,
  },
  shareButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  referralStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
});

export default PromoScreen;
