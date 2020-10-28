import { storiesOf } from "@storybook/vue";


import CourseHeader from "./CourseHeader";

storiesOf("Molecules/CourseHeader", module)
	.add("default", () => ({
		components: { CourseHeader },
		template: `<CourseHeader />`,
		data: () => ({}),
	}));
