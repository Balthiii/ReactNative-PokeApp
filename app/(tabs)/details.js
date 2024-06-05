import { View, Text, Image, StyleSheet,Button,ScrollView,TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
export default function DetailsScreen({ route }) {
  const { pokemon } = route.params;
  const navigation = useNavigation();
  
  const handleDelete = async () => {
    const { error } = await supabase
      .from('pokemon')
      .delete()
      .eq('id', pokemon.id);

    if (error) {
      alert(error.message);
    } else {
      Alert.alert("Succès", "Le Pokémon a été supprimé.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pokemon.image_url }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Text style={styles.infoText}>Type: {pokemon.type}</Text>
        <Text style={styles.infoText}>Taille: {pokemon.size} m</Text>
        <Text style={styles.infoText}>Poids: {pokemon.weight} kg</Text>
        <Text style={styles.infoText}>Catégorie: {pokemon.category}</Text>
        <Text style={styles.infoText}>Talent: {pokemon.talent}</Text>
        <Button title="Modifier" onPress={() => navigation.navigate('Edit', { pokemon })} />
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});