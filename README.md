# 🃏 Blackjack 25

Um jogo de Blackjack moderno e interativo desenvolvido em JavaScript , com dois modos de jogo distintos e um sistema completo de power-ups.


## 📋 Sobre o Projeto

Blackjack 25 é uma versão única do clássico jogo de cartas, onde o objetivo é chegar o mais próximo possível de **25 pontos** (ao invés dos tradicionais 21) sem ultrapassar esse valor. O jogo oferece dois modos distintos: um modo básico para jogadores e um modo avançado.

### 🎯 Características Principais

- **Dois Modos de Jogo**: Básico e Avançado
- **Sistema de Apostas**: Gerencie o seu dinheiro e faça apostas estratégicas
- **Power-Ups Únicos**: No modo avançado, compre e use habilidades especiais
- **Sistema de Áudio**: Música de fundo e efeitos sonoros
- **Interface Responsiva**: Design moderno com Bootstrap 5


## 🎮 Modos de Jogo

### 🎲 Modo Básico
O modo clássico onde você joga contra o dealer com regras tradicionais de Blackjack (adaptadas para 25 pontos).

### ⚡ Modo Avançado
Inclui todas as funcionalidades do modo básico mais:

#### 💎 Power-Ups Disponíveis

1. **👁️ Card Reveal** (10$)
   - Revela a carta oculta do dealer antes do final da rodada

2. **🧭 Compass Intuition** (50$)
   - Indica se a próxima carta do baralho fará você estourar

3. **⚡ Lightning Strike** (100$)
   - Remove uma carta aleatória da sua mão (útil para evitar bust)

4. **🔍 Quick Inspect** (300$)
   - Mostra rapidamente qual é a próxima carta do baralho

5. **🎁 Mystery Lootbox** (150$)
   - Recebe um power-up aleatório com chances variadas


### Regras do Jogo

1. **Objetivo**: Chegar o mais próximo possível de 25 pontos sem ultrapassar
2. **Valores das Cartas**:
   - Ás: 1 ou 11 pontos (valor ajustado automaticamente)
   - 2-10: Valor nominal
   - J, Q, K: 10 pontos cada
3. **Dealer**: Para automaticamente ao atingir 21 pontos ou mais
4. **Apostas**: Defina sua aposta antes de cada rodada (10$ - 1000$)

- **🎴 Card**: Pedir uma nova carta
- **✋ Stand**: Parar e deixar o dealer jogar
- **🔄 New Game**: Iniciar uma nova rodada
- **💎 Extras Menu**: Aceder loja e power-ups 
- **⚙️ Settings**: Ajustar volume e configurações de áudio


### Bibliotecas
- **Bootstrap 5.3.3**
- **Bootstrap Icons 1.11.3**: Conjunto de ícones





### Programação Orientada a Objetos
- **Classe `Card`**: Representa uma carta individual
- **Classe `Blackjack`**: Lógica principal do jogo
- **Classe `Blackjack_Advanced`**: Extensão com sistema de power-ups

### Sistema de Áudio
- Música de fundo com rotação automática de tracks
- Efeitos sonoros para ações do jogo
- Controles de volume independentes para música e VFX


### Animações e Efeitos Visuais
- Sistema de toast para notificações
- Overlays para menus e confirmações

## 🎵 Sistema de Áudio
O jogo inclui:
- **8 músicas de fundo** que tocam aleatoriamente
- **Sons de transição** entre músicas
- **Efeitos sonoros** para:
  - Cartas sendo distribuídas
  - Power-ups sendo usados
  - Compras na loja
  - Revelação de cartas

## 🔧 Configurações

Acesse o menu de configurações (ícone ☰) para:
- Ativar/desativar música de fundo
- Ajustar volume da música
- Silenciar/ativar efeitos sonoros
- Ajustar volume dos efeitos

## 📱 Responsividade

O jogo é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones


## 🎮 Créditos de Áudio

As músicas utilizadas são de:
- Library of Ruina
- Limbus Company
- Clair Obscur: Expedition 33

---


