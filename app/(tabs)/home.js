import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AndarCard from "../../components/AndarCard";
import { EventosContext } from "../_layout";

export default function HomeScreen() {
  const { eventos } = useContext(EventosContext);

  function getStatusAndar(andar) {
    const agora = new Date();
    const horaAtual = agora.getHours().toString().padStart(2, "0") + ":" + agora.getMinutes().toString().padStart(2, "0");
    const eventoAtivo = eventos.find((ev) => ev.andar === String(andar) && ev.inicio <= horaAtual && ev.fim >= horaAtual);
    return eventoAtivo ? { ocupado: true, nomeEvento: eventoAtivo.nome, horario: eventoAtivo.fim } : { ocupado: false };
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitulo}>Status dos espaços agora</Text>
        <AndarCard andar={1} {...getStatusAndar(1)} />
        <AndarCard andar={2} {...getStatusAndar(2)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" // DEVE SER PRETO
  },
  content: { 
    padding: 20 
  },
  subtitulo: { 
    fontSize: 16, 
    color: "#888", 
    marginBottom: 20 
  },
});