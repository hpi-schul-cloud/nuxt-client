import GridNews from "./GridNews";

const NewsFactory = (numberOfNews) => {
	const getNews = (seed) => {
		const lastYear = 1901 + new Date().getYear();
		return {
			_id: `News-${seed}`,
			source: "internal",
			title: `News-${seed}`,
			content: `<p>News Content ${seed}</p>`,
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

describe("@components/GridNews", () => {
	it(...isValidComponent(GridNews));

	it("should render all news cards", () => {
		const news = NewsFactory(20);
		const wrapper = mount(GridNews, {
			...createComponentMocks({ router: true, i18n: true }),
			propsData: {
				news,
			},
		});
		news.forEach((n) => {
			expect(wrapper.find(`#${n._id}`).exists()).toBe(true);
		});
	});

	it("should render all news in landscape", () => {
		const news = NewsFactory(20);
		const wrapper = mount(GridNews, {
			...createComponentMocks({ router: true, i18n: true }),
			propsData: {
				news,
				listView: true,
			},
		});
		news.forEach((n) => {
			expect(wrapper.find(`#${n._id}`).exists()).toBe(true);
			// TODO check for landscape
		});
	});
});
