import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import FileInputs from "./FileInputs.vue";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import CaptionText from "./caption/CaptionText.vue";

describe("FileInputs", () => {
	const setup = (props: {
		previewUrl?: string;
		isEditMode: boolean;
		isPdf?: boolean;
	}) => {
		const element = fileElementResponseFactory.build();
		const fileProperties = {
			name: "test",
			size: 100,
			url: "test",
			previewUrl: props.previewUrl,
			previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
			isDownloadAllowed: true,
			element,
			mimeType: props.isPdf ? "application/pdf" : "image/png",
			isCollaboraEditable: false,
		};

		const wrapper = shallowMount(FileInputs, {
			props: { fileProperties, isEditMode: props.isEditMode },
			global: { plugins: [createTestingVuetify()] },
		});

		return {
			wrapper,
		};
	};

	describe("when isEditMode is true", () => {
		it("should render CaptionText Component", () => {
			const { wrapper } = setup({ isEditMode: true });

			const captionText = wrapper.findComponent(CaptionText);

			expect(captionText.exists()).toBe(true);
		});

		describe("when CaptionText emits update:caption", () => {
			it("should emit update:caption", () => {
				const { wrapper } = setup({ isEditMode: true });

				const captionText = wrapper.findComponent(CaptionText);
				captionText.vm.$emit("update:caption", "test");

				expect(wrapper.emitted("update:caption")).toEqual([["test"]]);
			});
		});

		describe("when previewUrl is defined", () => {
			describe("when mimetyp is not pdf", () => {
				it("should render AlternativeText Component", () => {
					const { wrapper } = setup({ isEditMode: true, previewUrl: "test" });

					const alternativeText = wrapper.findComponent(AlternativeText);

					expect(alternativeText.exists()).toBe(true);
				});

				describe("when AlternativeText emits update:alternativeText", () => {
					it("should emit update:alternativeText", () => {
						const { wrapper } = setup({ isEditMode: true, previewUrl: "test" });

						const alternativeText = wrapper.findComponent(AlternativeText);
						alternativeText.vm.$emit("update:alternativeText", "test");

						expect(wrapper.emitted("update:alternativeText")).toEqual([
							["test"],
						]);
					});
				});
			});

			describe("when mimetyp is pdf", () => {
				it("should not render AlternativeText Component", () => {
					const { wrapper } = setup({
						isEditMode: true,
						previewUrl: "test",
						isPdf: true,
					});

					const alternativeText = wrapper.findComponent(AlternativeText);

					expect(alternativeText.exists()).toBe(false);
				});
			});
		});

		describe("when previewUrl is undefined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: true });

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});
	});

	describe("when isEditMode is false", () => {
		it("should not render CaptionText Component", () => {
			const { wrapper } = setup({ isEditMode: false });

			const captionText = wrapper.findComponent(CaptionText);

			expect(captionText.exists()).toBe(false);
		});

		describe("when previewUrl is defined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: false, previewUrl: "test" });

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});

		describe("when previewUrl is undefined", () => {
			it("should not render AlternativeText Component", () => {
				const { wrapper } = setup({ isEditMode: false });

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});
	});
});
