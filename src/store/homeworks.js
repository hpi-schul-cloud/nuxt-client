import { merge } from "lodash";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("homework");

const module = {
	getters: {
		getNewHomeworks: (state) => {
			// TODO: filter only unread homeworks
			return state;
		},

		getOpenHomeworks: (state) => {
			// TODO: filter only open homeworks
			return state;
		},

		getHomeworksWithoutDue: (state) => {
			// TODO: filter only homeworks without due date
			return state;
		},

		getOverDueHomeworks: (state) => {
			// TODO: filter homeworks that are over due
			return state;
		},

		getRatedHomeworks: (state) => {
			// TODO: filter only rated homeworks
			return state;
		},
	},
};

export default merge(module, base);
