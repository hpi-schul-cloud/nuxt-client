import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, shallowMount } from "@vue/test-utils";
import FileContentElementEdit from "./FileContentElementEdit.vue";

describe("FileContentElementEdit", () => {
	describe("shallow mounted", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const captionProp = "Test Caption";

			const wrapper = shallowMount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData: { caption: captionProp, autofocus: false },
			});

			return { wrapper, captionProp };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const fileContentElement = wrapper.findComponent(FileContentElementEdit);
			expect(fileContentElement.exists()).toBe(true);
		});

		it("should find caption", async () => {
			const { wrapper, captionProp } = setup();

			const caption = wrapper.find("vtextfield-stub").attributes("value");

			expect(caption).toBe(captionProp);
		});
	});

	describe("mounted", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const captionProp = "Test Caption";

			const wrapper = mount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData: { caption: captionProp, autofocus: false },
			});

			return { wrapper, captionProp };
		};

		it("should emit update:caption on text input", async () => {
			const { wrapper } = setup();

			const captionInput = wrapper
				.findComponent({ name: "v-text-field" })
				.find("input");
			const newCaption = "New Caption";
			await captionInput.setValue(newCaption);

			expect(wrapper.emitted("update:caption")).toBeTruthy();
			expect(wrapper.emitted("update:caption")?.[0]).toEqual([newCaption]);
		});
	});
});
