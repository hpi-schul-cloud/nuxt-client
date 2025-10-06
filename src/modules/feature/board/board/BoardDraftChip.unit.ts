import BoardDraftChip from "./BoardDraftChip.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@feature-board/BoardDraftChip", () => {
	const setup = () => {
		const wrapper = mount(BoardDraftChip, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		return wrapper;
	};

	it("should render correct test", () => {
		const wrapper = setup();

		expect(wrapper.text()).toStrictEqual("common.words.draft");
	});
});
