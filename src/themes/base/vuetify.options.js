import hourglassBottomBlack from "@assets/icons/hourglass-bottom-black.vue";
import hourglassDisabled from "@assets/icons/hourglass-disabled.vue";

export default {
	theme: {
		themes: {
			light: {
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
		},
	},
};
