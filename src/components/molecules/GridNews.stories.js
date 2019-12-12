import { storiesOf } from "@storybook/vue";
import { boolean, text, number } from "@storybook/addon-knobs";

// TODO find a single place for factories
// same code as in the unit test
const NewsFactory = (numberOfNews) => {
	const getNews = (seed) => {
		const lastYear = 1901 + new Date().getYear();
		return {
			_id: `News-${seed}`,
			source: "internal",
			title: `News #${seed + 1}`,
			content: `<p>News Content ${seed + 1}</p>`,
			displayAt: `${lastYear}-11-12T08:11:00.000Z`,
			schoolId: "0000d186816abba584714c5f",
			creatorId: "0000d231816abba584714c9e",
			createdAt: `${lastYear}-11-12T08:50:26.862Z`,
			school: {
				_id: "0000d186816abba584714c5f",
				name: "Paul-Gerhardt-Gymnasium",
			},
			creator: {
				_id: "0000d231816abba584714c9e",
				firstName: "Cord",
				lastName: "Carl",
			},
			__v: 0,
		};
	};
	return Array.from(Array(numberOfNews)).map((a, i) => getNews(i));
};
import GridNews from "./GridNews";

storiesOf("Molecules|GridNews", module).add("default", () => ({
	components: { GridNews },
	template: `<GridNews :news="news" :listView="listView"/>`,
	data: () => ({
		news: NewsFactory(number("number of items", 20)).map((a) => {
			a.content += `<img src=${text(
				"image",
				"https://source.unsplash.com/daily"
			)} role="presentation"/>`;
			return a;
		}),
		listView: boolean("listView", false),
	}),
}));
