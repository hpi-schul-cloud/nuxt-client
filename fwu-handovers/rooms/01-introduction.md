# Technical Handover: Room - Frontend

## 1. Introduction

This document guides new developers through the Room frontend codebase. It complements the [server-side rooms module handover](rooms-module-handover.md) and assumes familiarity with the [general architecture documentation](https://documentation.dbildungscloud.dev/docs/backend-design-patterns/architecture) and the [board frontend handover](board-frontend-handover.md).

### What is a Room?

Rooms ("Bereiche" in German) are **digital collaborative spaces** for teachers and students. Each room has:
- A set of **members** with individual **roles** (Owner, Admin, Editor, Viewer, Applicant)
- **Boards** as content (ColumnBoards from the board module)
- **Configuration** (color, date range, feature flags)

The frontend provides the UI for:
- Creating, editing, and deleting rooms
- Managing room members (adding, removing, changing roles)
- Creating and managing invitation links
- Navigating to room boards

### Relationship with Boards

Rooms contain boards. When a user opens a room, they see a grid of boards. Board permissions are inherited from room membership:

```
Room (members with roles)
 └── Board 1 (inherits permissions from room)
 └── Board 2 (inherits permissions from room)
 └── Board 3 (inherits permissions from room)
```

A user who is a ROOMEDITOR can edit all boards in that room. A ROOMVIEWER can only view boards.

### Concepts Shared with Board Module

The following concepts work identically to the board module and are explained in [board-frontend-handover.md](board-frontend-handover.md):

- Layer Separation
- Generated OpenAPI Clients 
- Permissions via allowedOperations
