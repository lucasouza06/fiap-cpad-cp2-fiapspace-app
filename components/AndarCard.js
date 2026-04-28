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
      <View style={styles.detalheRosa} />
      <View style={styles.conteudo}>
        <View style={styles.headerRow}>
          <Text style={styles.titulo}>{andar}º Andar</Text>
          <View style={styles.statusBadge}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusTexto, { color: statusColor }]}>
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
    backgroundColor: '#121212',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  detalheRosa: {
    width: 6,
    backgroundColor: '#ED145B',
  },
  conteudo: {
    flex: 1,
    padding: 20,
    paddingLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoEvento: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  nomeEvento: {
    color: '#BBB',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horario: {
    color: '#888',
    fontSize: 14,
  },
  countdown: {
    color: '#ED145B',
    fontSize: 13,
    fontWeight: '700',
  },
});
