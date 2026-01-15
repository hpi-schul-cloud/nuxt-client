import h5pOutline from "./h5p-outline.vue";
import langIconDe from "./lang-icon-de.vue";
import langIconEn from "./lang-icon-en.vue";
import langIconEs from "./lang-icon-es.vue";
import langIconUk from "./lang-icon-uk.vue";
import shelfOutline from "./shelf-outline.vue";
import taskDone from "./task-done.vue";
import taskDoneFilled from "./task-done-filled.vue";
import taskDraft from "./task-draft.vue";
import taskMissed from "./task-missed.vue";
import taskMissedFilled from "./task-missed-filled.vue";
import taskOpenFilled from "./task-open-filled.vue";
import tasks from "./tasks.vue";
import { Component } from "vue";

// TODO: Remove custom icons and use only standardized icons from the design system

const customAliases: Record<string, Component> = {
	h5pOutline: h5pOutline,
	langIconDe: langIconDe,
	langIconEn: langIconEn,
	langIconEs: langIconEs,
	langIconUk: langIconUk,
	shelfOutline: shelfOutline,
	taskDoneFilled: taskDoneFilled,
	taskDone: taskDone,
	taskDraft: taskDraft,
	taskMissedFilled: taskMissedFilled,
	taskMissed: taskMissed,
	taskOpenFilled: taskOpenFilled,
	tasks: tasks,
};

export { customAliases };
