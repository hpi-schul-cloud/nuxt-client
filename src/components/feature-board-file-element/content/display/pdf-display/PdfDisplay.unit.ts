import { fileElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ColorOverlay } from "@ui-color-overlay";
import { shallowMount } from "@vue/test-utils";
import PdfDisplay from "./PdfDisplay.vue";

describe("PdfDisplay", () => {
	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const element = fileElementResponseFactory.build();
		const propsData = {
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			element,
			isEditMode: props.isEditMode,
		};

		const wrapper = shallowMount(PdfDisplay, {
			attachTo: document.body,
			propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
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
		const { wrapper, previewSrc, nameProp } = setup({ isEditMode: false });

		const image = wrapper.find("preview-image-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(previewSrc);
		expect(image.attributes("alt")).toBe(
			"components.cardElement.fileElement.pdfAlt " + nameProp
		);
		expect(image.attributes("aspectratio")).toBe("1.77777");
	});

	it("should render color overlay with correct props", () => {
		const { wrapper } = setup({ isEditMode: false });

		const colorOverlay = wrapper.findComponent(ColorOverlay);

		expect(colorOverlay.exists()).toBe(true);
		expect(colorOverlay.props("color")).toBe("rgba(var(--v-theme-black))");
	});

	describe("when color overlay emits on:action", () => {
		it("should call open function", () => {
			const { wrapper, src } = setup({ isEditMode: false });

			const windowOpenSpy = jest.spyOn(window, "open");
			const colorOverlay = wrapper.findComponent(ColorOverlay);

			colorOverlay.vm.$emit("on:action");

			expect(windowOpenSpy).toHaveBeenCalledTimes(1);
			expect(windowOpenSpy).toHaveBeenCalledWith(src, "_blank");
		});
	});
});
