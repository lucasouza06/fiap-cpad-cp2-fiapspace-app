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
          {usuario.foto
            ? <Image source={{ uri: usuario.foto }} style={styles.fotoImg} />
            : <Text style={styles.plus}>+</Text>
          }
        </TouchableOpacity>
        <Text style={styles.nome}>{usuario.nome || "Estudante"}</Text>
        <Text style={styles.rm}>{usuario.matricula || "RM000000"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>E-mail institucional</Text>
        <Text style={styles.cardValor}>{usuario.email || "usuario@fiap.com.br"}</Text>
      </View>

      <View style={styles.secaoEventos}>
        <Text style={styles.sectionLabel}>EVENTOS CRIADOS</Text>
        {eventos.length === 0 && (
          <Text style={styles.semEventos}>Nenhum evento criado ainda.</Text>
        )}
        {eventos.map((ev, i) => (
          <View key={i} style={styles.evCard}>
            <Text style={styles.evNome}>{ev.nome}</Text>
            <Text style={styles.evInfo}>Andar {ev.andar} • {ev.inicio} - {ev.fim}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  fotoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#141414',
    borderWidth: 2,
    borderColor: '#ED145B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  fotoImg: {
    width: '100%',
    height: '100%',
  },
  plus: {
    color: '#ED145B',
    fontSize: 36,
  },
  nome: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },
  rm: {
    color: '#ED145B',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#141414',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardLabel: {
    color: '#555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  cardValor: {
    color: '#FFF',
    fontSize: 15,
  },
  secaoEventos: {
    marginTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    color: '#444',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  semEventos: {
    color: '#444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  evCard: {
    backgroundColor: '#141414',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ED145B',
    borderWidth: 1,
    borderColor: '#222',
  },
  evNome: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  evInfo: {
    color: '#555',
    fontSize: 12,
    marginTop: 4,
  },
});