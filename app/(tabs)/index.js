import React, { useEffect, useState } from 'react';
import { FlatList,StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import PokemonListItem from '../../components/PokemonListItem';

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
      renderItem={({ item }) => <PokemonListItem pokemon={item} />} 
    />
  );
}
const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});