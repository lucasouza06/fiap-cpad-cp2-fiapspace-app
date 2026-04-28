import { View, Text, StyleSheet } from "react-native";

export default function EventoCard({ nome, andar, inicio, fim }) {
  return (
    <View style={styles.card}>
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>📍 {andar}º Andar</Text>
        <Text style={styles.detalhe}>
          🕐 {inicio} — {fim}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121212", // Fundo cinza bem escuro
    borderRadius: 12,
    marginBottom: 12,
    // Borda lateral rosa para manter a identidade visual
    borderLeftWidth: 5,
    borderLeftColor: "#ED145B", 
    // Sombras ajustadas para fundo escuro
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#222",
  },
  conteudo: {
    padding: 16,
  },
  nome: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#FFFFFF" // Nome em branco
  },
  detalhe: { 
    fontSize: 14, 
    color: "#AAAAAA", // Cinza claro para os detalhes
    marginTop: 6 
  },
});