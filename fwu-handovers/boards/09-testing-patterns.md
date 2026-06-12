# Technical Handover: Board Frontend

## 9. Testing Patterns

The board module has extensive test coverage. Understanding the testing patterns used will help you write tests for new features and debug failing tests.

### 9.1 Factory Functions

Test data is created using fishery factories. Factories provide a convenient way to create test objects with sensible defaults while allowing specific properties to be overridden:

[boardResponseFactory.ts](tests/test-utils/factory/boardResponseFactory.ts)

```typescript
// Create board with specific permissions
const board = boardResponseFactory.build({
    allowedOperations: { createColumn: true, deleteColumn: false }
});
```

**Tip:** When writing tests, use factories to create test data rather than hand-crafting objects. Factories ensure your test data has the correct structure and make tests more maintainable.

### 9.2 Mocking Composables

Board components depend on many composables. In unit tests, these dependencies are mocked to isolate the component under test. The pattern involves mocking the module, then configuring the mock's return value:

```typescript
vi.mock("./boardActions/boardSocketApi.composable");
const mockedUseBoardSocketApi = vi.mocked(useBoardSocketApi);

mockedUseBoardSocketApi.mockReturnValue(mockComposable(useBoardSocketApi, {
    connected: computed(() => true),
}));
```

**Key insight:** The `mockComposable` helper creates a mock with the same shape as the real composable, making it easy to override specific properties while keeping others as sensible defaults.

### 9.3 Test File Location

Unit tests are co-located with their source files using the `.unit.ts` suffix. This makes it easy to find tests and keeps related code together:
- `Board.store.ts` → `Board.store.unit.ts`
- `socket.ts` → `socket.unit.ts`

Example: [Board.store.unit.ts](src/modules/data/board/Board.store.unit.ts)

### 9.4 Running Tests

Vitest is used for running tests. You can run all tests or filter to specific files:

```bash
# Run all board-related tests
npm run test:unit -- board

# Run specific test file
npm run test:unit -- Board.store
```
