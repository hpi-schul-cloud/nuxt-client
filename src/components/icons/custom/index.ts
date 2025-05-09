import { Component } from "vue";
import brb from "./brb.vue";
import classIcon from "./class.vue";
import dBildungscloud from "./dBildungscloud.vue";
import filePdfOutline from "./file-pdf-outline.vue";
import folderOpenCoursesOutline from "./folder_open_courses_outline.vue";
import folderOpenSharedOutline from "./folder_open_shared_outline.vue";
import folderOpenTeamsOutline from "./folder_open_teams_outline.vue";
import folderOpenUserOutline from "./folder_open_user_outline.vue";
import gridOutline from "./grid-outline.vue";
import h5pOutline from "./h5p-outline.vue";
import hourglassDisabled from "./hourglass-disabled.vue";
import icCollection from "./ic_collection.vue";
import icDefaultCircle from "./ic_default-circle.vue";
import icDefault from "./ic_default.vue";
import icImageCircle from "./ic_image-circle.vue";
import icImage from "./ic_image.vue";
import icLinkCircle from "./ic_link-circle.vue";
import icLink from "./ic_link.vue";
import icMoveTo from "./ic_move-to.vue";
import icPdfCircle from "./ic_pdf-circle.vue";
import icPdf from "./ic_pdf.vue";
import icSoundCircle from "./ic_sound-circle.vue";
import icSound from "./ic_sound.vue";
import icVideoCircle from "./ic_video-circle.vue";
import icVideo from "./ic_video.vue";
import icWordCircle from "./ic_word-circle.vue";
import icWord from "./ic_word.vue";
import langIconDe from "./lang-icon-de.vue";
import langIconEn from "./lang-icon-en.vue";
import langIconEs from "./lang-icon-es.vue";
import langIconUk from "./lang-icon-uk.vue";
import lernstoreOutline from "./lernstore_outline.vue";
import n21 from "./n21.vue";
import schoolOutline from "./school_outline.vue";
import shelfOutline from "./shelf-outline.vue";
import taskDoneFilled from "./task-done-filled.vue";
import taskDone from "./task-done.vue";
import taskDraft from "./task-draft.vue";
import taskMissedFilled from "./task-missed-filled.vue";
import taskMissed from "./task-missed.vue";
import taskOpenFilled from "./task-open-filled.vue";
import tasks from "./tasks.vue";
import teacher from "./teacher.vue";
import thr from "./thr.vue";

const customAliases: Record<string, Component> = {
	brb: brb,
	class: classIcon,
	dBildungscloud: dBildungscloud,
	file_pdf_outline: filePdfOutline,
	folder_open_courses_outline: folderOpenCoursesOutline,
	folder_open_shared_outline: folderOpenSharedOutline,
	folder_open_teams_outline: folderOpenTeamsOutline,
	folder_open_user_outline: folderOpenUserOutline,
	gridOutline: gridOutline,
	h5pOutline: h5pOutline,
	hourglassDisabled: hourglassDisabled,
	ic_collection: icCollection,
	"ic_default-circle": icDefaultCircle,
	ic_default: icDefault,
	"ic_image-circle": icImageCircle,
	ic_image: icImage,
	"ic_link-circle": icLinkCircle,
	ic_link: icLink,
	"ic_move-to": icMoveTo,
	"ic_pdf-circle": icPdfCircle,
	ic_pdf: icPdf,
	"ic_sound-circle": icSoundCircle,
	ic_sound: icSound,
	"ic_video-circle": icVideoCircle,
	ic_video: icVideo,
	"ic_word-circle": icWordCircle,
	ic_word: icWord,
	langIconDe: langIconDe,
	langIconEn: langIconEn,
	langIconEs: langIconEs,
	langIconUk: langIconUk,
	lernstore_outline: lernstoreOutline,
	n21: n21,
	school_outline: schoolOutline,
	shelfOutline: shelfOutline,
	taskDoneFilled: taskDoneFilled,
	taskDone: taskDone,
	taskDraft: taskDraft,
	taskMissedFilled: taskMissedFilled,
	taskMissed: taskMissed,
	taskOpenFilled: taskOpenFilled,
	tasks: tasks,
	teacher: teacher,
	thr: thr,
};

// const customSet: IconSet = {
// 	component: (props: IconProps) =>
// 		h(props.tag, [
// 			h(customAliases[props.icon as string], {
// 				class: "v-icon__svg",
// 			}),
// 		]),
// };
export { customAliases };
