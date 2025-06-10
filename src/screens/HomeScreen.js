import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TextInput,
  SafeAreaView 
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useCountries } from '../hooks/useCountries';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { countries, loading, error, searchCountries } = useCountries();

  const handleSearch = (text) => {
    setSearchTerm(text);
    searchCountries(text);
  };

  const navigateToCountry = (country) => {
    navigation.navigate('Country', { countryCode: country.cca3 });
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const renderCountryItem = ({ item }) => (
    <CountryCard 
      country={item} 
      onPress={() => navigateToCountry(item)} 
    />
  );

  if (loading && countries.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="GeoApp"
        showProfileButton={true}
        onProfilePress={navigateToProfile}
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar países..."
            value={searchTerm}
            onChangeText={handleSearch}
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar países: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={countries}
          renderItem={({ item }) => (
            <CountryCard 
              country={item} 
              onPress={() => navigateToCountry(item)} 
            />
          )}
          keyExtractor={(item) => item.cca3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
