import HomeworksList from "./HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
			},
			state: () => ({
				list: homeworks,
			}),
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksList));

	it("Should render complete homework items list", async () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
					store: mockStore,
				},
				vuetify
			),
		});

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(
			homeworks.length
		);
	});

	it.todo("Should link list item links to homework/<id> page");
});
