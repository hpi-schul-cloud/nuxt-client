# Technical Handover: Courses, Lessons & Classes (Vue Client)

## Document Purpose & Structure

This document guides new developers through the Course, Lesson, Class, and Task features as implemented in this Vue client. It's designed to be presented by someone familiar with the code, not read in isolation.

**Prerequisite:** You should have completed the general introduction to the codebase, the Vue/Vite architecture, and the module structure (`modules/data`, `modules/feature`, `modules/page`, `modules/ui`).

---

## 1. Conceptual Foundation

### 1.1 What This Client Handles

| Feature Area | What This Client Does |
|---|---|
| **Courses** | Dashboard grid, course list, course room detail view (legacy board), admin table, copy/share/sync workflows |
| **Lessons** | Display as cards on the course board, delete, copy, share, visibility toggle |
| **Tasks** | Display on course board, finish/restore, overview page (student/teacher), delete, copy, share |
| **Classes** | Admin overview table, class members page, delete, year-upgrade links |

**What is NOT in this client:** Several actions link out to URLs that are not served by this Vue app (see §10.3). These include course create/edit, lesson create/edit, task create/edit, and class management forms. Those are handled by the legacy client (separate repository).

### 1.2 How the Routing Works

The server proxy (`server-proxy.mjs`) decides whether to serve this Vue client or forward to the legacy client. The whitelist is in `src/router/vue-client-route.ts`:

```
Vue client routes (relevant to this document):
  /rooms/courses-overview       → Active courses grid (dashboard)
  /rooms/courses-list           → All courses list
  /rooms/:id                    → Course room details (legacy board view)
  /administration/rooms/new     → Admin course table
  /administration/groups/classes → Admin class table
  /administration/groups/classes/:id → Class members page
  /tasks                        → Task overview page
```

Everything else (e.g., `/courses/:id/edit`, `/homework/new`, `/courses/:id/topics/add`) is not whitelisted here and will be served by the legacy client.

### 1.3 Relationship Between Concepts

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Course Room Overview (Dashboard Grid)                                    │
│  /rooms/courses-overview                                                 │
│  → Grid of course cards that can be dragged and grouped                  │
└──────────────────────────┬───────────────────────────────────────────────┘
                           │ click on a course
                           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  Course Room Details                                                      │
│  /rooms/:id                                                              │
│  → Tabs: Learn Content | Tools | Groups                                  │
│                                                                          │
│  "Learn Content" tab shows the Legacy Board:                             │
│  ┌────────────────────────────────────────────────────────┐              │
│  │  Ordered list of elements (drag-to-reorder for teachers):│             │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │              │
│  │  │ Lesson   │  │  Task    │  │  Board   │             │              │
│  │  │ Card     │  │  Card    │  │  Card    │             │              │
│  │  └──────────┘  └──────────┘  └──────────┘             │              │
│  └────────────────────────────────────────────────────────┘              │
└──────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Backend API Split (Context for Frontend)

The frontend calls different backend APIs for different operations:

| API Base | Used For | Example Calls |
|---|---|---|
| `/v1/courses` | Legacy Feathers – CRUD, fetch single course | `GET /v1/courses/:id`, `DELETE /v1/courses/:id` |
| `/v1/classes` | Legacy Feathers – class CRUD and delete | `DELETE /v1/classes/:id` |
| `/v3/courses` | NestJS – course list, sync start/stop, permissions | `courseControllerFindForUser`, `courseControllerStopSynchronization` |
| `/v3/course-info` | NestJS – admin course table | `courseInfoControllerGetCourseInfo` |
| `/v3/course-rooms` | NestJS – legacy board view, copy | `courseRoomsControllerGetRoomBoard`, `courseRoomsControllerCopyCourse` |
| `/v3/dashboard` | NestJS – dashboard grid | `dashboardControllerFindForUser`, `dashboardControllerMoveElement` |
| `/v3/groups/class` | NestJS – class list (merged legacy+group) | `groupControllerFindClasses` |
| `/v3/groups/:id` | NestJS – group details (class members) | `groupControllerGetGroup` |
| `/v3/lessons/:id` | NestJS – lesson delete | `lessonControllerDelete` |
| `/v3/tasks` | NestJS – task operations | `taskControllerFinish`, `taskControllerDelete` |

