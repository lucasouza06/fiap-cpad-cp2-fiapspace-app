import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { EventosContext } from '../_layout';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen() {
  const { usuario, setUsuario, eventos } = useContext(EventosContext);

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Erro", "Precisamos de permissão para acessar suas fotos.");
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!resultado.canceled) {
      setUsuario({ ...usuario, foto: resultado.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.fotoCircle} onPress={selecionarImagem}>
          {usuario.foto ? <Image source={{ uri: usuario.foto }} style={styles.fotoImg} /> : <Text style={styles.plus}>+</Text>}
        </TouchableOpacity>
        <Text style={styles.nome}>{usuario.nome || "Estudante"}</Text>
        <Text style={styles.rm}>{usuario.matricula || "RM000000"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>E-mail Institucional</Text>
        <Text style={styles.valor}>{usuario.email || "usuario@fiap.com.br"}</Text>
      </View>
      <Text style={styles.titulo}>Eventos Criados</Text>
      {eventos.map((ev, i) => (
        <View key={i} style={styles.evCard}>
          <Text style={styles.evNome}>{ev.nome}</Text>
          <Text style={styles.evInfo}>Andar {ev.andar} • {ev.inicio} - {ev.fim}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { alignItems: 'center', padding: 40, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
  fotoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#121212', borderWidth: 2, borderColor: '#ed145b', justifyContent: 'center', alignItems: 'center', marginBottom: 15, overflow: 'hidden' },
  fotoImg: { width: '100%', height: '100%' },
  plus: { color: '#ed145b', fontSize: 40 },
  nome: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  rm: { color: '#ed145b', fontSize: 16 },
  card: { backgroundColor: '#121212', margin: 20, padding: 20, borderRadius: 15 },
  label: { color: '#888', fontSize: 12 },
  valor: { color: '#FFF', fontSize: 16 },
  titulo: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  evCard: { backgroundColor: '#121212', padding: 15, marginHorizontal: 20, marginTop: 10, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#ed145b' },
  evNome: { color: '#FFF', fontWeight: 'bold' },
  evInfo: { color: '#888', fontSize: 12 }
});