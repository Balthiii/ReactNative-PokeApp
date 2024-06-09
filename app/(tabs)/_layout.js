import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeIcon from '../../assets/accueil.png';
import detailsIcon from '../../assets/details.png';
import editIcon from '../../assets/edit.png';
import addIcon from '../../assets/add.png';
import IndexScreen from './index.js';
import DetailsScreen from './details.js';
import EditScreen from './edit';
import AddScreen from './add.js';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Accueil"
        component={IndexScreen}
        options={{
          tabBarIcon: () => (
            <Image source={homeIcon} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarIcon: () => (
            <Image source={detailsIcon} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditScreen}
        options={{
          tabBarIcon: () => (
            <Image source={editIcon} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajouter"
        component={AddScreen}
        options={{
          tabBarIcon: () => (
            <Image source={addIcon} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}