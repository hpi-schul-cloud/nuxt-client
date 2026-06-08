# Technical Handover: Board Frontend

## 2. Architecture

The board frontend follows the application's general architecture patterns but has some unique characteristics due to its real-time nature.

### 2.1 Layer Separation

The board modules follow a strict layering pattern. Each layer has a specific responsibility, and dependencies only flow downward. This separation makes the code easier to test, maintain, and reason about:

```
┌─────────────────────────────────────────────────────────┐
│  Page Layer (src/modules/page/board/)                   │
│  - Route entry points                                   │
├─────────────────────────────────────────────────────────┤
│  Feature Layer (src/modules/feature/board/)             │
│  - UI components (Board, Column, Card, Elements)        │
├─────────────────────────────────────────────────────────┤
│  Data Layer (src/modules/data/board/)                   │
│  - Pinia stores, composables, socket handling           │
├─────────────────────────────────────────────────────────┤
│  Generated API (src/generated/serverApi/)               │
│  - Auto-generated types and API clients                 │
└─────────────────────────────────────────────────────────┘

```
see: [building blocks / module structure](https://documentation.dbildungscloud.dev/docs/frontend-design-patterns/ProjectStructure#types-of-building-blocks).

**Why this matters:** When adding new features, you should always ask yourself which layer the code belongs to. UI changes go in the feature layer, state changes go in the data layer, and new routes go in the page layer.

### 2.2 Directory Structure

The directory structure mirrors the layer separation. Familiarizing yourself with this structure will help you navigate the codebase quickly:

```
src/modules/
├── page/board/
│   └── ColumnBoard.page.vue         # Route entry point
├── data/board/
│   ├── Board.store.ts               # Board state
│   ├── Card.store.ts                # Card state
│   ├── boardActions/                # Board actions
│   ├── cardActions/                 # Card actions
│   ├── socket/                      # WebSocket handling
│   └── *.composable.ts              # Reusable logic
├── feature/board/
│   ├── board/                       # Board components
│   ├── card/                        # Card components
│   └── shared/                      # Shared utilities
└── feature/board-*-element/         # Element type modules
```

Key entry points:
- [ColumnBoard.page.vue](src/modules/page/board/ColumnBoard.page.vue) - Page component
- [Board.vue](src/modules/feature/board/board/Board.vue) - Main board component
- [Board.store.ts](src/modules/data/board/Board.store.ts) - Board state management
