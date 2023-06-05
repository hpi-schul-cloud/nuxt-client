import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, shallowMount } from "@vue/test-utils";
import FileContentElementEdit from "./FileContentElementEdit.vue";

describe("FileContentElementEdit", () => {
	const setupProps = () => ({
		caption: "Test Caption",
		fileRecord: {
			name: "File Record Name",
			url: "File Record URL",
		},
	});

	describe("shallow mounted", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = setupProps();
			const wrapper = shallowMount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData,
			});

			return {
				wrapper,
				captionProp: propsData.caption,
				fileRecordProp: propsData.fileRecord,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const fileContentElement = wrapper.findComponent(FileContentElementEdit);
			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display icon", async () => {
			const { wrapper } = setup();

			const fileIcon = wrapper.find("v-icon-stub");

			expect(fileIcon.exists()).toBe(true);
		});

		it("should find file name", async () => {
			const { wrapper, fileRecordProp } = setup();

			const fileName = wrapper.find("a").text();

			expect(fileName).toBe(fileRecordProp.name);
		});

		it("should find download url", async () => {
			const { wrapper, fileRecordProp } = setup();

			const downloadUrl = wrapper.find("a").attributes("href");

			expect(downloadUrl).toBe(fileRecordProp.url);
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

			const propsData = setupProps();
			const wrapper = mount(FileContentElementEdit, {
				...createComponentMocks({ i18n: true }),
				propsData,
			});

			return { wrapper, captionProp: propsData.caption };
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
