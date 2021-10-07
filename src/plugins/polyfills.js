import { polyfill } from "mobile-drag-drop";

// optional import of scroll behaviour
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

// options are optional ;)
polyfill({
	// use this to make use of the scroll behaviour
	dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

console.log("mobileDragAndDrop loaded", polyfill);