---

## 2. Module & File Structure

### 2.1 Key Directories

```
src/
├── pages/
│   ├── course-rooms/
│   │   ├── CourseRoomOverview.page.vue    # Active courses grid (dashboard)
│   │   ├── CourseRoomList.page.vue        # All courses list
│   │   ├── CourseRoomDetails.page.vue     # Course room detail (legacy board)
│   │   └── CourseRoomLocked.page.vue      # Locked course fallback
│   ├── administration/
│   │   ├── CoursesAdminOverview.page.vue  # Admin course management table
│   │   └── ClassOverview.page.vue         # Admin class management table
│   ├── tasks/
│   │   └── TaskOverview.page.vue          # Student/Teacher task overview
│   └── Dashboard.page.vue                 # Home dashboard (shows tasks section)
│
├── modules/
│   ├── data/
│   │   ├── course-rooms/                  # Pinia stores for course room views
│   │   │   ├── course-room-list.store.ts     # Dashboard grid + all courses data
│   │   │   ├── course-room-details.store.ts  # Course room board data + operations
│   │   │   └── types.ts                      # Extended UI types
│   │   ├── room/                          # Course API composables (shared with rooms)
│   │   │   ├── courseApi.composable.ts       # Sync start/stop, delete
│   │   │   ├── courseInfoApi.composable.ts   # Admin course list API
│   │   │   └── courseList.composable.ts      # Admin course list state
│   │   ├── group/                         # Group/Class data layer
│   │   │   ├── group-classes.composable.ts   # Class list fetching + delete
│   │   │   ├── GroupApi.composable.ts        # Group API calls
│   │   │   ├── GroupState.composable.ts      # Single group state
│   │   │   ├── GroupMapper.ts                # API → UI type mapping
│   │   │   └── types/                        # ClassInfo, GroupUser, etc.
│   │   ├── classes/                       # Legacy class name lookup
│   │   │   └── classes.composable.ts         # Simple v1 class list for dropdowns
│   │   └── tasks/                         # Task overview data layer
│   │       └── tasks.ts                      # Task fetching, filtering, predicates
│   │
│   ├── feature/
│   │   ├── course-sync/                   # Course synchronization dialogs
│   │   │   ├── EndCourseSyncDialog.vue
│   │   │   ├── StartExistingCourseSyncDialog.vue
│   │   │   ├── StartNewCourseSyncDialog.vue
│   │   │   └── GroupSelectionDialog.vue
│   │   ├── copy/                          # Copy flow (course, lesson, task, board)
│   │   │   ├── copy-flow.composable.ts
│   │   │   └── CopyDialog.vue
│   │   ├── share/                         # Share flow
│   │   │   ├── share-flow.composable.ts
│   │   │   └── ShareDialog.vue
│   │   └── dashboard/                     # Dashboard task widgets
│   │       ├── DashboardTasks.vue
│   │       ├── DashboardTasksOpen.vue
│   │       └── DashboardTasksSection.vue
│   │
│   └── page/
│       └── class-members/                 # Class members page components
│           ├── ClassMembers.page.vue
│           └── ClassMembersInfoBox.vue
│
├── components/
│   └── course-rooms/                      # Course room UI components
│       ├── CourseRoomDashboard.vue            # The learn-content tab (board view)
│       ├── CourseRoomAvatar.vue               # Single course avatar card
│       ├── CourseRoomGroupAvatar.vue          # Grouped courses avatar
│       ├── CourseRoomEmptyAvatar.vue          # Empty grid slot
│       ├── CourseRoomAvatarIterator.vue       # Grid rendering
│       ├── CourseRoomModal.vue                # Group modal dialog
│       ├── CourseRoomWrapper.vue              # Page wrapper with FAB actions
│       ├── CourseRoomTaskCard.vue             # Task element card
│       ├── CourseCommonCartridgeExportModal.vue
│       ├── CourseCommonCartridgeImportModal.vue
│       └── tools/                            # External tools tab components
│
└── components/tasks/                      # Task overview components
    ├── TasksOverviewStudent.vue
    ├── TasksOverviewTeacher.vue
    ├── TasksOverviewList.vue
    └── TasksOverviewListItem*.vue
```

