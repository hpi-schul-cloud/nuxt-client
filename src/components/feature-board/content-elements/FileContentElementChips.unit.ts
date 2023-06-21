import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import FileContentElementChips from "./FileContentElementChips.vue";

describe("FileContentElementChips", () => {
	const setup = () => {
		const wrapper = mount(FileContentElementChips, {
			...createComponentMocks({}),
			propsData: {
				fileSize: 3800,
				fileName: "test.jpeg",
			},
		});

		return { wrapper };
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const chipsComponent = wrapper.findComponent(FileContentElementChips);

		expect(chipsComponent.exists()).toBe(true);
	});

	it("should contain two chips", () => {
		const { wrapper } = setup();

		const chips = wrapper.findAll(".v-chip");

		expect(chips.length).toBe(2);
	});

	it("should contain a chip with the file extension", () => {
		const { wrapper } = setup();

		const chip = wrapper.findAll(".v-chip").at(0);

		expect(chip.text()).toBe("JPEG");
	});

	it("should contain a chip with the file size", () => {
		const { wrapper } = setup();

		const chip = wrapper.findAll(".v-chip").at(1);

		expect(chip.text()).toBe("3,71 KB");
	});
});
