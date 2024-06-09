
import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokemonListItem({ pokemon }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details', { pokemon })}>
      <Image source={{ uri: pokemon.image_url }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});