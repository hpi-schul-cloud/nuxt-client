/**  
    Actions to support in MVP:
    read board ✅
    read cards ✅
    rename board ✅
    create column ✅
    rename column ✅
    move column ✅
    delete column ✅
    create card ✅
    move card ✅
    delete card ✅

    Actions to support later: 
    Move cards between boards
    create board
    delete board

    Other thoughts:
        - we have to support cards being added/removed from other places (task overview)
        - we have to support cards being added/removed from legacy (tasks and lessons)
        - we might want to load board information from rough to detailed (we had the idea to first render loading states for all cards, and then query each card individually)
        - create and delete board is not necessarily needed in the first version
        - single requests for moving single elements, or reorder?

*/

/*
  Regarding Multi-Tenant conflicts: 

  Util we have Websockts to keep all clients (almost) in sync with each other, we have to deal with Conflicts in some way.

  Option 1: We track a Board-Version for every mutation to the board and return a `409 - Conflict` on version mismatch. 
            When there is a mismatch the board gets refreshed.

  Option 2: We track a Board-Version for each board mutation. When there is a Version mismatch greater than +1 
            (e.g. last known version is 10, backend returns a 12) the Frontend reloads the board.


  **Intermediary decision**
  Option 3: We ignore multi-tenant edits until we have websockts. 
            On each board-mutation, we return the full board-skeleton and update to minimize potential conflicts.			
*/

interface CourseBoardTaskCard {}

interface CouseBoardContentCard {}

interface CourseBoardElement {}

type CourseBoardCardType = "task" | "content" | "legacy-task" | "legacy-lesson";

// GET - Load a CourseBoard
// /boards/:id

interface CourseBoard {
	id: string;
	title: string;
	columns: CourseBoardColumn[];
	version: number;
	timestamps: CourseBoardTimestamps;
}

interface CourseBoardTimestamps {
	lastUpdatedAt: string;
	createdAt: string;
	deletedAt: string;
}

interface CourseBoardColumn {
	id: string;
	title: string;
	cards: CourseBoardSkeletonCard[]; // ?
}

interface CourseBoardSkeletonCard {
	//?
	id: string;
	height: number;
}

// GET - Load a list of cards
// /cards?ids=123,456,789

// Response
// list of CourseBoardCard

interface CourseBoardCard {
	id: string;
	height: number;
	elements: ContentElement[];
	cardType: CourseBoardCardType;
	visibility: VisibilitySettings;
}

interface VisibilitySettings {
	publishedAt: string | undefined; // undefined = invisible | Date specifies the visibility from
}

declare type AnyCourseBoardCard =
	| CourseBoardLegacyLessonCard
	| CourseBoardLegacyTaskCard; // union of all CourseBoardCard-Interfaces

interface CourseBoardLegacyLessonCard extends CourseBoardCard {
	cardType: "legacy-lesson";
	lessonId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyLesson

	// some properties
}

interface CourseBoardLegacyTaskCard extends CourseBoardCard {
	cardType: "legacy-task";
	taskId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyTask
	// some properties
}

declare type AnyContentElement = TextContentElement | TitleContentElement; // union of all Element-Interfaces

declare type ContentElementType =
	| "legacy-lesson"
	| "legacy-task"
	| "text"
	| "title"
	| "image"
	| "task";

interface ContentElement {
	id: string;
	elementType: ContentElementType;
}

interface TextContentElement {}

interface TitleContentElement {}

// **IDEA**
// We want to prevent collisions or at least notify about collisions by versioning the board with an autoincrement ID on database manipulation
// how we transfer the version on each request is up for debate.

// PATCH - Move a Card on the board
// /boards/:boardId/movecard

interface Payload {
	cardId: CourseBoard_Skeleton_Card["id"];
	toColumnId: CourseBoardColumn["id"];
	toIndex: number;
	version: number;
}

// Responses
// 200 OK - No Conflict -> Card was moved to expected position
interface Response {
	version: number;
}
// 400 Bad Request - some id did not exist -> Card was not moved, reload
interface Response {
	version: number;
}
// 409 Conflict - Action conflicts -> reload board, card was not moved
interface Response {
	version: number;
}

// PATCH - Move a Column on the board
// /boards/:boardId/movecolumn

interface Payload {
	columnId: CourseBoardColumn["id"];
	toIndex: number;
	version: number;
}

// Responses
// 200 OK - No Conflict -> Column was moved to expected position
interface Response {
	version: number;
}
// 400 Bad Request - some id did not exist -> Column was not moved, reload
interface Response {
	version: number;
}
// 409 Conflict - Action conflicts -> reload board, Column was not moved
interface Response {
	version: number;
}

// PUT - Move a Column on the board
// /boards/:boardId/movecolumn

interface Payload {
	columnId: CourseBoardColumn["id"];
	toIndex: number;
	version: number;
}

// Responses
// 200 OK - No Conflict -> Column was moved to expected position
interface Response {
	version: number;
}
// 400 Bad Request - some id did not exist -> Column was not moved, reload
interface Response {
	version: number;
}
// 409 Conflict - Action conflicts -> reload board, Column was not moved
interface Response {
	version: number;
}

// PATCH - Rename a Board
// /boards/:boardId/renameboard

interface Payload {
	title: CourseBoard["title"];
}

// Responses
// 200 OK - No Conflict -> Board was renamed
interface Response {
	version: number;
}
// 400 Bad Request - Validation Error -> board was not renamed
interface Response {
	version: number;
}

// PATCH - Rename a Column
// /boards/:boardId/column/:columnId/rename

interface Payload {
	title: CourseBoardColumn["title"];
}

// Responses
// 200 OK - No Conflict -> Column was renamed
interface Response {
	version: number;
}
// 400 Bad Request - Validation Error -> Column was not renamed
interface Response {
	version: number;
}

/*
  ---------------------------
  POST - Create a Column
  /boards/:boardId/column

  - title: defaults to an empty string
    A translated fallback-title is created in the Frontend.
	This way we always have a name for a11y and we can be context aware one-dimensional / n-dimensional layout.
  - cards: defaults to empty array

  hint: Validation needs to factor in a DoS-Attack by adding to many columns. Maybe limit to a 100 cols?
*/

interface Payload {}

// Responses
// 200 OK - No Conflict -> Column was created

// interface CourseBoard {

// }

// 400 Bad Request - Validation Error -> Column was not created
interface Response {
	version: number;
}

// DELETE - Delete a Column
// /boards/:boardId/column/:columnId

/**
 * Deleting a Column also deletes Cards within.
 * User has to approve deleting columns when they have cards in them.
 */

// Responses
// 200 OK - No Conflict -> Column was removed

// interface CourseBoard {

// }

// 400 Bad Request - Validation Error -> Column was not removed
interface Response {
	version: number;
}

/*
  ---------------------------
  POST - Create a Card
  /boards/:boardId/column/:columnId/createcard
  ---------------------------

  - title: defaults to an empty string
  - elements: defaults to empty array
*/
interface Payload {
	type: CourseBoardCardType;
}

// Responses
// 200 OK - No Conflict -> Card was created
// interface AnyCourseBoardCard {

// }

// 400 Bad Request - Validation Error -> Card was not created
interface Response {
	version: number;
}

/*
  ---------------------------
  DELETE - Delete a Card
  /boards/:boardId/card/:cardId
  ---------------------------

  - Deleting a Card also updates the board.
 */

// Responses
// 200 OK - No Conflict -> Card was removed

// interface CourseBoard {

// }

// 400 Bad Request - Validation Error -> Column was not removed
interface Response {
	version: number;
}
