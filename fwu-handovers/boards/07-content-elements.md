# Technical Handover: Board Frontend

## 7. Content Elements

Content elements are the building blocks of cards. Each card can contain multiple elements of different types—text, files, links, drawings, etc. The element system is designed to be extensible, making it straightforward to add new element types.

### 7.1 Element Type Registry

Elements are dynamically rendered using Vue's dynamic component feature. A mapping function translates element types (received from the server) to Vue components:

```typescript
// ContentElementList.vue
<component
    :is="mapToComponent(element.type)"
    :element="element"
    :is-edit-mode="isEditMode"
/>
```

[ContentElementList.vue](src/modules/feature/board/card/ContentElementList.vue)

**Why dynamic components?** The server determines which elements exist on a card. By using dynamic components, the frontend can render any element type without hard-coding the component structure. This also makes it easy to add new element types—just add a new mapping.

### 7.2 Available Element Types

Each element type is implemented as a separate module in `src/modules/feature/`. This modular approach keeps related code together and makes it easy to find everything related to a specific element type:

| Element Type | Module | Purpose |
|--------------|--------|---------|
| `RichTextElement` | [board-text-element](src/modules/feature/board-text-element/) | Formatted text content |
| `FileElement` | [board-file-element](src/modules/feature/board-file-element/) | File attachments |
| `LinkElement` | [board-link-element](src/modules/feature/board-link-element/) | External links with preview |
| `DrawingElement` | [board-drawing-element](src/modules/feature/board-drawing-element/) | tldraw integration |
| `H5pElement` | [board-h5p-element](src/modules/feature/board-h5p-element/) | H5P interactive content |
| `ExternalToolElement` | [board-external-tool-element](src/modules/feature/board-external-tool-element/) | LTI tools |
| `CollaborativeTextEditorElement` | [board-collaborative-text-editor-element](src/modules/feature/board-collaborative-text-editor-element/) | Etherpad |
| `VideoConferenceElement` | [board-video-conference-element](src/modules/feature/board-video-conference-element/) | BBB video conferences |
| `FolderElement` | [board-folder-element](src/modules/feature/board-folder-element/) | File folders |
| `DeletedElement` | [board-deleted-element](src/modules/feature/board-deleted-element/) | Placeholder for deleted elements |

### 7.3 Element Example: RichTextElement

The RichTextElement demonstrates the typical pattern for element implementation. It switches between display and edit modes based on the `isEditMode` prop:

[RichTextContentElement.vue](src/modules/feature/board-text-element/RichTextContentElement.vue)

```vue
<template>
    <RichTextContentElementDisplay v-if="!isEditMode" :value="element.content.text" />
    <RichTextContentElementEdit v-if="isEditMode" :element="element" />
</template>
```

**Pattern explanation:** The display component is optimized for reading (no editing UI, minimal interactivity). The edit component includes the full editing interface. This separation improves performance when many elements are visible but not being edited.

Each element module typically contains:
- Main component (switches between display/edit mode)
- Display component (read-only view)
- Edit component (editing interface)
- Unit tests

### 7.4 Auto-Save for Element Content

Users don't explicitly save their changes—content is auto-saved as they type. This provides a seamless editing experience but requires careful debouncing to avoid overwhelming the server with requests.

[ContentElementState.composable.ts](src/modules/data/board/ContentElementState.composable.ts)

```typescript
watchDebounced(modelValue, async (value) => {
    await cardStore.updateElementRequest({ element: { ...element, content: value } });
}, { debounce: 300, maxWait: 2500 });
```

**Debounce parameters explained:**
- `debounce: 300` - Wait 300ms after the last change before saving
- `maxWait: 2500` - But never wait more than 2.5 seconds, even if the user keeps typing

This balance ensures changes are saved frequently enough to prevent data loss while avoiding excessive API calls during rapid typing.
