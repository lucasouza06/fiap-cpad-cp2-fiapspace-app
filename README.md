# FIAPSpace

> MVP mobile para monitoramento em tempo real de espaços disponíveis na FIAP

---

## Sobre o Projeto

### Problema
Encontrar um andar ou sala livre na FIAP pra estudar ou ter uma reunião rápida é frustrante.
Você anda pelos andares sem saber se tem espaço disponível, perde tempo e às vezes desiste.

### Solução
O FIAPSpace resolve isso mostrando em tempo real quais andares estão ocupados ou livres,
com base nos eventos cadastrados pelos próprios alunos.
O usuário se cadastra com sua conta institucional, cadastra eventos com horário de início e fim,
e visualiza o status de cada andar na hora — sem precisar sair do lugar.

---

## Funcionalidades

- Cadastro institucional com validação de RM e e-mail @fiap.com.br
- Validação inline nos formulários — erros aparecem embaixo de cada campo sem Alert
- Monitoramento em tempo real dos 7 andares
- Contador regressivo nos andares ocupados mostrando quanto tempo falta pra liberar
- Cadastro de eventos com nome, andar, horário de início e fim
- Listagem de todos os eventos do dia
- Tela de perfil com foto, dados do usuário e eventos criados
- Navegação por abas
- Estado vazio com feedback visual em todas as telas

---

## Demonstração Visual

### Telas do Aplicativo
> prints serão adicionados em breve

### Vídeo de Demonstração
> link será adicionado em breve

---

## Decisões Técnicas

### Context API
Utilizamos `createContext` no `_layout.js` para compartilhar os dados de eventos
e do usuário logado entre todas as telas do app.
Qualquer tela acessa ou atualiza esses dados via `useContext` sem precisar passar props manualmente.

### Validação Inline
Todos os formulários validam os campos sem usar `Alert`.
Os erros aparecem em texto abaixo do campo correspondente com a borda ficando vermelha,
e somem automaticamente quando o usuário começa a corrigir aquele campo.

### Contador Regressivo em Tempo Real
O componente `AndarCard` usa `useEffect` com `setInterval` para recalcular
a cada 30 segundos quanto tempo falta para o andar ser liberado.
Quando o tempo acaba o contador some sozinho sem precisar recarregar a tela.

### Navegação por Abas
Estruturamos a navegação com Expo Router usando a pasta `(tabs)`,
mantendo uma experiência fluida entre Home, Eventos, Cadastro e Perfil.

---

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- JavaScript ES6+
- Context API
- expo-image-picker

---

## Como Rodar o Projeto

### Pré-requisitos
- Node.js
- npm
- Expo Go no celular ou emulador Android/iOS

### Execução
```bash
git clone https://github.com/lucasouza06/fiap-cpad-cp1-fiapspace-app.git
cd fiap-cpad-cp1-fiapspace-app
npm install
npx expo start
```

---

## Integrantes

| RM | Nome |
|---|---|
| RM 565303 | Vitor Barbosa de Paiva |
| RM 563477 | Arthur Traldi Felix |
| RM 564066 | Lucas Andrade de Souza |
| RM 563556 | Luis Otavio Santini |
