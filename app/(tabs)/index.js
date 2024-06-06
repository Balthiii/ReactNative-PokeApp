import React, { useEffect, useState } from 'react';
import { FlatList, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase'
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function IndexScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchPokemon = async () => {
    const { data, error } = await supabase
      .from('pokemon')
      .select('*');

    setPokemonList(data);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchPokemon();
    }
  }, [isFocused]);

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={pokemonList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details', { pokemon: item })}>
          <Image source={{ uri: item.image_url }} style={styles.pokemonImage} />
          <Text style={styles.pokemonName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
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