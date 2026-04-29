import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { EventosContext } from '../_layout';

export default function NovoEventoScreen() {
  const { eventos, setEventos } = useContext(EventosContext);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({});
  const [form, setForm] = useState({
    nome: '',
    andar: '',
    inicio: '',
    fim: '',
  });

  const handleChange = (name, value) => {
    setErros((e) => ({ ...e, [name]: null }));
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const { nome, andar, inicio, fim } = form;
    const novosErros = {};
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!nome.trim()) novosErros.nome = 'Nome do evento é obrigatório';
    if (!andar.trim()) {
      novosErros.andar = 'Andar é obrigatório';
    } else if (isNaN(andar) || parseInt(andar) < 1 || parseInt(andar) > 7) {
      novosErros.andar = 'Andar deve ser entre 1 e 7';
    }s
    if (!inicio) novosErros.inicio = 'Horário de início é obrigatório';
    else if (!horaRegex.test(inicio)) novosErros.inicio = 'Use o formato HH:MM (ex: 14:00)';
    if (!fim) novosErros.fim = 'Horário de fim é obrigatório';
    else if (!horaRegex.test(fim)) novosErros.fim = 'Use o formato HH:MM (ex: 18:00)';
    if (inicio && fim && inicio >= fim) novosErros.fim = 'O fim deve ser depois do início';

    return novosErros;
  };

  const handleSalvar = () => {
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setEventos([...eventos, {
        nome: form.nome.trim(),
        andar: form.andar.trim(),
        inicio: form.inicio.trim(),
        fim: form.fim.trim(),
      }]);
      setLoading(false);
      Alert.alert('Sucesso!', 'Evento cadastrado com sucesso!');
      setForm({ nome: '', andar: '', inicio: '', fim: '' });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.topbar}>
        <Text style={styles.logo}>FIAP<Text style={styles.logoBranco}>Space</Text></Text>
        <Text style={styles.logoSub}>Reservar um espaço</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.label}>NOME DO EVENTO</Text>
          <TextInput
            style={[styles.input, erros.nome && styles.inputErro]}
            placeholder="Ex: Hackathon FIAP"
            placeholderTextColor="#333"
            value={form.nome}
            onChangeText={(val) => handleChange('nome', val)}
          />
          {erros.nome && <Text style={styles.erroTexto}>{erros.nome}</Text>}

          <Text style={styles.label}>ANDAR</Text>
          <TextInput
            style={[styles.input, erros.andar && styles.inputErro]}
            placeholder="Andar deve ser entre 1 e 7"
            placeholderTextColor="#333"
            keyboardType="numeric"
            maxLength={1}
            value={form.andar}
            onChangeText={(val) => handleChange('andar', val)}
          />
          {erros.andar && <Text style={styles.erroTexto}>{erros.andar}</Text>}

          <Text style={styles.label}>HORÁRIO DE INÍCIO</Text>
          <TextInput
            style={[styles.input, erros.inicio && styles.inputErro]}
            placeholder="Ex: 14:00"
            placeholderTextColor="#333"
            value={form.inicio}
            maxLength={5}
            onChangeText={(val) => handleChange('inicio', val)}
          />
          {erros.inicio && <Text style={styles.erroTexto}>{erros.inicio}</Text>}

          <Text style={styles.label}>HORÁRIO DE FIM</Text>
          <TextInput
            style={[styles.input, erros.fim && styles.inputErro]}
            placeholder="Ex: 18:00"
            placeholderTextColor="#333"
            value={form.fim}
            maxLength={5}
            onChangeText={(val) => handleChange('fim', val)}
          />
          {erros.fim && <Text style={styles.erroTexto}>{erros.fim}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#FFF" />
              : <Text style={styles.buttonText}>RESERVAR ESPAÇO</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  topbar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logo: {
    color: '#ED145B',
    fontSize: 22,
    fontWeight: '900',
  },
  logoBranco: {
    color: '#fff',
  },
  logoSub: {
    color: '#555',
    fontSize: 12,
    marginTop: 2,
  },
  scrollContent: {
    padding: 25,
    flexGrow: 1,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#141414',
    color: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    fontSize: 15,
  },
  inputErro: {
    borderColor: '#ED145B',
  },
  erroTexto: {
    color: '#ED145B',
    fontSize: 12,
    marginBottom: 14,
    marginLeft: 2,
  },
  button: {
    backgroundColor: '#ED145B',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
});