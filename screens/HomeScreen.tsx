import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import supabase from './supabaseClient';

export default function HomeScreen({ route, navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setUser(session.user);
    } else {
      navigation.navigate('Login');
    }

    const { user: userFromRoute } = route.params || {};
    if (userFromRoute) {
      setUser(userFromRoute);
    }
  }, [route.params]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Parabéns {user.email}, você está autenticado com sucesso!</Text>
          <Button title="Sair" onPress={handleLogout} />
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
