
/**  
    Actions to support in MVP:
    read board ✅
    read cards ✅
    rename board
    create column
    rename column
    move column ✅
    delete column
    create card
    move card ✅
    delete card

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


interface CourseBoardTaskCard {

}

interface CouseBoardContentCard {

}

interface CourseBoardElement {

}

type CourseBoardCardType = 'task' | 'content' | 'legacy-task' | 'legacy-lesson';

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
    cards: CourseBoard_Skeleton_Card[]; // ?
}

interface CourseBoard_Skeleton_Card { //?
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

interface CourseBoardLegacyLessonCard extends CourseBoardCard {
    cardType: 'legacy-lesson';
    lessonId: string;
    elements: ContentElement[]; // narrowed down to allowed Elements: LegacyLesson

    // some properties
}

interface CourseBoardLegacyTaskCard extends CourseBoardCard {
    cardType: 'legacy-task';
    taskId: string;
    elements: ContentElement[]; // narrowed down to allowed Elements: LegacyTask
    // some properties
}

declare type AnyContentElement = TextContentElement | TitleContentElement; // union of all Element-Interfaces

declare type ContentElementType = 'legacy-lesson' | 'legacy-task' | 'text' | 'title' | 'image' | 'task';

interface ContentElement {
    id: string;
    elementType: ContentElementType;
}

interface TextContentElement {

}

interface TitleContentElement {

}

// **IDEA**
// We want to prevent collisions or at least notify about collisions by versioning the board with an autoincrement ID on database manipulation
// how we transfer the version on each request is up for debate. 

// POST - Move a Card on the board
// /boards/:boardId/movecard

interface Payload {
    cardId: CourseBoard_Skeleton_Card['id'];
    toColumnId: CourseBoardColumn['id'];
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

// POST - Move a Column on the board
// /boards/:boardId/movecolumn

interface Payload {
  columnId: CourseBoardColumn['id'];
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

// POST - Move a Card to a different Board
// tbd