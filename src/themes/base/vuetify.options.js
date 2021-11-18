import hourglassBottomBlack from "@assets/icons/hourglass-bottom-black.vue";
import hourglassDisabled from "@assets/icons/hourglass-disabled.vue";
import taskOpenFilled from "@assets/icons/task-open-filled.vue";
import taskDone from "@assets/icons/task-done.vue";
import taskDoneFilled from "@assets/icons/task-done-filled.vue";
import taskMissed from "@assets/icons/task-missed.vue";
import taskMissedFilled from "@assets/icons/task-missed-filled.vue";
import taskDraft from "@assets/icons/task-draft.vue";
import taskFinished from "@assets/icons/task-finished.vue";

export default {
	theme: {
		themes: {
			light: {
				primary: "#9e292b",
				secondary: "#54616e",
				accent: "#E98404",
				error: "#FF1134",
				info: "#0A7AC9",
				success: "#13BA98",
				warning: "#FFD611",
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
		},
	},
};
