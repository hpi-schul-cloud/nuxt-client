import hourglassBottomBlack from "@/assets/icons/hourglass-bottom-black.vue";
import hourglassDisabled from "@/assets/icons/hourglass-disabled.vue";
import tasks from "@/assets/icons/tasks.vue";
import taskOpenFilled from "@/assets/icons/task-open-filled.vue";
import taskDone from "@/assets/icons/task-done.vue";
import taskDoneFilled from "@/assets/icons/task-done-filled.vue";
import taskMissed from "@/assets/icons/task-missed.vue";
import taskMissedFilled from "@/assets/icons/task-missed-filled.vue";
import taskDraft from "@/assets/icons/task-draft.vue";
import taskFinished from "@/assets/icons/task-finished.vue";
import langIconDe from "@/assets/icons/lang-icon-de.vue";
import langIconEn from "@/assets/icons/lang-icon-en.vue";
import langIconEs from "@/assets/icons/lang-icon-es.vue";
import langIconUa from "@/assets/icons/lang-icon-ua.vue";
import colors from "vuetify/lib/util/colors";

export default {
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: {
					base: "#9e292b",
					darken1: "#800416",
				},
				secondary: {
					base: "#54616e",
					lighten1: "#8a9199",
					darken1: "#3a424b",
				},
				accent: {
					base: "#e98404",
				},
				black: {
					base: "#1b1b1b",
				},
				white: {
					base: "#ffffff",
				},
				grey: {
					base: colors.grey.base,
					lighten1: colors.grey.lighten3,
					lighten2: colors.grey.lighten2,
					darken1: colors.grey.darken3,
				},
				info: {
					base: "#0a7ac9",
					darken1: "#085c96",
				},
				success: {
					base: "#13ba98",
					darken1: "#0e8c71",
				},
				warning: {
					base: "#ff8311",
				},
				error: {
					base: "#ff1134",
					darken1: "#bf0d26",
				},
			},
		},
	},
	icons: {
		iconfont: "fa4",
		values: {
			hourglassBottomBlack: {
				component: hourglassBottomBlack,
			},
			hourglassDisabled: {
				component: hourglassDisabled,
			},
			tasks: {
				component: tasks,
			},
			taskOpenFilled: {
				component: taskOpenFilled,
			},
			taskDone: {
				component: taskDone,
			},
			taskDoneFilled: {
				component: taskDoneFilled,
			},
			taskMissed: {
				component: taskMissed,
			},
			taskMissedFilled: {
				component: taskMissedFilled,
			},
			taskDraft: {
				component: taskDraft,
			},
			taskFinished: {
				component: taskFinished,
			},
			langIconDe: {
				component: langIconDe,
			},
			langIconEn: {
				component: langIconEn,
			},
			langIconEs: {
				component: langIconEs,
			},
			langIconUa: {
				component: langIconUa,
			},
		},
	},
};