### 2.2 Generated API Layer

All API client code is auto-generated from OpenAPI specs (see `openapitools.json`). The generated factories are imported as:

```typescript
import { CoursesApiFactory, DashboardApiFactory, CourseRoomsApiFactory, ... } from "@api-server";
```

These provide type-safe API calls matching the backend controllers. Key factories:
- `CoursesApiFactory` → `/v3/courses` endpoints
- `CourseInfoApiFactory` → `/v3/course-info` endpoints
- `CourseRoomsApiFactory` → `/v3/course-rooms` endpoints
- `DashboardApiFactory` → `/v3/dashboard` endpoints
- `GroupApiFactory` → `/v3/groups` endpoints
- `TaskApiFactory` → `/v3/tasks` endpoints
- `LessonApiFactory` → `/v3/lessons` endpoints
- `BoardApiFactory` → `/v3/board` endpoints

---

## 3. Course Dashboard (Active Courses Grid)

### 3.1 Page: `CourseRoomOverview.page.vue`

**Route:** `/rooms/courses-overview`

This is the main view teachers and students see — a drag-and-drop grid where courses can be arranged and grouped.

**Key behaviors:**
- Renders a **4-column grid** with course avatar cards
- Courses can be **dragged** between positions (touch-aware with a toggle switch)
- Courses dropped onto each other become **groups** (folders)
- A **search field** filters visible courses
- Links to the "All Courses" list via a button

**Data flow:**
```
CourseRoomOverview.page.vue
  └─► useCourseRoomListStore()
      ├─ fetchCourses()     → DashboardApi.dashboardControllerFindForUser()
      │                        Returns grid with positions (x,y) for each course
      ├─ alignCourse()      → DashboardApi.dashboardControllerMoveElement()
      │                        Moves a course to a new position / creates groups
      └─ updateCourse()     → DashboardApi.dashboardControllerPatchGroup()
                               Renames a group
```

### 3.2 Store: `course-room-list.store.ts`

A Pinia store that manages both the dashboard grid and the full course list.

**State:**
- `roomsData` – Array of `DashboardGridElementResponse` (positioned grid elements)
- `gridElementsId` – The dashboard entity ID (needed for move/patch calls)
- `allElements` – Array of `CourseMetadataResponse` (flat list of all courses)

**Key logic:**
- `extendGridElementResponse` – Adds `to` (navigation link) to each element: `/rooms/:id`
- `extendCourseMetadataResponse` – Adds `searchText`, `isArchived`, and `titleDate` (e.g., "2024/25") to archived courses
- `setPosition` – Optimistic UI update during drag-and-drop

### 3.3 Page: `CourseRoomList.page.vue`

**Route:** `/rooms/courses-list`

A simpler grid showing **all courses** (including archived) with search. Uses the same store's `fetchAllElements` / `allElements`.

---

## 4. Course Room Details (Legacy Board View)

### 4.1 Page: `CourseRoomDetails.page.vue`

**Route:** `/rooms/:id`

This is the detail view when you open a course. It's a tabbed interface:

| Tab | Component | Content |
|---|---|---|
| **Learn Content** | `CourseRoomDashboard.vue` | The legacy board: ordered list of lessons, tasks, and boards |
| **Tools** | `RoomExternalToolsOverview.vue` | External tool integrations (LTI) |
| **Groups** | *(redirects out of Vue client)* | `href="/courses/:id/?activeTab=groups"` |

**Initialization flow:**
```
initialize(courseId)
  ├─► fetchContent(id)          → CourseRoomsApi.courseRoomsControllerGetRoomBoard(id)
  │                                Returns: SingleColumnBoardResponse { roomId, title, elements[], ... }
  ├─► fetchScopePermission(id)  → GET /v3/courses/:id/user-permissions
  │                                Returns: permission array for the user
  └─► Set page title, room variant
```

