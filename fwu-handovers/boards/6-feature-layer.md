# Technical Handover: Board Frontend

## 6. Feature Layer

The feature layer contains all the Vue components that make up the board UI and connects them with the data layer. These components are responsible for rendering the board structure, handling user interactions, and delegating state changes to the data layer.

### 6.1 Component Hierarchy

The board is composed of nested components, each responsible for a specific part of the UI. Understanding this hierarchy helps when debugging render issues or adding new features:

```
Board.vue
├── BoardHeader.vue
├── Sortable (columns container)
│   └── BoardColumn.vue (for each column)
│       ├── BoardColumnHeader.vue
│       └── CardHost.vue (for each card)
│           ├── CardTitle.vue
│           └── ContentElementList.vue
│               └── [ElementComponent] (for each element)
└── BoardColumnGhost.vue (add column button)
```

### 6.2 Key Components

Each component has a specific responsibility. This table summarizes the main components you'll work with:

| Component | Purpose | File |
|-----------|---------|------|
| `Board.vue` | Main board container, handles drag & drop | [Board.vue](src/modules/feature/board/board/Board.vue) |
| `BoardColumn.vue` | Single column with cards | [BoardColumn.vue](src/modules/feature/board/board/BoardColumn.vue) |
| `CardHost.vue` | Card container with title and elements | [CardHost.vue](src/modules/feature/board/card/CardHost.vue) |
| `ContentElementList.vue` | Renders element list dynamically | [ContentElementList.vue](src/modules/feature/board/card/ContentElementList.vue) |

### 6.3 Edit Mode Management

To prevent conflicts and confusion, only one element can be in edit mode at a time across the entire board. When a user clicks to edit an element, any previously edited element exits edit mode. This is managed through a shared singleton composable:

```typescript
// Shared singleton tracks current edit ID
const { editModeId, setEditModeId } = useSharedEditMode();

// Per-element usage checks permission AND id match
const isEditMode = computed(() => 
    hasEditPermission.value && id === editModeId.value
);
```

[edit-mode.composable.ts](src/modules/data/board/edit-mode.composable.ts)

**How it works:** The `editModeId` is a reactive ref holding the ID of the currently edited element (or undefined). When a component mounts, it checks if its ID matches the `editModeId` to determine if it should render in edit mode.

### 6.4 Focus Management

When cards are moved or columns are reordered, the DOM elements are destroyed and recreated. Without special handling, keyboard focus would be lost, frustrating users who navigate with the keyboard. The focus handler solves this by remembering which element should have focus and restoring it after DOM changes.

```typescript
const { setFocus, forceFocus } = useBoardFocusHandler();

// After card move, re-focus the moved card
setFocus(cardId);
```

[BoardFocusHandler.composable.ts](src/modules/data/board/BoardFocusHandler.composable.ts)

**Use case example:** A user moves a card using keyboard shortcuts. The card component is unmounted from its old column and mounted in the new column. The focus handler ensures the card receives focus again in its new location.