# FIAPSpace 📱

> MVP mobile para monitoramento em tempo real de espaços disponíveis na FIAP

---

## 📋 Sobre o Projeto

### Problema
Encontrar um andar ou sala livre na FIAP pra estudar ou ter uma reunião rápida é frustrante.
Você anda pelos andares sem saber se tem espaço disponível, perde tempo e às vezes desiste.

### Solução
O FIAPSpace resolve isso mostrando em tempo real quais andares estão ocupados ou livres, com base nos eventos cadastrados pelos próprios alunos. O usuário se cadastra com sua conta institucional, cadastra eventos com horário de início e fim, e visualiza o status de cada andar na hora — sem precisar sair do lugar.

---

## ✨ Funcionalidades

- **Cadastro institucional** com validação de RM e e-mail `@fiap.com.br`
- **Validação inline** nos formulários — erros aparecem embaixo de cada campo sem Alert
- **Monitoramento em tempo real** dos 7 andares com indicador livre/ocupado
- **Contador regressivo** nos andares ocupados mostrando quanto tempo falta pra liberar
- **Cadastro de eventos** com nome, andar, horário de início e fim
- **Listagem de todos os eventos** do dia na Agenda
- **Tela de perfil** com foto, dados do usuário e eventos criados
- **Persistência de dados** com AsyncStorage — dados mantidos ao fechar o app
- **Navegação por abas** fluida entre todas as telas
- **Estado vazio** com feedback visual em todas as telas

---

## 🗂️ Estrutura de Arquivos

```
app/
├── _layout.js              # Layout raiz com contexto global e AsyncStorage
├── index.js                # Tela de cadastro / onboarding
└── (tabs)/
    ├── _layout.js          # Navegação por abas (Tab Bar)
    ├── home.js             # Tela principal — status dos andares em tempo real
    ├── eventos.js          # Agenda do dia
    ├── cadastro.js         # Formulário de reserva de espaço
    └── perfil.js           # Perfil do usuário

components/
├── AndarCard.js            # Card de status de cada andar com countdown
└── EventoCard.js           # Card de exibição de evento na agenda

constants/
└── theme.js                # Cores, tamanhos, espaçamentos e chaves do AsyncStorage
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| React Native | Framework mobile |
| Expo | Plataforma de desenvolvimento |
| Expo Router | Navegação baseada em arquivos |
| JavaScript ES6+ | Linguagem principal |
| Context API | Gerenciamento de estado global |
| AsyncStorage | Persistência de dados local |
| expo-image-picker | Seleção de foto de perfil |

---

## 🧠 Decisões Técnicas

### Context API
Utilizamos `createContext` no `_layout.js` para compartilhar os dados de eventos e do usuário logado entre todas as telas do app. Qualquer tela acessa ou atualiza esses dados via `useContext` sem precisar passar props manualmente.

### AsyncStorage — Persistência de Dados
Os dados do usuário e os eventos são salvos localmente no dispositivo via `AsyncStorage`. Isso garante que as informações não se percam ao fechar ou reiniciar o app.

As funções `salvarUsuario` e `salvarEventos` no `_layout.js` encapsulam o `setItem`, e um `useEffect` na inicialização do app chama `getItem` para reidratam o estado automaticamente.

**Chaves utilizadas:**

| Chave | Dado persistido |
|---|---|
| `@fiapspace:usuario` | Objeto com `nome`, `matricula`, `email` e `foto` do usuário |
| `@fiapspace:eventos` | Array com todos os eventos cadastrados (`nome`, `andar`, `inicio`, `fim`) |

### Validação Inline
Todos os formulários (cadastro e reserva) validam os campos sem usar `Alert`. Os erros aparecem em texto abaixo do campo correspondente com a borda ficando vermelha, e somem automaticamente quando o usuário começa a corrigir aquele campo.

### Contador Regressivo em Tempo Real
O componente `AndarCard` usa `useEffect` com `setInterval` para recalcular a cada 30 segundos quanto tempo falta para o andar ser liberado. Quando o tempo acaba, o contador some sozinho sem precisar recarregar a tela.

### Constants
Todas as cores, tamanhos de fonte, espaçamentos e chaves do AsyncStorage estão centralizados em `constants/theme.js`, eliminando valores hardcoded espalhados pelo código.

### Navegação por Abas
Estruturamos a navegação com Expo Router usando a pasta `(tabs)`, mantendo uma experiência fluida entre Home, Eventos, Cadastro e Perfil.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) no celular (iOS ou Android) — ou emulador configurado

> Você pode verificar se já tem o Node instalado rodando `node -v` no terminal.

---

### Passo a Passo

**1. Clone o repositório**
```bash
git clone https://github.com/lucasouza06/fiap-cpad-cp1-fiapspace-app.git
```

**2. Acesse a pasta do projeto**
```bash
cd fiap-cpad-cp1-fiapspace-app
```

**3. Instale as dependências**
```bash
npm install
```

**4. Instale o AsyncStorage** *(caso não venha no package.json)*
```bash
npx expo install @react-native-async-storage/async-storage
```

**5. Inicie o servidor de desenvolvimento**
```bash
npx expo start
```

**6. Abra no seu dispositivo**

Um QR Code será exibido no terminal. Escolha uma das opções abaixo:

| Dispositivo | Como abrir |
|---|---|
| 📱 Android | Abra o app **Expo Go** e escaneie o QR Code |
| 🍎 iOS | Abra a **câmera nativa** e escaneie o QR Code |
| 💻 Emulador Android | Pressione `a` no terminal com o emulador aberto |
| 💻 Simulador iOS | Pressione `i` no terminal com o Xcode instalado |

> Certifique-se de que o celular e o computador estão **na mesma rede Wi-Fi**.

---

## 📱 Fluxo do Aplicativo

```
Tela de Cadastro (index)
        │
        ▼  após cadastro válido
   Home — Status dos Andares
        │
   ┌────┴──────────────┬──────────────┐
   ▼                   ▼              ▼
Agenda             Reservar        Perfil
(eventos.js)      (cadastro.js)  (perfil.js)
```

---

## ✅ Validações Implementadas

**Tela de Cadastro:**
- Nome: apenas letras e espaços (obrigatório)
- RM: formato `RM` seguido de exatamente 6 dígitos
- E-mail: obrigatoriamente `@fiap.com.br`
- Senha: mínimo 8 caracteres com ao menos 1 caractere especial

**Formulário de Reserva:**
- Nome do evento obrigatório
- Andar entre 1 e 7
- Horários no formato `HH:MM`
- Horário de fim deve ser posterior ao de início

---

## 🎨 Identidade Visual

Todas as constantes visuais estão centralizadas em `constants/theme.js`.

| Elemento | Cor |
|---|---|
| Background | `#0A0A0A` |
| Cards | `#141414` |
| Destaque FIAP | `#ED145B` |
| Texto principal | `#FFFFFF` |
| Texto secundário | `#555555` |

---

## 🖼️ Demonstração Visual

### Telas do Aplicativo
> prints serão adicionados em breve

### Vídeo de Demonstração
> link será adicionado em breve

---

## 👥 Integrantes

| RM | Nome |
|---|---|
| RM 565303 | Vitor Barbosa de Paiva |
| RM 563477 | Arthur Traldi Felix |
| RM 564066 | Lucas Andrade de Souza |
| RM 563556 | Luis Otavio Santini |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos na **FIAP — Faculdade de Informática e Administração Paulista**.
