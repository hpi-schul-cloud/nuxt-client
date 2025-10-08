import FileAttributes from "./FileAttributes.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("FileAttributes", () => {
	const setup = () => {
		const fileSize = 3800;
		const fileName = "pic.jpeg";
		const unit = "KB";

		const wrapper = mount(FileAttributes, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				fileSize,
				fileName,
				unit,
			},
		});

		return {
			wrapper,
			fileSize,
			fileName,
			unit,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileAttributes = wrapper.findComponent(FileAttributes);

		expect(fileAttributes.exists()).toBe(true);
	});

	it("should display file extension and size", async () => {
		const { wrapper, unit } = setup();

		expect(wrapper.text()).toBe(`JPEG ⋅ 3.71 ${unit}`);
	});
});
