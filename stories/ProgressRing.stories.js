import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/ProgressRing.md";
import ProgressRing from "@components/ProgressRing";

storiesOf("ProgressRing", module)
	.addParameters({
		notes,
	})
	.add("ProgressRing", () => ({
		components: { ProgressRing },
		data: () => ({
			currentPercentage: 40,
		}),
		// methods: {
		//     randomNumber() {
		//       this.percent = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		//     }
		//   }

		template: `<ProgressRing  :percent="currentPercentage"/>`,
	}));
