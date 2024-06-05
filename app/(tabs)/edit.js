import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase  } from '../../lib/supabase';

export default function EditScreen({ route }) {
  const { pokemon } = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState(pokemon.name);
  const [type, setType] = useState(pokemon.type);
  const [size, setSize] = useState(pokemon.size.toString());
  const [weight, setWeight] = useState(pokemon.weight.toString());
  const [category, setCategory] = useState(pokemon.category);
  const [talent, setTalent] = useState(pokemon.talent);
  const [imageUrl, setImageUrl] = useState(pokemon.image_url);

  useEffect(() => {
    setName(pokemon.name);
    setType(pokemon.type);
    setSize(pokemon.size.toString());
    setWeight(pokemon.weight.toString());
    setCategory(pokemon.category);
    setTalent(pokemon.talent);
    setImageUrl(pokemon.image_url);
  }, [pokemon]);

  const handleSave = async () => {
    const { error } = await supabase
      .from('pokemon')
      .update({
        name: name,
        type: type,
        size: parseFloat(size),
        weight: parseFloat(weight),
        category: category,
        talent: talent,
        image_url: imageUrl,
      })
      .eq('id', pokemon.id);
  
    if (error) {
      console.error('Erreur lors de la mise à jour du Pokémon :', error);
    } else {
      navigation.navigate('Accueil');
    }
  };
  return (
    <ScrollView style={styles.container}>
  <Image source={{ uri: pokemon.image_url }} style={styles.pokemonImage} />
  <Text style={styles.label}>Nom</Text>
  <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom" />
  <Text style={styles.label}>Type</Text>
  <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="Type" />
  <Text style={styles.label}>Taille</Text>
  <TextInput style={styles.input} value={size} onChangeText={setSize} placeholder="Taille" keyboardType="numeric" />
  <Text style={styles.label}>Poids</Text>
  <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Poids" keyboardType="numeric" />
  <Text style={styles.label}>Catégorie</Text>
  <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Catégorie" />
  <Text style={styles.label}>Talent</Text>
  <TextInput style={styles.input} value={talent} onChangeText={setTalent} placeholder="Talent" />
  <Text style={styles.label}>URL de l'image</Text>
  <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
  <View style={styles.buttonContainer}>
    <Button title="Sauvegarder" onPress={handleSave} />   
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginBottom: 40,
  },
});