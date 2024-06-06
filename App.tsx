import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from './app/(tabs)/_layout';

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
  <Stack.Navigator>
    {session && session.user ? (
      <>
        <Stack.Screen name="Account" component={Account} initialParams={{ session: session }} />
        <Stack.Screen name="TabNavigator" component={TabLayout} options={{ headerShown: false }} />
      </>
    ) : (
      <Stack.Screen name="Auth" component={Auth} />
    )}
  </Stack.Navigator>
</NavigationContainer>
  );
}