import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput,
  TouchableOpacity, ActivityIndicator,
  KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventosContext } from './_layout';

export default function LoginScreen() {
  const router = useRouter();
  const { setUsuario } = useContext(EventosContext);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({});
  const [form, setForm] = useState({ matricula: 'RM', password: '' });

  const handleChange = (name, value) => {
    setErros((e) => ({ ...e, [name]: null }));
    if (name === 'matricula') {
      if (!value.startsWith('RM')) {
        setForm({ ...form, matricula: 'RM' });
        return;
      }
      if (value.slice(2).length <= 6) {
        setForm({ ...form, matricula: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validar = () => {
    const novosErros = {};
    if (form.matricula.length !== 8)
      novosErros.matricula = "RM deve ter exatamente 6 números após 'RM'";
    if (!form.password)
      novosErros.password = 'Senha é obrigatória';
    return novosErros;
  };

  const handleLogin = () => {
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@fiapspace:usuario');
        if (!usuarioSalvo) {
          setErros({ geral: 'Nenhuma conta encontrada. Faça seu cadastro.' });
          setLoading(false);
          return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (usuario.matricula !== form.matricula) {
          setErros({ matricula: 'RM não encontrado.' });
          setLoading(false);
          return;
        }

        if (usuario.password !== form.password) {
          setErros({ password: 'Senha incorreta.' });
          setLoading(false);
          return;
        }

        setUsuario(usuario);
        router.replace('/home');
      } catch (e) {
        setErros({ geral: 'Erro ao fazer login. Tente novamente.' });
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.fiapText}>FIAP<Text style={styles.spaceText}>Space</Text></Text>
          <Text style={styles.subtitle}>Acesse sua conta institucional</Text>
        </View>

        <View style={styles.form}>
          {erros.geral && (
            <View style={styles.erroGeral}>
              <Text style={styles.erroGeralTexto}>{erros.geral}</Text>
            </View>
          )}

          <Text style={styles.label}>Registro de Matrícula</Text>
          <TextInput
            style={[styles.input, erros.matricula && styles.inputErro]}
            placeholder="RM000000"
            placeholderTextColor="#555"
            value={form.matricula}
            onChangeText={(val) => handleChange('matricula', val)}
          />
          {erros.matricula && <Text style={styles.erroTexto}>{erros.matricula}</Text>}

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, erros.password && styles.inputErro]}
            placeholder="Sua senha"
            placeholderTextColor="#555"
            secureTextEntry
            value={form.password}
            onChangeText={(val) => handleChange('password', val)}
          />
          {erros.password && <Text style={styles.erroTexto}>{erros.password}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#FFF" />
              : <Text style={styles.buttonText}>ENTRAR</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.replace('/cadastro-inicial')}
          >
            <Text style={styles.linkTexto}>
              Não tem conta? <Text style={styles.linkDestaque}>Criar cadastro</Text>
            </Text>
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
  erroGeral: {
    backgroundColor: 'rgba(237,20,91,0.1)',
    borderWidth: 1,
    borderColor: '#ED145B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  erroGeralTexto: { color: '#ED145B', fontSize: 13, textAlign: 'center' },
  label: { color: '#FFF', fontSize: 14, marginBottom: 8, fontWeight: '600', marginLeft: 4 },
  input: {
    backgroundColor: '#121212',
    color: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputErro: { borderColor: '#ED145B' },
  erroTexto: { color: '#ED145B', fontSize: 12, marginBottom: 14, marginLeft: 4 },
  button: {
    backgroundColor: '#ED145B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  linkButton: { alignItems: 'center', marginTop: 20 },
  linkTexto: { color: '#555', fontSize: 14 },
  linkDestaque: { color: '#ED145B', fontWeight: '700' },
});