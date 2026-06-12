# Technical Handover: Board Frontend

## 5. Permissions & Allowed Operations

The board must enforce permissions to ensure users can only perform actions they're authorized to do. Rather than implementing permission logic in the frontend (which could be bypassed), the frontend receives pre-calculated permissions from the server and uses them to control UI visibility.

### 5.1 How Permissions Flow

The permission flow ensures that the server remains the single source of truth for authorization:

1. **Server** calculates permissions based on user role and board context
2. **Server** includes `allowedOperations` in board response
3. **Frontend** stores operations with board data
4. **UI components** conditionally render based on permissions

**Key principle:** The frontend never decides if a user *should* be able to do something—it only checks if the server *said* they can. This prevents security issues where frontend-only checks could be bypassed.

### 5.2 AllowedOperations Interface

The server returns a boolean for each possible operation. This granular approach allows fine-grained control—for example, a user might be able to create cards but not delete them:

```typescript
interface BoardResponseAllowedOperations {
    copyBoard: boolean;
    deleteBoard: boolean;
    createColumn: boolean;
    moveColumn: boolean;
    createCard: boolean;
    updateElement: boolean;
    // ... more operations
}
```

[board-response-allowed-operations.ts](src/generated/serverApi/v3/models/board-response-allowed-operations.ts)

### 5.3 Using Permissions in Components

The `useBoardAllowedOperations` composable provides a reactive way to check permissions in templates and component logic. It reads from the board store and provides a clean interface for permission checks.

[board-allowed-operations.composable.ts](src/modules/data/board/board-allowed-operations.composable.ts)

```typescript
const { allowedOperations } = useBoardAllowedOperations();

// In template - permission check with fallback to false
<BoardColumnGhost v-if="allowedOperations.createColumn ?? false" />
```

**Fallback behavior:** If `allowedOperations` is undefined (e.g., during initial load), a Proxy returns `false` for all operations. This "deny by default" approach prevents UI elements from briefly appearing before permissions are loaded.

**Best practice:** Always use the nullish coalescing operator (`?? false`) when checking permissions in templates to handle the undefined case explicitly.