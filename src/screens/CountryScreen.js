import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  SafeAreaView 
} from 'react-native';
import { countriesApi } from '../services/countriesApi';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const CountryScreen = ({ route, navigation }) => {
  const { countryCode } = route.params;
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountryDetails();
  }, [countryCode]);

  const fetchCountryDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await countriesApi.getCountryByCode(countryCode);
      setCountry(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !country) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="GeoApp"
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'País não encontrado'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Extrair informações do país
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies ? 
    Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol || ''})`).join(', ') : 'N/A';
  const capital = country.capital ? country.capital[0] : 'N/A';

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="GeoApp"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.flagContainer}>
          <Image 
            source={{ uri: country.flags.svg || country.flags.png }}
            style={styles.flag}
            resizeMode="contain"
          />
          <Text style={styles.countryName}>{country.name.common}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          
          <View style={styles.infoSection}>
            <InfoItem label="Idiomas Oficiais" value={languages} />
            <InfoItem label="Moeda Oficial" value={currencies} />
            <InfoItem label="Região" value={country.region || 'N/A'} />
            <InfoItem label="Sub-região" value={country.subregion || 'N/A'} />
            <InfoItem label="Capital" value={capital} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
  },
  flagContainer: {
    height: 200,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    width: '100%',
    maxHeight: 224, // 14rem
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countryName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoSection: {
    gap: 16,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
    gap: 2,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default CountryScreen;
