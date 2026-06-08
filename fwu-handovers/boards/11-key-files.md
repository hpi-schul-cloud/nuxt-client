# Technical Handover: Board Frontend

## 11. Key Files Quick Reference

This table provides a quick way to find the right file when working on specific aspects of the board. Bookmark this section!

| Aspect | Purpose | File | 
|--------|---------|------|
| **Entry Points** | Page component | [ColumnBoard.page.vue](src/modules/page/board/ColumnBoard.page.vue) |
|  | Main board | [Board.vue](src/modules/feature/board/board/Board.vue) |
| **State Management** | Board store | [Board.store.ts](src/modules/data/board/Board.store.ts) |
|  | Card store | [Card.store.ts](src/modules/data/board/Card.store.ts) |
| **WebSocket** | Connection | [socket.ts](src/modules/data/board/socket/socket.ts) |
|  | Error handling | [socket-error-handler.ts](src/modules/data/board/socket/socket-error-handler.ts) |
| **Permissions** | Composable | [board-allowed-operations.composable.ts](src/modules/data/board/board-allowed-operations.composable.ts) |
| **APIs** | Socket API | [boardSocketApi.composable.ts](src/modules/data/board/boardActions/boardSocketApi.composable.ts) |
|  | REST API | [boardRestApi.composable.ts](src/modules/data/board/boardActions/boardRestApi.composable.ts) |
| **Actions** | Board actions | [boardActions.ts](src/modules/data/board/boardActions/boardActions.ts) |
|  | Card actions | [cardActions.ts](src/modules/data/board/cardActions/cardActions.ts) |
| **Utilities** | Action factory | [ActionFactory.ts](src/types/board/ActionFactory.ts) |
|  | Edit mode | [edit-mode.composable.ts](src/modules/data/board/edit-mode.composable.ts) |
|  | Focus handler | [BoardFocusHandler.composable.ts](src/modules/data/board/BoardFocusHandler.composable.ts) |