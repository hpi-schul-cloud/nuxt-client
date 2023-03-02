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

	**Decisions**
	 - Rename old Board entities to SingleColumnBoard to avoid conflicts

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

type BoardCardType =
	| "task"
	| "content"
	| "legacy-task-reference"
	| "legacy-lesson-reference";

// GET - Load a Board
// /boards/:id
interface Board {
	id: string;
	title: string;
	columns: BoardColumn[];
	timestamps: BoardTimestamps;
}

interface BoardTimestamps {
	lastUpdatedAt: string;
	createdAt: string;
	deletedAt: string;
}

interface BoardColumn {
	id: string;
	title: string;
	cards: BoardSkeletonCard[];
}

interface BoardSkeletonCard {
	id: string;
	height: number;
}

// GET - Load a list of cards
// /cards?ids=123,456,789

// Response
// list of BoardCard

interface BoardCard {
	id: string;
	height: number;
	elements: ContentElement[];
	cardType: BoardCardType;
	visibility: VisibilitySettings;
	title: string;
}

interface VisibilitySettings {
	publishedAt: string | undefined; // undefined = invisible | Date specifies the visibility from
}

declare type AnyBoardCard = BoardLegacyLessonCard | BoardLegacyTaskCard; // union of all BoardCard-Interfaces

interface BoardLegacyLessonCard extends BoardCard {
	cardType: "legacy-lesson-reference";
	lessonId: string;
	elements: ContentElement[]; // narrowed down to allowed Elements: LegacyLesson

	// some properties
}

interface BoardLegacyTaskCard extends BoardCard {
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

// PUT - Move a Card on the board
// /boards/:boardId/cards/:cardId/position

interface Payload {
	toColumnId: CourseBoardColumn["id"];
	toIndex: number;
}

// Responses
// 200 OK - Card was moved to expected position
interface Response {}
// 400 Bad Request - some id did not exist -> Card was not moved, reload
interface Response {}

// PUT - Move a Column on the board
// /boards/:boardId/columns/:columnId/position

interface Payload {
	toIndex: number;
}

// Responses
// 200 OK - Column was moved to expected position
interface Response {}
// 400 Bad Request - some id did not exist -> Column was not moved, reload
interface Response {}

// PUT - Rename a Board
// /boards/:boardId/title

interface Payload {
	title: Board["title"];
}

// Responses
// 200 OK - Board was renamed
interface Response {}
// 400 Bad Request - Validation Error -> board was not renamed
interface Response {}

// PUT - Rename a Column
// /boards/:boardId/columns/:columnId/title

interface Payload {
	title: BoardColumn["title"];
}

// Responses
// 200 OK - Column was renamed
interface Response {}
// 400 Bad Request - Validation Error -> Column was not renamed
interface Response {}

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
// 200 OK - Column was created
interface Response {}

// 400 Bad Request - Validation Error -> Column was not created
interface Response {}

// DELETE - Delete a Column
// /boards/:boardId/columns/:columnId

/**
 * Deleting a Column also deletes Cards within.
 * User has to approve deleting columns when they have cards in them.
 */

// Responses
// 200 OK - Column was removed

interface Response {}

// 400 Bad Request - Validation Error -> Column was not removed
interface Response {}

/*
  ---------------------------
  POST - Create a Card
  /boards/:boardId/columns/:columnId/card
  ---------------------------

  - title: defaults to an empty string
  - elements: defaults to empty array
*/
interface Payload {
	type: BoardCardType;
}

// Responses
// 200 OK - Card was created
// interface AnyBoardCard {
// }

// 400 Bad Request - Validation Error -> Card was not created
interface Response {}

/*
  ---------------------------
  DELETE - Delete a Card
  /boards/:boardId/cards/:cardId
  ---------------------------

  - Deleting a Card also updates the board.
 */

// Responses
// 200 OK - Card was removed
interface Response {}

// 400 Bad Request - Validation Error -> Column was not removed
interface Response {}
