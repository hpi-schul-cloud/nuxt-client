import { storiesOf } from "@storybook/vue";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job

import { Resource } from "../../../stories/mockData/Resource";
import { Collection } from "../../../stories/mockData/Collection";
import { CollectionElement } from "../../../stories/mockData/CollectionElement";
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
	template: `<content-card :resource="resource" :selectable="false"  :role="role" style="max-width: 30ch"/>`,
}));

storiesOf("6 Organisms/Content/ContentCard", module).add(
	"CollectionCard",
	() => ({
		components: { ContentCard },
		data: () => ({
			role: boolean("isAdmin/Teacher", true),
			resource: {
				...Collection,
			},
		}),
		template: `<content-card :resource="resource" :selectable="false" :role="role" style="max-width: 30ch"/>`,
	})
);

storiesOf("6 Organisms/Content/ContentCard", module).add(
	"SelectableCard",
	() => ({
		components: { ContentCard },
		data: () => ({
			role: boolean("isAdmin/Teacher", true),
			resource: {
				...CollectionElement,
			},
			selectable: true,
		}),
		template: `<content-card :resource="resource" :role="role" :selectable="true" style="max-width: 30ch"/>`,
	})
);
