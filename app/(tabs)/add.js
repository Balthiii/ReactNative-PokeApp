import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'

export default function AddScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [talent, setTalent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/');
  const navigation = useNavigation();
  const route = useRoute();

  const { onAdd } = route.params || { onAdd: () => {} };
  
  const handleAddPokemon = async () => {
    const { error } = await supabase
      .from('pokemon')
      .insert([
        { name, type, size: parseFloat(size), weight: parseFloat(weight), category, talent, image_url: imageUrl }
      ]);

    if (error) {
      console.error('Erreur lors de l\'ajout du Pokémon :', error);
    } else {
      onAdd();
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />

      <Text style={styles.label}>Taille</Text>
      <TextInput style={styles.input} value={size} onChangeText={setSize} keyboardType="numeric" />

      <Text style={styles.label}>Poids</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />

      <Text style={styles.label}>Catégorie</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Text style={styles.label}>Talent</Text>
      <TextInput style={styles.input} value={talent} onChangeText={setTalent} />

      <Text style={styles.label}>URL de l'image</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />

      <Button title="Ajouter" onPress={handleAddPokemon} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
});