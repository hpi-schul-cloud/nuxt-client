import { storiesOf } from "@storybook/vue";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job

import { Resource } from "../../../stories/mockData/Resource";
import ContentCard from "./ContentCard";
import { boolean } from "@storybook/addon-knobs";

import { addDecorator } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";

addDecorator(StoryRouter());

storiesOf("6 Organisms/Content/ContentCard", module).add("ContentCard", () => ({
	components: { ContentCard },
	data: () => ({
		role: boolean("isAdmin/Teacher", true),
		resource: {
			...Resource,
		},
	}),
	template: `<content-card :resource="resource" :role="role" style="max-width: 30ch"/>`,
}));
