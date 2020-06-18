import { storiesOf } from "@storybook/vue";
import { text, array, select } from "@storybook/addon-knobs";
import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job

import ContentCard from "./ContentCard";

storiesOf("5 Molecules/ContentCard", module).add("default", () => ({
	components: { ContentCard },
	template: `<ContentCard v-bind="entry" style="max-width: 30ch"/>`,
	data: () => ({
		entry: {
			description: text(
				"description",
				"Du bist ein Weltenbummler und möchtest deine Erfahrungen und Fotos auf einer eigenen Homepage teilen? Du informierst dich in Fashionblogs über die neuesten Trends und überlegst in einem eigenen Blog deine persönlichen Lieblingsstücke zu präsentieren? Oder hast du ein anderes cooles Hobby und würdest gerne alle Infos dazu auf einer eigenen Webseite zusammenstellen? Hat eure Klasse schon eine eigene Homepage, auf der ihr auf einen Blick seht, was in den nächsten Wochen so ansteht und was auf..."
			),
			licenses: array("licenses", ["MIT"], ","),
			mimeType: select("mimeType", { image: "image" }, "image"),
			providerName: text("providerName", "openHPI"),
			tags: array(
				"tags",
				[
					"Informatik",
					"Klassenstufe 7",
					"Klassenstufe 8",
					"Klassenstufe 9",
					"Klassenstufe 10",
					"Programmieren",
					"HTML",
					"Homepage",
					"Farbzusammenstellung",
					"Bildzusammenstellung",
					"openHPI Junior",
				],
				","
			),
			thumbnail: text("thumbnail", faker.image.dataUri(1, 1)),
			title: text("title", "Wie designe ich meine eigene Homepage?"),
			url: text("url", "https://open.hpi.de/courses/homepage2016"),
		},
	}),
}));
