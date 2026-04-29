import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function calcularTempoRestante(horarioFim) {
  const agora = new Date();
  const [horas, minutos] = horarioFim.split(':').map(Number);
  const fim = new Date();
  fim.setHours(horas, minutos, 0, 0);
  const diffMs = fim - agora;
  if (diffMs <= 0) return null;
  const diffMin = Math.floor(diffMs / 60000);
  const hRestantes = Math.floor(diffMin / 60);
  const mRestantes = diffMin % 60;
  if (hRestantes > 0) return `libera em ${hRestantes}h ${mRestantes}min`;
  if (mRestantes === 0) return 'liberando agora';
  return `libera em ${mRestantes}min`;
}

export default function AndarCard({ andar, ocupado, nomeEvento, horario }) {
  const statusColor = ocupado ? '#FF3B30' : '#4CD964';
  const [tempoRestante, setTempoRestante] = useState(
    ocupado && horario ? calcularTempoRestante(horario) : null
  );

  useEffect(() => {
    if (!ocupado || !horario) {
      setTempoRestante(null);
      return;
    }
    setTempoRestante(calcularTempoRestante(horario));
    const intervalo = setInterval(() => {
      const tempo = calcularTempoRestante(horario);
      setTempoRestante(tempo);
      if (!tempo) clearInterval(intervalo);
    }, 30000);
    return () => clearInterval(intervalo);
  }, [ocupado, horario]);

  return (
    <View style={styles.card}>
      <View style={styles.acento} />
      <View style={styles.conteudo}>
        <View style={styles.headerRow}>
          <Text style={styles.titulo}>{andar}º Andar</Text>
          <View style={[styles.badge, { backgroundColor: ocupado ? 'rgba(255,59,48,0.1)' : 'rgba(76,217,100,0.1)' }]}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.badgeTexto, { color: statusColor }]}>
              {ocupado ? 'Ocupado' : 'Livre'}
            </Text>
          </View>
        </View>

        {ocupado && (
          <View style={styles.infoEvento}>
            <Text style={styles.nomeEvento}>{nomeEvento}</Text>
            <View style={styles.rodape}>
              <Text style={styles.horario}>até {horario}</Text>
              {tempoRestante && (
                <Text style={styles.countdown}>{tempoRestante}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#141414',
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  acento: {
    width: 4,
    backgroundColor: '#ED145B',
  },
  conteudo: {
    flex: 1,
    padding: 18,
    paddingLeft: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  infoEvento: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1e1e1e',
  },
  nomeEvento: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horario: {
    color: '#555',
    fontSize: 13,
  },
  countdown: {
    color: '#ED145B',
    fontSize: 12,
    fontWeight: '700',
  },
});