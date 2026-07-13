import ImageDisplay from "./ImageDisplay.vue";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("ImageDisplay", () => {
	const setup = (props: { isEditMode: boolean; alternativeText?: string }) => {
		const element = fileElementResponseFactory.build({
			content: { alternativeText: props.alternativeText },
		});
		const propsData = {
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			isEditMode: props.isEditMode,
			element,
			showMenu: true,
		};

		const wrapper = mount(ImageDisplay, {
			props: propsData,
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
	const imageSelektor = "preview-image-stub";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image with correct props", () => {
			const { wrapper, previewSrc, nameProp } = setup({ isEditMode: false });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
			expect(image.attributes("cover")).toBe("false");
			expect(image.attributes("src")).toBe(previewSrc);
			expect(image.attributes("alt")).toBe("components.cardElement.fileElement.emptyAlt " + nameProp);
			expect(image.attributes("maxheight")).toBe("336");
		});

		describe("when alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: false,
					alternativeText,
				});

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("when alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, nameProp } = setup({ isEditMode: false });

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe("components.cardElement.fileElement.emptyAlt " + nameProp);
			});
		});

		describe("when div emits click", () => {
			it("should not emit activate event in view mode", async () => {
				const { wrapper } = setup({
					isEditMode: false,
					alternativeText: "alternative text",
				});

				const image = wrapper.find(imageSelektor);
				expect(image.exists()).toBe(true);
				await image.trigger("click");

				expect(wrapper.emitted("activate")).toBeUndefined();
			});

			it("should emit activate event in edit mode", async () => {
				const { wrapper } = setup({
					isEditMode: true,
					alternativeText: "alternative text",
				});

				const image = wrapper.find(imageSelektor);
				expect(image.exists()).toBe(true);
				await image.trigger("click");

				expect(wrapper.emitted("activate")).toHaveLength(1);
			});
		});

		it("should not set interactive cursor class in view mode", () => {
			const { wrapper } = setup({ isEditMode: false });

			expect(wrapper.find(".interactive-cursor").exists()).toBe(false);
		});

		it("should not set activatable class in view mode", () => {
			const { wrapper } = setup({ isEditMode: false });

			expect(wrapper.find(".content-element-display-activatable").exists()).toBe(false);
		});

		describe("when div emits keydown", () => {
			it.each(["space", "enter"])("should not emit activate event in view mode when pressing %s", async (key) => {
				const { wrapper } = setup({
					isEditMode: false,
					alternativeText: "alternative text",
				});

				const image = wrapper.find(imageSelektor);
				expect(image.exists()).toBe(true);
				await image.trigger(`keydown.${key}`);

				expect(wrapper.emitted("activate")).toBeUndefined();
			});

			it.each(["space", "enter"])("should emit activate event in edit mode when pressing %s", async (key) => {
				const { wrapper } = setup({
					isEditMode: true,
					alternativeText: "alternative text",
				});

				const image = wrapper.find(imageSelektor);
				expect(image.exists()).toBe(true);
				await image.trigger(`keydown.${key}`);

				expect(wrapper.emitted("activate")).toHaveLength(1);
			});
		});
	});

	describe("when isEditMode is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: true });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image with correct props", () => {
			const { wrapper, previewSrc } = setup({ isEditMode: true });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
			expect(image.attributes("src")).toBe(previewSrc);
		});

		describe("When alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: true,
					alternativeText,
				});

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("When alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, nameProp } = setup({ isEditMode: true });

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe("components.cardElement.fileElement.emptyAlt " + nameProp);
			});
		});

		it("should set interactive cursor class in edit mode", () => {
			const { wrapper } = setup({ isEditMode: true });

			expect(wrapper.find(".interactive-cursor").exists()).toBe(true);
		});

		it("should set activatable class in edit mode", () => {
			const { wrapper } = setup({ isEditMode: true });

			expect(wrapper.find(".content-element-display-activatable").exists()).toBe(true);
		});
	});
});
