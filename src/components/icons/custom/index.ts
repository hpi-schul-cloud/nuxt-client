import gridRowOutline from "./grid-row-outline.vue";
import h5pOutline from "./h5p-outline.vue";
import langIconDe from "./lang-icon-de.vue";
import langIconEn from "./lang-icon-en.vue";
import langIconEs from "./lang-icon-es.vue";
import langIconUk from "./lang-icon-uk.vue";
import TaskDraft from "./task-draft.vue";
import TaskMissed from "./task-missed.vue";
import TaskMissedFilled from "./task-missed-filled.vue";
import TaskOpenFilled from "./task-open-filled.vue";
import { Component } from "vue";

const customAliases: Record<string, Component> = {
	gridRowOutline: gridRowOutline,
	h5pOutline: h5pOutline,
	langIconDe: langIconDe,
	langIconEn: langIconEn,
	langIconEs: langIconEs,
	langIconUk: langIconUk,
};

export { customAliases, TaskDraft, TaskMissed, TaskMissedFilled, TaskOpenFilled };
