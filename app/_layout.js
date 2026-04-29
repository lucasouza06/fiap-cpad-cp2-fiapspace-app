import { Stack } from "expo-router";
import { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EventosContext = createContext(null);

const STORAGE_KEYS = {
  usuario: '@fiapspace:usuario',
  eventos: '@fiapspace:eventos',
};

export default function RootLayout() {
  const [eventos, setEventos] = useState([]);
  const [usuario, setUsuario] = useState({
    nome: '', matricula: '', email: '', foto: null,
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(STORAGE_KEYS.usuario);
        const eventosSalvos = await AsyncStorage.getItem(STORAGE_KEYS.eventos);
        if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
        if (eventosSalvos) setEventos(JSON.parse(eventosSalvos));
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    }
    carregarDados();
  }, []);

  async function salvarUsuario(novoUsuario) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.usuario, JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
    } catch (e) {
      console.error("Erro ao salvar usuário:", e);
    }
  }

  async function salvarEventos(novosEventos) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.eventos, JSON.stringify(novosEventos));
      setEventos(novosEventos);
    } catch (e) {
      console.error("Erro ao salvar eventos:", e);
    }
  }

  return (
    <EventosContext.Provider value={{ eventos, setEventos: salvarEventos, usuario, setUsuario: salvarUsuario }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </EventosContext.Provider>
  );
}