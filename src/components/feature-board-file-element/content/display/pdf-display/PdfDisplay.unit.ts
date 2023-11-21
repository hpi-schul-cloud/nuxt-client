import { I18N_KEY } from "@/utils/inject";
import { fileElementResponseFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
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
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
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

		const image = wrapper.find("v-img-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("loading")).toBe("lazy");
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
		expect(colorOverlay.props("color")).toBe("var(--v-black-base)");
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
