import classIcon from "./class.vue";
import filePdfOutline from "./file-pdf-outline.vue";
import h5pOutline from "./h5p-outline.vue";
import icCollection from "./ic_collection.vue";
import langIconDe from "./lang-icon-de.vue";
import langIconEn from "./lang-icon-en.vue";
import langIconEs from "./lang-icon-es.vue";
import langIconUk from "./lang-icon-uk.vue";
import lernstoreOutline from "./lernstore_outline.vue";
import shelfOutline from "./shelf-outline.vue";
import taskDone from "./task-done.vue";
import taskDoneFilled from "./task-done-filled.vue";
import taskDraft from "./task-draft.vue";
import taskMissed from "./task-missed.vue";
import taskMissedFilled from "./task-missed-filled.vue";
import taskOpenFilled from "./task-open-filled.vue";
import tasks from "./tasks.vue";
import teacher from "./teacher.vue";
import { Component } from "vue";

// TODO: Remove custom icons and use only standardized icons from the design system

const customAliases: Record<string, Component> = {
	class: classIcon,
	file_pdf_outline: filePdfOutline,
	h5pOutline: h5pOutline,
	ic_collection: icCollection,
	langIconDe: langIconDe,
	langIconEn: langIconEn,
	langIconEs: langIconEs,
	langIconUk: langIconUk,
	lernstore_outline: lernstoreOutline,
	shelfOutline: shelfOutline,
	taskDoneFilled: taskDoneFilled,
	taskDone: taskDone,
	taskDraft: taskDraft,
	taskMissedFilled: taskMissedFilled,
	taskMissed: taskMissed,
	taskOpenFilled: taskOpenFilled,
	tasks: tasks,
	teacher: teacher,
};

export { customAliases };
