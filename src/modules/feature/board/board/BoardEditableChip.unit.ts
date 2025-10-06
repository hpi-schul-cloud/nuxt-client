import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import BoardEditableChip from "./BoardEditableChip.vue";

describe("@feature-board/BoardEditableChip", () => {
	const setup = () => {
		const wrapper = mount(BoardEditableChip, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		return wrapper;
	};

	it("should render correct test", () => {
		const wrapper = setup();

		expect(wrapper.text()).toStrictEqual(
			"components.board.header.chip.editableForEveryone"
		);
	});
});