**Key features:**
- **Locked course handling:** If the backend returns `LOCKED_COURSE` error (course being copied), shows `CourseRoomLocked.page.vue`
- **Synchronized course chip:** Shows "Synchronized" badge if `roomData.isSynchronized`
- **Archived course chip:** Shows "Archived" badge if `roomData.isArchived`
- **Header menu:** Edit, Copy, Share, Export, Sync start/stop (permission-gated)
- **FAB actions:** Add Task (href out), Add Lesson (href out), Add Board (opens layout dialog in this client)

### 4.2 Store: `course-room-details.store.ts`

The Pinia store powering the course room detail view.

**State:**
- `roomData` – `SingleColumnBoardResponse` (the board content)
- `isLocked` – Whether the course is currently being copied
- `scopePermissions` – User's permissions for this course
- `courseShareToken` – For sharing functionality

**Actions:**
| Action | API Call | Purpose |
|---|---|---|
| `fetchCourse` | `GET /v1/courses/:id` | Fetch course metadata (legacy API) |
| `fetchContent` | `courseRoomsControllerGetRoomBoard` | Load the board elements |
| `publishCard` | `courseRoomsControllerPatchElementVisibility` | Toggle lesson/task visibility |
| `sortElements` | `courseRoomsControllerPatchOrderingOfElements` | Reorder board elements |
| `deleteLesson` | `lessonControllerDelete` | Delete a lesson |
| `deleteTask` | `taskControllerDelete` | Delete a task |
| `deleteBoard` | `boardControllerDeleteBoard` | Delete a column board |
| `createBoard` | `boardControllerCreateBoard` | Create a new board on this course |
| `finishTask` | `taskControllerFinish` / `taskControllerRestore` | Student task completion |
| `fetchScopePermission` | `GET /v3/courses/:id/user-permissions` | Load permissions |

### 4.3 Component: `CourseRoomDashboard.vue`

The actual board content renderer, split by role:

**Teacher view:**
- Uses `vuedraggable` for drag-to-reorder
- Shows all elements (lessons, tasks, boards) with action menus
- Can toggle visibility, delete, copy, share elements
- Fires `@update:model-value` on reorder → calls `sortElements`

**Student view:**
- Static list (no drag)
- Only shows visible elements (filtered server-side, but boards additionally filter by `isVisible`)
- Can finish/restore tasks

**Element types rendered:**
| `item.type` | Component | Notes |
|---|---|---|
| `COLUMN_BOARD` | `RoomBoardCard` | Links to `/boards/:id` |
| `TASK` | `CourseRoomTaskCard` | Shows status, due date |
| `LESSON` | `RoomLessonCard` | Shows task counts |

---

## 5. Course Administration

### 5.1 Page: `CoursesAdminOverview.page.vue`

**Route:** `/administration/rooms/new`  
**Permission:** `COURSE_ADMINISTRATION`

An admin table showing all courses for the school, with tabs for current/archived.

**Features:**
- **Filter:** "Without teacher" toggle
- **Sorting:** By course name
- **Pagination:** Server-side
- **Actions per course:** Edit (href out), Delete, Start Sync, End Sync
- **Course Sync dialogs:** `StartExistingCourseSyncDialog`, `EndCourseSyncDialog`

**Data flow:**
```
CoursesAdminOverview.page.vue
  └─► useCourseList() composable
      ├─ fetchCourses(status)  → useCourseInfoApi().loadCoursesForSchool(...)
      │                           → CourseInfoApi.courseInfoControllerGetCourseInfo(...)
      └─ deleteCourse(id)      → useCourseApi().deleteCourseById(id)
                                  → DELETE /v1/courses/:id  (legacy Feathers!)
```

**Note:** Course deletion calls the v1 Feathers API (`DELETE /v1/courses/:id`), not a v3 NestJS endpoint.

