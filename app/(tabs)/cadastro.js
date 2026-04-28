import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { EventosContext } from "../_layout"; // CORREÇÃO: Usando ../ para subir um nível

export default function CadastroScreen() {
  const router = useRouter();
  const { setEventos } = useContext(EventosContext);

  const [nome, setNome] = useState("");
  const [andar, setAndar] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [salvando, setSalvando] = useState(false);

  function salvarEvento() {
    if (!nome || !andar || !inicio || !fim) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const regexHora = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!regexHora.test(inicio) || !regexHora.test(fim)) {
      Alert.alert("Atenção", "Horários devem estar no formato HH:MM");
      return;
    }

    if (andar !== "1" && andar !== "2") {
      Alert.alert("Atenção", "Andar deve ser 1 ou 2");
      return;
    }

    setSalvando(true);
    
    // Simulação de salvamento local
    setTimeout(() => {
      setEventos((prev) => [...prev, { nome, andar, inicio, fim }]);
      setSalvando(false);
      Alert.alert("Sucesso!", "Evento cadastrado com sucesso.", [
        { text: "OK", onPress: () => router.replace("/home") },
      ]);
    }, 500);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Workshop de Design"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Andar (1 ou 2)</Text>
      <TextInput
        style={styles.input}
        value={andar}
        onChangeText={setAndar}
        placeholder="1"
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={1}
      />

      <Text style={styles.label}>Início (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={inicio}
        onChangeText={setInicio}
        placeholder="08:00"
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={5}
      />

      <Text style={styles.label}>Fim (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={fim}
        onChangeText={setFim}
        placeholder="10:00"
        placeholderTextColor="#666"
        keyboardType="numeric"
        maxLength={5}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarEvento}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Salvar Evento</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" }, // Fundo preto
  content: { padding: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#121212",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  botao: {
    backgroundColor: "#ED145B",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});