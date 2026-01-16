import h5pOutline from "./h5p-outline.vue";
import langIconDe from "./lang-icon-de.vue";
import langIconEn from "./lang-icon-en.vue";
import langIconEs from "./lang-icon-es.vue";
import langIconUk from "./lang-icon-uk.vue";
import lernstoreOutline from "./lernstore_outline.vue";
import shelfOutline from "./shelf-outline.vue";
import taskDone from "./task-done.vue";
import taskDraft from "./task-draft.vue";
import taskMissed from "./task-missed.vue";
import taskMissedFilled from "./task-missed-filled.vue";
import taskOpenFilled from "./task-open-filled.vue";
import tasks from "./tasks.vue";
import { Component } from "vue";

// TODO: Remove custom icons and use only standardized icons from the design system

const customAliases: Record<string, Component> = {
	// icon h5p-outline is not replacable by mdi or material design icons
	// because it is a custom icon for the H5P file type
	// which is not available in any icon library
	h5pOutline: h5pOutline,
	// language icons are not replacable by mdi or material design icons
	langIconDe: langIconDe,
	langIconEn: langIconEn,
	langIconEs: langIconEs,
	langIconUk: langIconUk,
	// icon lernstore_outline is replacable by mdiLibraryBooksOutline from mdi
	// but it has to be replaced in schulcloud-client, too much work - lernstore will be removed soon
	lernstore_outline: lernstoreOutline,
	// icon shelf-outline is not replacable by mdi or material design icons
	shelfOutline: shelfOutline,
	taskDone: taskDone,
	taskDraft: taskDraft,
	taskMissedFilled: taskMissedFilled,
	taskMissed: taskMissed,
	taskOpenFilled: taskOpenFilled,
	tasks: tasks,
};

export { customAliases };