### 5.2 Feature Flags (Course)

| Flag | What it gates |
|---|---|
| `FEATURE_COPY_SERVICE_ENABLED` | Copy course/lesson/task menu items |
| `FEATURE_COURSE_SHARE` | Share course menu item |
| `FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED` | Export to Common Cartridge |
| `FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED` | Course sync start/stop UI |
| `FEATURE_COLUMN_BOARD_SHARE` | Share board elements |
| `FEATURE_LESSON_SHARE` | Share lesson elements |
| `FEATURE_TASK_SHARE` | Share task elements |

---

## 6. Course Sync Feature

### 6.1 Concept

Course sync links a course's membership to an external group (from Schulconnex/moin.schule). When synced, the course's students and teachers are automatically updated when the group changes.

### 6.2 Components

📁 `src/modules/feature/course-sync/`

| Component | Purpose |
|---|---|
| `StartExistingCourseSyncDialog.vue` | Select a group and link it to an existing course |
| `StartNewCourseSyncDialog.vue` | Create a new course synced to a group |
| `EndCourseSyncDialog.vue` | Stop syncing a course with its group |
| `GroupSelectionDialog.vue` | Reusable group picker (lists available groups) |

### 6.3 Flow: Starting Sync on an Existing Course

```
User clicks "Start Sync" on a course
  └─► StartExistingCourseSyncDialog opens
      └─► GroupSelectionDialog shows available groups
          │   (calls useGroupApi().getGroups({ availableForSynchronization: true }))
          │
          └─► User selects a group → confirmation dialog
              │   Shows warning: teacher may lose access if not in group
              │
              └─► onConfirmWarning()
                  └─► useCourseApi().startSynchronization(courseId, groupId)
                      → CoursesApi.courseControllerStartSynchronization(courseId, { groupId })
```

### 6.4 Flow: Ending Sync

```
User clicks "End Sync"
  └─► EndCourseSyncDialog opens (confirm/cancel)
      └─► useCourseApi().stopSynchronization(courseId)
          → CoursesApi.courseControllerStopSynchronization(courseId)
```

### 6.5 Where Sync Dialogs Appear

- **Course Room Details** header menu (for teachers with `COURSE_EDIT`)
- **Course Admin Table** per-row actions (for school admins)
- **Class Overview Table** per-row actions (end sync only, for synced groups)

---

## 7. Copy & Share Flows

### 7.1 Copy Flow

📁 `src/modules/feature/copy/copy-flow.composable.ts`

A unified composable that handles copying any content type:

| Function | API Call | After Success |
|---|---|---|
| `executeCopyCourse(courseId)` | `courseRoomsControllerCopyCourse` | Navigate to new course |
| `executeCopyTask(taskId, courseId)` | `taskControllerCopyTask` | Refresh board |
| `executeCopyLesson(lessonId, courseId)` | `courseRoomsControllerCopyLesson` | Refresh board |
| `executeCopyBoard(boardId)` | `boardControllerCopyBoard` | Refresh board |

Each copy shows a confirmation dialog (`CopyDialog.vue`) before executing, and a global loading overlay during the operation.

### 7.2 Share Flow

📁 `src/modules/feature/share/share-flow.composable.ts`

Creates a share token that other users can import. Gated by per-type feature flags (see §5.2).

---

## 8. Task Overview

### 8.1 Page: `TaskOverview.page.vue`

**Route:** `/tasks`

Renders different views based on role:
- **Students:** `TasksOverviewStudent.vue` – grouped by status (open, submitted, graded)
- **Teachers:** `TasksOverviewTeacher.vue` – grouped by status (drafts, current, graded, finished)

### 8.2 Data Layer: `modules/data/tasks/tasks.ts`

A shared composable (`useTasksOfOverview`) that:
1. Fetches all tasks for the current user via `TaskApiFactory`
2. Applies status predicates to categorize tasks
3. Supports pagination (load more)
4. Provides task operations (finish, restore, delete)

