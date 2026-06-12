# Technical Handover: Board Frontend

## Document Purpose & Structure

This document guides new developers through the Board frontend codebase. It complements the [server-side board module handover](board-module-handover.md) and assumes familiarity with the [general architecture documentation](https://documentation.dbildungscloud.dev/docs/backend-design-patterns/architecture).

## 1. Overview & Conceptual Foundation

### 1.1 What is the Board Frontend?

The Board frontend provides the UI for **collaborative, real-time editing of structured content**. It renders ColumnBoards (kanban-style boards with columns containing cards) and handles user interactions.

The board is the primary tool for teachers to structure lesson content, assignments, and resources. Students can view boards and - depending on permissions - may also contribute content. The frontend must handle multiple users editing simultaneously, which is why real-time synchronization is a core requirement.

Who is allowed to access and edit boards depends on it's parent (context): course or room.

**Key responsibilities:**
- Render board structure (columns, cards, elements)
- Handle user interactions (drag & drop, editing, creation)
- Maintain real-time synchronization via WebSocket
- Enforce permissions received from the backend

**Related Features:**

| Feature | Purpose |
|---------|---------|
| **MediaBoard** | Alternative board type for organizing media/tool resources |
| **Copy** | Copying boards, columns, and cards |
| **Share** | Sharing boards via share tokens |
| **Room integration** | Boards exist within rooms, inheriting room permissions |
| **Course integration** | Legacy: boards within courses |


### 1.2 Technology Stack

The board frontend is built on Vue 3 with a modern toolchain. Each technology was chosen to address specific requirements of the collaborative editing experience:

| Technology | Purpose |
|------------|---------|
| Vue 3 | Component framework |
| Pinia | State management |
| Socket.IO | Real-time communication |
| TypeScript | Type safety |
| Vuetify | UI components |
| Sortable.js | Drag & drop |

### 1.3 Relationship with Backend

The frontend is a consumer of the schulcloud-server API (v3). It does not implement any business logic itself - all data validation, permission checks and persistence happen on the server. The frontend's job is to present the data and send user intentions to the server.

The frontend communicates with the schulcloud-server via:
1. **Generated OpenAPI client** - Type-safe API calls in `src/generated/serverApi/`. These TypeScript types are auto-generated from the server's OpenAPI specification, ensuring frontend and backend stay in sync.
2. **WebSocket connection** - Real-time updates for collaborative editing. When one user makes a change, all other users viewing the same board receive the update immediately.

The server returns `allowedOperations` with each board response, which the frontend uses for permission-based rendering. This means the server is the single source of truth for what a user can and cannot do.
