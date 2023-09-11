import { I18N_KEY } from "@/utils/inject";
import { fileElementResponseFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import ImageDisplay from "./ImageDisplay.vue";

describe("ImageDisplay", () => {
	const setup = (props: { isEditMode: boolean; alternativeText?: string }) => {
		document.body.setAttribute("data-app", "true");

		const element = fileElementResponseFactory.build({
			content: { alternativeText: props.alternativeText },
		});
		const propsData = {
			name: "file-record #1.txt",
			previewUrl: "preview/1/file-record #1.txt",
			isEditMode: props.isEditMode,
			element,
		};

		const wrapper = shallowMount(ImageDisplay, {
			propsData,
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});

		return {
			wrapper,
			fileNameProp: propsData.name,
			previewUrl: propsData.previewUrl,
			element,
		};
	};
	const vImageSelektor = "v-img-stub";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup({ isEditMode: false });

			const image = wrapper.find(vImageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrl } = setup({ isEditMode: false });

			const src = wrapper.find(vImageSelektor).attributes("src");

			expect(src).toBe(previewUrl);
		});

		it("should not display div with class 'menu-background'", () => {
			const { wrapper } = setup({ isEditMode: false });

			const div = wrapper.find(".menu-background");
			console.log(wrapper.props());

			expect(div.exists()).toBe(false);
		});

		describe("When alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: false,
					alternativeText,
				});

				const alt = wrapper.find(vImageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("When alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, fileNameProp } = setup({ isEditMode: false });

				const alt = wrapper.find(vImageSelektor).attributes("alt");

				expect(alt).toBe(
					"components.cardElement.fileElement.emptyAlt" + " " + fileNameProp
				);
			});
		});
	});

	describe("when isEditMode is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: true });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup({ isEditMode: true });

			const image = wrapper.find(vImageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrl } = setup({ isEditMode: true });

			const src = wrapper.find(vImageSelektor).attributes("src");

			expect(src).toBe(previewUrl);
		});

		it("should display div with class 'menu-background'", () => {
			const { wrapper } = setup({ isEditMode: true });

			const div = wrapper.find(".menu-background");

			expect(div.exists()).toBe(true);
		});

		describe("When alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: true,
					alternativeText,
				});

				const alt = wrapper.find(vImageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("When alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, fileNameProp } = setup({ isEditMode: true });

				const alt = wrapper.find(vImageSelektor).attributes("alt");

				expect(alt).toBe(
					"components.cardElement.fileElement.emptyAlt" + " " + fileNameProp
				);
			});
		});
	});
});