**Key predicates (student):**
- `isOpenForStudent` – Not submitted, not graded, lesson visible
- `isSubmittedForStudent` – Has submissions
- `isGradedForStudent` – Has been graded

**Key predicates (teacher):**
- `isTaskDraft` – Not published
- `isTaskOverdue` – Due date in the past
- `isTaskDoneForTeacher` – Overdue + all submissions graded

### 8.3 Relationship to Course Room

Tasks also appear on the Course Room board (§4.3). The `CourseRoomTaskCard` component shows:
- Task name, due date, status indicators
- Teacher: visibility toggle, delete, copy, share
- Student: finish/restore button

---

## 9. Class Administration

### 9.1 Page: `ClassOverview.page.vue`

**Route:** `/administration/groups/classes`  
**Permission:** `CLASS_LIST` + `GROUP_LIST`

An admin table that shows a **merged list** of legacy Classes and provisioned Groups (type CLASS).

**Tabs:** Next Year | Current Year | Archive (previous years)

**Features per class:**

| Class Type | Available Actions |
|---|---|
| Legacy `CLASS` | Manage members (href out), Edit (href out), Delete, Create Successor (href out) |
| Provisioned `GROUP` | Manage members (→ ClassMembers page in this client), End course sync |

### 9.2 Data Flow

```
ClassOverview.page.vue
  └─► useGroupClasses() composable (from @data-group)
      ├─ fetchClassesForSchool({ schoolYearQuery })
      │   → GroupApi.groupControllerFindClasses(skip, limit, sortOrder, sortBy, yearQuery)
      │     Backend merges legacy Class + Group(type=CLASS) into unified response
      │
      └─ deleteClass({ classId, query })
          → DELETE /v1/classes/:classId  (legacy Feathers API)
```

### 9.3 The `ClassInfo` Type

📁 `src/modules/data/group/types/class-info.ts`

```typescript
class ClassInfo {
    id: string;
    type: ClassRootType;        // "class" (legacy) or "group" (provisioned)
    name: string;               // Display name (e.g., "7a")
    externalSourceName?: string;
    teacherNames: string[];
    isUpgradable?: boolean;     // Can create successor (grade < 13, no successor)
    studentCount: number;
    synchronizedCourses?: CourseInfo[];  // Courses synced to this group

    get synchronizedCourse(): CourseInfo | undefined  // First synced course
}
```

The `type` discriminator determines which actions are available in the table.

### 9.4 Page: `ClassMembers.page.vue`

**Route:** `/administration/groups/classes/:groupId`  
**Permission:** `GROUP_VIEW`

Shows a read-only table of group members (first name, last name, role). Only for `GROUP`-type classes. Uses `useGroupState().fetchGroup(groupId)` to load the group with its users.

### 9.5 Legacy Class Composable

📁 `src/modules/data/classes/classes.composable.ts`

A minimal composable used elsewhere (e.g., user creation forms) to fetch class names for dropdown selection:

```typescript
const { fetchClasses, classNameList } = useClasses();
// Calls GET /v1/classes with year filter
// Returns [{ label: "7a", value: "7a" }, ...]
```

---

## 10. Cross-Cutting Concerns

### 10.1 Permission Checking

Permissions are checked in two places:
1. **Route guards** (`beforeEnter` in `routes.ts`) – prevent navigation
2. **UI conditional rendering** – hide/show buttons based on `useAppStore().userPermissions`

Key permissions:
- `COURSE_EDIT` – Show edit/delete/copy/share in course room menu
- `COURSE_ADMINISTRATION` – Access admin course table
- `HOMEWORK_CREATE` – Show "Add Task" FAB
- `TOPIC_CREATE` – Show "Add Lesson" FAB
- `CONTEXT_TOOL_ADMIN` – Show "Add Tool" FAB
- `CLASS_LIST` + `GROUP_LIST` – Access class admin table
- `CLASS_EDIT` – Show class action buttons
- `CLASS_CREATE` – Show "Add Class" FAB

### 10.2 Feature Flags

Feature flags are loaded from the runtime config and accessed via `useEnvConfig()`. They gate UI elements at render time — the backend still enforces them server-side.

