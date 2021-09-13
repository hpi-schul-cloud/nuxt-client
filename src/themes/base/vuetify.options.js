import hourglassBottomBlack from "@assets/icons/hourglass-bottom-black.vue";
import hourglassDisabled from "@assets/icons/hourglass-disabled.vue";
import taskOpenFilled from "@assets/icons/task-open-filled.vue";
import taskDone from "@assets/icons/task-done.vue";
import taskDoneFilled from "@assets/icons/task-done-filled.vue";
import taskMissed from "@assets/icons/task-missed.vue";
import taskMissedFilled from "@assets/icons/task-missed-filled.vue";

export default {
	theme: {
		themes: {
			light: {
				primary: "#b1063a",
				secondary: "#455b6a",
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
		},
	},
};
