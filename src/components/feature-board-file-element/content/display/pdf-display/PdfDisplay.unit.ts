import { fileElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import PdfDisplay from "./PdfDisplay.vue";

describe("PdfDisplay", () => {
	const setup = (props: { isEditMode: boolean }) => {
		const element = fileElementResponseFactory.build();
		const propsData = {
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			element,
			isEditMode: props.isEditMode,
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
		const { wrapper, previewSrc, nameProp } = setup({ isEditMode: false });

		const image = wrapper.find("preview-image-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(previewSrc);
		expect(image.attributes("alt")).toBe(
			"components.cardElement.fileElement.pdfAlt " + nameProp
		);
		expect(image.attributes("aspectratio")).toBe("1.77777");
	});

	describe("when div emits click", () => {
		it("should call open function", () => {
			const { wrapper, src } = setup({ isEditMode: false });

			const windowOpenSpy = jest.spyOn(window, "open");

			const image = wrapper.find("preview-image-stub");
			expect(image.exists()).toBe(true);
			image.trigger("click");

			expect(windowOpenSpy).toHaveBeenCalledTimes(1);
			expect(windowOpenSpy).toHaveBeenCalledWith(src, "_blank");
		});
	});
});
