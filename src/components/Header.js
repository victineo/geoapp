import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, User, House } from 'lucide-react-native';

const Header = ({ 
  title = 'GeoApp', 
  showBackButton = false, 
  showProfileButton = false, 
  showHomeButton = false,
  onBackPress, 
  onProfilePress,
  onHomePress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
        )}
        {showHomeButton && (
          <TouchableOpacity onPress={onHomePress} style={styles.iconButton}>
            <House size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {showProfileButton && (
          <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
            <User size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    padding: 8,
  },
});

export default Header;
