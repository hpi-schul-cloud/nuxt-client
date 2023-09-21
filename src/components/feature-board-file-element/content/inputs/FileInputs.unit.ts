import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileInputs from "./FileInputs.vue";

describe("FileInputs", () => {
	const setup = (props: { previewUrl?: string; isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const element = fileElementResponseFactory.build();
		const fileProperties = {
			name: "test",
			size: 100,
			url: "test",
			previewUrl: props.previewUrl,
			previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
			isDownloadAllowed: true,
			element,
		};

		const wrapper = shallowMount(FileInputs, {
			propsData: { fileProperties, isEditMode: props.isEditMode },
			...createComponentMocks({}),
		});

		return {
			wrapper,
		};
	};

	describe("when isEditMode is true", () => {
		it("should render CaptionText Component", () => {
			const { wrapper } = setup({ isEditMode: true });

			expect(wrapper.find("CaptionText-stub").exists()).toBe(true);
		});

		describe("when CaptionText emits update:caption", () => {
			it("should emit update:caption", () => {
				const { wrapper } = setup({ isEditMode: true });
				const captionText = wrapper.find("CaptionText-stub");

				captionText.vm.$emit("update:caption", "test");

				expect(wrapper.emitted("update:caption")).toEqual([["test"]]);
			});
		});

		describe("when previewUrl is defined", () => {
			it("should render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: true, previewUrl: "test" });

				expect(wrapper.find("AlternativeText-stub").exists()).toBe(true);
			});

			describe("when AlternativeText emits update:text", () => {
				it("should emit update:alternativeText", () => {
					const { wrapper } = setup({ isEditMode: true, previewUrl: "test" });
					const captionText = wrapper.find("AlternativeText-stub");

					captionText.vm.$emit("update:text", "test");

					expect(wrapper.emitted("update:alternativeText")).toEqual([["test"]]);
				});
			});
		});

		describe("when previewUrl is undefined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: true });

				expect(wrapper.find("AlternativeText-stub").exists()).toBe(false);
			});
		});
	});

	describe("when isEditMode is false", () => {
		it("should not render CaptionText Component", () => {
			const { wrapper } = setup({ isEditMode: false });

			expect(wrapper.find("CaptionText-stub").exists()).toBe(false);
		});

		describe("when previewUrl is defined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: false, previewUrl: "test" });

				expect(wrapper.find("AlternativeText-stub").exists()).toBe(false);
			});
		});

		describe("when previewUrl is undefined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: false });

				expect(wrapper.find("AlternativeText-stub").exists()).toBe(false);
			});
		});
	});
});