### 10.3 Navigation to Non-Vue Routes

Several actions navigate away from this SPA by using `href` (not `to`). These URLs are not in the Vue whitelist and will be served by the legacy client:
- "Add Task" → `/homework/new?course=:id&returnUrl=rooms/:id`
- "Add Lesson" → `/courses/:id/topics/add?returnUrl=rooms/:id`
- "Edit Course" → `/courses/:id/edit`
- "Manage Class Members" (legacy type) → `/administration/classes/:id/manage`
- "Course Files" → `/files/courses/:id`
- "Create Successor" → `/administration/classes/:id/createSuccessor`
- "Edit Class" → `/administration/classes/:id/edit`

The `returnUrl` parameter is included so that after the operation, the user can be redirected back to a page in this Vue client.

### 10.4 Generated API Types

All request/response types (`SingleColumnBoardResponse`, `CourseMetadataResponse`, `ClassInfoResponse`, etc.) are auto-generated. If the backend API changes, regenerate with:
```
npm run generate-client
```

See `openapitools.json` for the generator configuration.

---

## 11. Key Files Quick Reference

| Purpose | File |
|---|---|
| **Pages** | |
| Active courses grid | `src/pages/course-rooms/CourseRoomOverview.page.vue` |
| All courses list | `src/pages/course-rooms/CourseRoomList.page.vue` |
| Course room details | `src/pages/course-rooms/CourseRoomDetails.page.vue` |
| Course locked fallback | `src/pages/course-rooms/CourseRoomLocked.page.vue` |
| Admin course table | `src/pages/administration/CoursesAdminOverview.page.vue` |
| Admin class table | `src/pages/administration/ClassOverview.page.vue` |
| Task overview | `src/pages/tasks/TaskOverview.page.vue` |
| **Data Layer (Stores & Composables)** | |
| Course room list store | `src/modules/data/course-rooms/course-room-list.store.ts` |
| Course room details store | `src/modules/data/course-rooms/course-room-details.store.ts` |
| Course API (sync, delete) | `src/modules/data/room/courseApi.composable.ts` |
| Course info API (admin list) | `src/modules/data/room/courseInfoApi.composable.ts` |
| Course list composable (admin) | `src/modules/data/room/courseList.composable.ts` |
| Class list composable | `src/modules/data/group/group-classes.composable.ts` |
| Group API composable | `src/modules/data/group/GroupApi.composable.ts` |
| Group state composable | `src/modules/data/group/GroupState.composable.ts` |
| Group/Class mapper | `src/modules/data/group/GroupMapper.ts` |
| ClassInfo type | `src/modules/data/group/types/class-info.ts` |
| Legacy class composable | `src/modules/data/classes/classes.composable.ts` |
| Tasks composable | `src/modules/data/tasks/tasks.ts` |
| **Feature Modules** | |
| Copy flow | `src/modules/feature/copy/copy-flow.composable.ts` |
| Copy dialog | `src/modules/feature/copy/CopyDialog.vue` |
| Share flow | `src/modules/feature/share/share-flow.composable.ts` |
| End sync dialog | `src/modules/feature/course-sync/EndCourseSyncDialog.vue` |
| Start sync dialog | `src/modules/feature/course-sync/StartExistingCourseSyncDialog.vue` |
| Start new sync dialog | `src/modules/feature/course-sync/StartNewCourseSyncDialog.vue` |
| Group selection dialog | `src/modules/feature/course-sync/GroupSelectionDialog.vue` |
| Dashboard tasks | `src/modules/feature/dashboard/DashboardTasks.vue` |
| **Components** | |
| Board view (learn content tab) | `src/components/course-rooms/CourseRoomDashboard.vue` |
| Course avatar card | `src/components/course-rooms/CourseRoomAvatar.vue` |
| Course group avatar | `src/components/course-rooms/CourseRoomGroupAvatar.vue` |
| Task card (on board) | `src/components/course-rooms/CourseRoomTaskCard.vue` |
| Page wrapper | `src/components/course-rooms/CourseRoomWrapper.vue` |
| Common Cartridge export | `src/components/course-rooms/CourseCommonCartridgeExportModal.vue` |
| Task student overview | `src/components/tasks/TasksOverviewStudent.vue` |
| Task teacher overview | `src/components/tasks/TasksOverviewTeacher.vue` |
| Class members page | `src/modules/page/class-members/ClassMembers.page.vue` |
| **Routing** | |
| Route definitions | `src/router/routes.ts` |
| Vue client whitelist | `src/router/vue-client-route.ts` |

