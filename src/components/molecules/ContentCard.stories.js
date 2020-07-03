import { storiesOf } from "@storybook/vue";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job

import { Resource } from "../../../stories/mockData/Resource";
import ContentCard from "./ContentCard";
import { boolean } from "@storybook/addon-knobs";

storiesOf("5 Molecules/Content/ContentCard", module).add("default", () => ({
	components: { ContentCard },
	data: () => ({
		role: boolean("isAdmin/Teacher", true),
		resource: {
			...Resource,
		},
	}),
	template: `<content-card :resource="resource" :role="role" style="max-width: 30ch"/>`,
}));
