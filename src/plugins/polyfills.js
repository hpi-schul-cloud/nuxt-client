import { polyfill } from "mobile-drag-drop";
// optional import of scroll behaviour
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

// options are optional ;)
polyfill({
	// use this to make use of the scroll behaviour
	dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
	// this flag is set as a workaround of polyfill not applying e.g. on iPads because of a browser requesting
	// full-type website, see https://github.com/timruffles/mobile-drag-drop/issues/167 for more
	forceApply: true,
});