---

## 12. Known Complexities & Gotchas

| Issue | Details |
|---|---|
| **Mixed API versions** | Some operations use v1 (Feathers), others v3 (NestJS). Both hit the same MongoDB. |
| **Course delete uses v1** | Even though most reads are v3, `deleteCourseById` calls `DELETE /v1/courses/:id` (Feathers). |
| **"Rooms" naming confusion** | URLs use `/rooms/:id` for courses. The newer "Rooms" concept (`@page-room`, `@data-room`) is completely separate — different pages, different module, different backend API. |
| **Legacy board is auto-synced server-side** | The board response always reflects current state — no explicit "add element" action in this client. |
| **Navigation to legacy** | Many "create/edit" actions use `href` to leave this SPA entirely. The `returnUrl` pattern brings users back. |
| **Class type discrimination** | The class table shows both legacy Classes and provisioned Groups. Actions differ by `type` field. |
| **Feature flag gating** | UI shows/hides features but the backend also enforces them. Don't remove backend checks. |
| **Permission vs. Role** | `CourseRoomDashboard.vue` uses *role* (`TEACHER`/`STUDENT`) for structural rendering, but the page uses *permissions* for menu items. |
| **Drag-and-drop** | Dashboard grid uses custom drag logic; board view uses `vuedraggable`. Different patterns. |
| **Store naming** | The `course-room-list.store` handles both the dashboard grid AND the all-courses list. |

---

## 13. Crossover Points with Backend

These are the key touchpoints with the backend (covered in the server handover documents):

| Frontend Feature | Backend Module | Backend Handover Section |
|---|---|---|
| Dashboard grid | `LearnroomModule` – Dashboard controller | Course Module §7 |
| Course room board view | `LearnroomModule` – CourseRooms controller | Course Module §6 |
| Course copy | `LearnroomModule` – CourseCopyUC | Course Module §8 |
| Admin course list | `CourseApiModule` – CourseInfo controller | Course Module §11 |
| Course sync | `CourseApiModule` – Course controller | Course Module §9 |
| Lesson delete | `LessonApiModule` – Lesson controller | Lesson Module §10 |
| Lesson copy | `LearnroomApiModule` – LessonCopyUC | Lesson Module §6 |
| Class list (merged) | `GroupApiModule` – ClassGroupUc | Class Module §7.1 |
| Class delete | Feathers `/classes` service | Class Module §4 |
| Task operations | NestJS Task module | *(separate handover)* |

---

## 14. Suggested Exploration Order

1. **Start with routing:** Read `src/router/routes.ts` and `vue-client-route.ts` to understand which pages exist in this client
2. **Follow the course overview flow:** `CourseRoomOverview.page.vue` → `course-room-list.store.ts` → understand the dashboard grid
3. **Follow the course detail flow:** `CourseRoomDetails.page.vue` → `course-room-details.store.ts` → `CourseRoomDashboard.vue` → understand the board view
4. **Understand element types:** Look at how `CourseRoomDashboard.vue` renders Task/Lesson/Board cards differently
5. **Study the copy flow:** Read `copy-flow.composable.ts` to see how copy confirmation + API calls work
6. **Study the sync flow:** Read `StartExistingCourseSyncDialog.vue` end-to-end
7. **Explore admin views:** Read `CoursesAdminOverview.page.vue` and `ClassOverview.page.vue` to see the admin patterns
8. **Check the task overview:** Read `tasks.ts` to understand filtering/categorization logic

---

*Document prepared for technical handover, July 2026*
