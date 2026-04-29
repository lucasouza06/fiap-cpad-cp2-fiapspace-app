import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AndarCard from "../../components/AndarCard";
import { EventosContext } from "../_layout";

const ANDARES = [1, 2, 3, 4, 5, 6, 7];

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
        <Text style={styles.sectionLabel}>ANDARES</Text>
        {ANDARES.map((andar) => (
          <AndarCard key={andar} andar={andar} {...getStatusAndar(andar)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  topbar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  logo: {
    color: "#ED145B",
    fontSize: 22,
    fontWeight: "900",
  },
  logoBranco: {
    color: "#fff",
  },
  logoSub: {
    color: "#555",
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  sectionLabel: {
    color: "#444",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 14,
  },
});