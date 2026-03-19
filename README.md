# 🎵 VinylVerse — Mobile App

> **Marketplace de mídia física musical para iOS e Android**

[![Expo](https://img.shields.io/badge/Expo-SDK_50-000020?style=flat&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?style=flat&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)

> ⚠️ **Projeto Demonstrativo** — Sem pagamentos reais, sem backend, sem auth real. Dados mockados. Arquitetura pronta para produção.

---

## 📱 Telas

| Tela | Descrição |
|---|---|
| **Login / Cadastro** | Autenticação mockada com email, Spotify e modo visitante |
| **Home** | Feed com hero card, carrosséis Em Alta, Novidades, Editores |
| **Descobrir** | Grid editorial com filtros de formato e gênero |
| **Loja** | Lista com busca, filtros e ordenação |
| **Detalhe** | Galeria, ratings duplos, tracklist, reviews, similares |
| **Carrinho** | Controle de quantidade, cupons de desconto |
| **Checkout** | 3 etapas: endereço → frete → pagamento |
| **Confirmação** | Animação de sucesso + pontos de recompensa |
| **Coleção** | Coleção / Wishlist / Histórico |
| **Perfil** | Nível, badges, cupons, pedidos |

---

## 🚀 Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o **Expo Go** (App Store / Play Store).

**Cupons disponíveis para testar:** `VINYL10` · `FIRSTORDER` · `COLLECTOR20` · `VINYLVERSE5`

---

## 🛠️ Stack

- React Native 0.73 + Expo SDK 50
- Expo Router 3 (file-based navigation)
- Zustand 4 (estado global com persistência)
- TypeScript 5.3
- @expo/vector-icons (Ionicons)
- expo-linear-gradient

---

## 📁 Estrutura

```
app/
├── src/               ← dados, store, tema
│   ├── theme.ts       ← cores e tokens de design
│   ├── data.ts        ← 12 álbuns + dados mockados
│   └── store.ts       ← Zustand (carrinho + auth)
├── (auth)/            ← login + cadastro
├── (tabs)/            ← 5 telas com tab bar
│   ├── index.tsx      ← Home
│   ├── discover.tsx   ← Descobrir
│   ├── marketplace.tsx← Loja
│   ├── collection.tsx ← Coleção
│   └── profile.tsx    ← Perfil
├── product/[id].tsx   ← Detalhe do álbum
├── cart.tsx           ← Carrinho (modal)
├── checkout.tsx       ← Checkout em 3 etapas
└── done.tsx           ← Confirmação do pedido
```

---

## 📝 Licença

MIT — use livremente para aprendizado e portfólio.
