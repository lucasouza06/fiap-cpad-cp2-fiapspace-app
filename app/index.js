import React, { useState, useContext } from 'react'; // Adicionado useContext
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { EventosContext } from './_layout'; // Importação do contexto necessária

export default function RegisterScreen() {
  const router = useRouter();
  const { setUsuario } = useContext(EventosContext); // Puxa a função para salvar os dados
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    nome: '',
    matricula: 'RM', 
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    if (name === 'matricula') {
      if (!value.startsWith('RM')) {
        setForm({ ...form, matricula: 'RM' });
        return;
      }
      const apenasNumeros = value.slice(2);
      if (apenasNumeros.length <= 6) {
        setForm({ ...form, matricula: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validarCampos = () => {
    const { nome, matricula, email, password } = form;

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nomeRegex.test(nome)) {
      Alert.alert("Erro no Nome", "O nome deve conter apenas letras.");
      return false;
    }

    if (matricula.length !== 8) {
      Alert.alert("Erro no RM", "O Registro de Matrícula deve ter exatamente 6 números após o 'RM'.");
      return false;
    }

    if (!email.toLowerCase().endsWith('@fiap.com.br')) {
      Alert.alert("E-mail Inválido", "É obrigatório o uso do e-mail @fiap.com.br");
      return false;
    }

    const senhaRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!senhaRegex.test(password)) {
      Alert.alert("Senha Fraca", "A senha deve ter no mínimo 8 dígitos e um caractere especial.");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (!validarCampos()) return;

    setLoading(true);

    setTimeout(() => {
      // SALVA OS DADOS NO CONTEXTO GLOBAL ANTES DE MUDAR DE TELA
      setUsuario({
        nome: form.nome,
        matricula: form.matricula,
        email: form.email,
      });

      setLoading(false);
      Alert.alert("Sucesso", "Cadastro realizado institucionalmente!", [
        { text: "Entrar", onPress: () => router.replace('/home') }
      ]);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
            <Text style={styles.fiapText}>FIAP<Text style={styles.spaceText}>Space</Text></Text>
            <Text style={styles.subtitle}>Crie sua conta institucional</Text>
        </View>

        <View style={styles.form}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Betano da Silva"
              placeholderTextColor="#555"
              value={form.nome}
              onChangeText={(val) => handleChange('nome', val)}
            />

            <Text style={styles.label}>Registro de Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="RM000000"
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={form.matricula}
              onChangeText={(val) => handleChange('matricula', val)}
            />

            <Text style={styles.label}>E-mail Institucional</Text>
            <TextInput
              style={styles.input}
              placeholder="seu_email@fiap.com.br"
              placeholderTextColor="#555"
              autoCapitalize="none"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(val) => handleChange('email', val)}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="8+ dígitos e caractere especial"
              placeholderTextColor="#555"
              secureTextEntry
              value={form.password}
              onChangeText={(val) => handleChange('password', val)}
            />

            <TouchableOpacity 
              style={[styles.button, loading && { opacity: 0.7 }]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>CONCLUIR CADASTRO</Text>
              )}
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 25, justifyContent: 'center', flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  fiapText: { color: '#ED145B', fontSize: 42, fontWeight: '900' },
  spaceText: { color: '#FFF' },
  subtitle: { color: '#888', fontSize: 16, marginTop: 5 },
  form: { width: '100%' },
  label: { color: '#FFF', fontSize: 14, marginBottom: 8, fontWeight: '600', marginLeft: 4 },
  input: { 
    backgroundColor: '#121212', 
    color: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  button: { 
    backgroundColor: '#ED145B', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 15 
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});