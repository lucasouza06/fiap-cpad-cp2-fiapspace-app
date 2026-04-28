import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AndarCard({ andar, ocupado, nomeEvento, horario }) {
  // Definimos cores mais vibrantes para os dots no fundo escuro
  const statusColor = ocupado ? '#FF3B30' : '#4CD964';

  return (
    <View style={styles.card}>
      {/* 1. O "NEGÓCIO ROSA" - Detalhe lateral esquerdo */}
      <View style={styles.detalheRosa} />
      
      {/* 2. CONTEÚDO DO CARD (Textos) */}
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
            <Text style={styles.horario}>até {horario}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121212', // Cinza muito escuro para contraste
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row', // Alinha o detalhe rosa ao lado do conteúdo
    overflow: 'hidden', // Garante que o detalhe rosa não saia do border radius
    borderWidth: 1,
    borderColor: '#222', // Borda sutil
  },
  // ESTILO DO DETALHE ROSA
  detalheRosa: {
    width: 6, // Largura da barra
    backgroundColor: '#ED145B', // Rosa FIAP
  },
  conteudo: {
    flex: 1,
    padding: 20,
    paddingLeft: 16, // Um pouco menos de padding na esquerda para compensar a barra
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
    fontFamily: 'sans-serif',
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
    fontFamily: 'sans-serif',
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
    textTransform: 'uppercase', // Estilo profissional
    marginBottom: 2,
  },
  horario: {
    color: '#888',
    fontSize: 14,
  },
});