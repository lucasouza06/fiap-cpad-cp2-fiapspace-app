import { View, Text, StyleSheet } from "react-native";

export default function EventoCard({ nome, andar, inicio, fim }) {
  return (
    <View style={styles.card}>
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{nome}</Text>
        <View style={styles.detalhes}>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>📍 {andar}º Andar</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>🕐 {inicio} — {fim}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141414",
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ED145B",
    borderWidth: 1,
    borderColor: "#222",
  },
  conteudo: {
    padding: 16,
  },
  nome: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  detalhes: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagTexto: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
});