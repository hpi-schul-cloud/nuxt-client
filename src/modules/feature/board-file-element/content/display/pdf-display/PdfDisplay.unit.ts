import PdfDisplay from "./PdfDisplay.vue";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("PdfDisplay", () => {
	const setup = (props: { isEditMode: boolean; showMenu?: boolean }) => {
		const element = fileElementResponseFactory.build();
		const propsData = {
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			element,
			isEditMode: props.isEditMode,
			showMenu: props.showMenu ?? true,
		};

		const wrapper = mount(PdfDisplay, {
			attachTo: document.body,
			propsData,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { PreviewImage: true },
			},
		});

		return {
			wrapper,
			src: propsData.src,
			nameProp: propsData.name,
			previewSrc: propsData.previewSrc,
			element,
		};
	};

	it("should display image with correct props", () => {
		const { wrapper, previewSrc } = setup({ isEditMode: false });

		const image = wrapper.find("preview-image-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(previewSrc);
		expect(image.attributes("alt")).toBe("");
		expect(image.attributes("aspectratio")).toBe("1.77777");
	});

	it("should not set interactive class in view mode", () => {
		const { wrapper } = setup({ isEditMode: false });

		expect(wrapper.find(".content-element-interactive").exists()).toBe(false);
	});

	it("should set interactive class in edit mode", () => {
		const { wrapper } = setup({ isEditMode: true });

		expect(wrapper.find(".content-element-interactive").exists()).toBe(true);
	});

	it("should display menu when showMenu is true", () => {
		const { wrapper } = setup({ isEditMode: true, showMenu: true });

		const menu = wrapper.find(".three-dot-menu");

		expect(menu.exists()).toBe(true);
	});

	it("should not display menu when isEditMode is true", () => {
		const { wrapper } = setup({ isEditMode: true, showMenu: false });

		const menu = wrapper.find(".three-dot-menu");

		expect(menu.exists()).toBe(false);
	});

	describe("when div emits click", () => {
		it("should not emit activate event in view mode", async () => {
			const { wrapper } = setup({ isEditMode: false });

			const image = wrapper.find("preview-image-stub");
			expect(image.exists()).toBe(true);
			await image.trigger("click");

			expect(wrapper.emitted("activate")).toBeUndefined();
		});

		it("should emit activate event in edit mode", async () => {
			const { wrapper } = setup({ isEditMode: true });

			const image = wrapper.find("preview-image-stub");
			expect(image.exists()).toBe(true);
			await image.trigger("click");

			expect(wrapper.emitted("activate")).toHaveLength(1);
		});
	});
});
