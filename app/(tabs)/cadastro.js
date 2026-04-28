import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { EventosContext } from '../_layout';

export default function RegisterScreen() {
  const router = useRouter();
  const { setUsuario } = useContext(EventosContext);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const [form, setForm] = useState({
    nome: '',
    matricula: 'RM',
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setErros((e) => ({ ...e, [name]: null }));
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

  const validar = () => {
    const { nome, matricula, email, password } = form;
    const novosErros = {};

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nome.trim()) {
      novosErros.nome = 'Nome completo é obrigatório';
    } else if (!nomeRegex.test(nome)) {
      novosErros.nome = 'O nome deve conter apenas letras';
    }

    if (matricula.length !== 8) {
      novosErros.matricula = 'O RM deve ter exatamente 6 números após "RM"';
    }

    if (!email) {
      novosErros.email = 'E-mail é obrigatório';
    } else if (!email.toLowerCase().endsWith('@fiap.com.br')) {
      novosErros.email = 'Use seu e-mail institucional @fiap.com.br';
    }

    const senhaRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password) {
      novosErros.password = 'Senha é obrigatória';
    } else if (!senhaRegex.test(password)) {
      novosErros.password = 'Mínimo 8 caracteres e 1 caractere especial (!@#$%^&*)';
    }

    return novosErros;
  };

  const handleRegister = () => {
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setUsuario({
        nome: form.nome,
        matricula: form.matricula,
        email: form.email,
      });
      setLoading(false);
      setSucesso(true);
      setTimeout(() => router.replace('/home'), 1500);
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

        {sucesso && (
          <View style={styles.sucessoBox}>
            <Text style={styles.sucessoTexto}>Cadastro realizado! Entrando...</Text>
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[styles.input, erros.nome && styles.inputErro]}
            placeholder="Ex: João da Silva"
            placeholderTextColor="#555"
            value={form.nome}
            onChangeText={(val) => handleChange('nome', val)}
          />
          {erros.nome && <Text style={styles.erroTexto}>{erros.nome}</Text>}

          <Text style={styles.label}>Registro de Matrícula</Text>
          <TextInput
            style={[styles.input, erros.matricula && styles.inputErro]}
            placeholder="RM000000"
            placeholderTextColor="#555"
            value={form.matricula}
            onChangeText={(val) => handleChange('matricula', val)}
          />
          {erros.matricula && <Text style={styles.erroTexto}>{erros.matricula}</Text>}

          <Text style={styles.label}>E-mail Institucional</Text>
          <TextInput
            style={[styles.input, erros.email && styles.inputErro]}
            placeholder="seu_email@fiap.com.br"
            placeholderTextColor="#555"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => handleChange('email', val)}
          />
          {erros.email && <Text style={styles.erroTexto}>{erros.email}</Text>}

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, erros.password && styles.inputErro]}
            placeholder="8+ caracteres e 1 especial"
            placeholderTextColor="#555"
            secureTextEntry
            value={form.password}
            onChangeText={(val) => handleChange('password', val)}
          />
          {erros.password && <Text style={styles.erroTexto}>{erros.password}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#FFF" />
              : <Text style={styles.buttonText}>CONCLUIR CADASTRO</Text>
            }
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
  sucessoBox: {
    backgroundColor: '#0a2a0a',
    borderWidth: 1,
    borderColor: '#4CD964',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  sucessoTexto: { color: '#4CD964', fontWeight: '700', fontSize: 14 },
  form: { width: '100%' },
  label: { color: '#FFF', fontSize: 14, marginBottom: 8, fontWeight: '600', marginLeft: 4 },
  input: {
    backgroundColor: '#121212',
    color: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#333'
  },
  inputErro: { borderColor: '#ED145B' },
  erroTexto: { color: '#ED145B', fontSize: 12, marginBottom: 14, marginLeft: 4 },
  button: {
    backgroundColor: '#ED145B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});
