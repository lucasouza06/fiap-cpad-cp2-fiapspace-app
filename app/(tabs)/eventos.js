import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EventoCard from "../../components/EventoCard"; // CORRIGIDO: Agora sobe dois níveis (../../)
import { EventosContext } from "../_layout"; // CORRIGIDO: Agora sobe um nível (../)

export default function EventosScreen() {
  const { eventos } = useContext(EventosContext);

  if (eventos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.textoInfo}>Nenhum evento hoje!</Text>
        <Text style={styles.textoSub}>Todos os espaços estão livres.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={eventos}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        <EventoCard
          nome={item.nome}
          andar={item.andar}
          inicio={item.inicio}
          fim={item.fim}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  content: { 
    padding: 20 
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emoji: { 
    fontSize: 48, 
    marginBottom: 12 
  },
  textoInfo: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#fff" 
  },
  textoSub: { 
    fontSize: 14, 
    color: "#888", 
    marginTop: 6 
  },
});