# Technical Handover: Board Frontend

## 12. Suggested Exploration Order

The best way to learn the codebase is to explore it hands-on. Here's a recommended path that builds understanding progressively:

1. **Start with the page:** Open [ColumnBoard.page.vue](src/modules/page/board/ColumnBoard.page.vue) and trace to `Board.vue`
2. **Understand state:** Read [Board.store.ts](src/modules/data/board/Board.store.ts), focus on `fetchBoardSuccess` and `createCardSuccess`
3. **Follow an operation:** Trace `createCard` from button click → store → socket API → success handler
4. **Study permissions:** Find permission checks in [Board.vue](src/modules/feature/board/board/Board.vue) template
5. **Explore elements:** Pick one element module (e.g., `board-text-element`) and understand its structure
6. **Debug socket:** Add console logs in [socket.ts](src/modules/data/board/socket/socket.ts) and observe connection lifecycle


