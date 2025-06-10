import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CountryCard = ({ country, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.flagContainer}>
        <Image 
          source={{ uri: country.flags.svg || country.flags.png }}
          style={styles.flag}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.countryName}>{country.name.common}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 'fit-content',
    padding: 4,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  flagContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 'auto',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
  },
});

export default CountryCard;
