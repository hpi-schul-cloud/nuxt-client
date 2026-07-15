// Provided by InlineEditInteractionHandler and injected by content elements
// and BoardAnyTitleInput to coordinate who "owns" a double-click interaction.
// A content element sets this to true when it handles the interaction so that
// BoardAnyTitleInput knows not to focus the title as a fallback.
export const InlineEditInteractionHandled = Symbol("InlineEditInteractionHandled");
