import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EventoCard from "../../components/EventoCard";
import { EventosContext } from "../_layout";

export default function EventosScreen() {
  const { eventos } = useContext(EventosContext);

  if (eventos.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.logo}>FIAP<Text style={styles.logoBranco}>Space</Text></Text>
          <Text style={styles.logoSub}>Agenda do dia</Text>
        </View>
        <View style={styles.centro}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.textoInfo}>Nenhum evento hoje!</Text>
          <Text style={styles.textoSub}>Todos os espaços estão livres.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.logo}>FIAP<Text style={styles.logoBranco}>Space</Text></Text>
        <Text style={styles.logoSub}>Agenda do dia</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.content}
        data={eventos}
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={<Text style={styles.sectionLabel}>HOJE</Text>}
        renderItem={({ item }) => (
          <EventoCard
            nome={item.nome}
            andar={item.andar}
            inicio={item.inicio}
            fim={item.fim}
          />
        )}
      />
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
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  textoInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  textoSub: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
});