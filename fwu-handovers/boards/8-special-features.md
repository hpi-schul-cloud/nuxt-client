# Technical Handover: Board Frontend

## 8. Special Features

### 8.1 Card Detail View (Full-Screen Mode)

Cards can be opened in a full-screen dialog for focused editing. The URL changes to include the card ID (`/boards/{boardId}/cards/{cardId}`), making the link shareable.

**Key features:**
- Full-screen Vuetify dialog with Edit/View mode toggle
- Closes on Escape key or close button
- Card's background color reflected in dialog

Related files:
- [CardHostDetailView.vue](src/modules/feature/board/card/CardHostDetailView.vue) - Dialog component
- [CardHost.vue](src/modules/feature/board/card/CardHost.vue) - Opens detail view via `onOpenDetailView()`
- [Board.vue](src/modules/feature/board/board/Board.vue) - Renders `CardHostDetailView` when `cardId` route param present

### 8.2 Direct Card Linking

Users can share links to specific cards. Opening a card link loads the board and immediately opens that card in detail view.

**Use cases:**
- Teachers sharing assignment cards with students
- Linking to resources in documentation or messages
- Bookmarking cards for quick access

Related files:
- [CardHost.vue](src/modules/feature/board/card/CardHost.vue) - `onOpenDetailView()` pushes route with `cardId`
- [Board.vue](src/modules/feature/board/board/Board.vue) - Reads `cardId` from route params, shows `CardHostDetailView`

### 8.3 Readers Can Edit

By default, users with the "Reader" role (typically students) can only view boards but not edit them. The **Readers Can Edit** feature allows teachers to grant editing permissions to all readers on a per-board basis, enabling collaborative scenarios where students contribute content.

**How it works:**
1. The board has a `readersCanEdit` boolean property (from server response)
2. Teachers can toggle this via Board Menu → "Editing Settings"
3. When enabled, a chip "Editable for everyone" appears in the board header
4. The server recalculates `allowedOperations` for readers, granting edit permissions

**Prerequisites:**
- Only available for **room boards** (not course boards)
- Board must be **published** before the setting can be changed
- Controlled by feature flag `FEATURE_BOARD_READERS_CAN_EDIT_TOGGLE`
- User needs `allowedOperations.updateReadersCanEditSetting` permission

**Use cases:**
- Collaborative brainstorming with students
- Student-led project boards
- Peer review or feedback boards