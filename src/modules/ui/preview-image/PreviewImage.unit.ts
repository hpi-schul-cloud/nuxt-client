import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { WarningAlert } from "@ui-alert";
import { PreviewImage } from "@ui-preview-image";
import { mount, shallowMount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import { VImg } from "vuetify/lib/components/index";

describe("PreviewImage", () => {
	const setupWithShallowMount = (
		props?: ComponentProps<typeof PreviewImage>
	) => {
		const propsData = {
			...props,
			src: "https://www.example.com/image-preview.jpg",
			alt: "image.jpg",
			"aspect-ratio": 1.77777,
			position: "top",
			cover: true,
			"max-height": 336,
		};
		const wrapper = shallowMount(PreviewImage, {
			propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		return {
			wrapper,
			src: propsData.src,
			alt: propsData.alt,
		};
	};

	const setupWithMount = (props?: ComponentProps<typeof PreviewImage>) => {
		const propsData = {
			...props,
			src: "https://www.example.com/image-preview.jpg",
			alt: "image.jpg",
			"aspect-ratio": 1.77777,
			position: "top",
			cover: true,
			"max-height": 336,
		};
		const wrapper = mount(PreviewImage, {
			attachTo: document.body,
			propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		return {
			wrapper,
			src: propsData.src,
			alt: propsData.alt,
		};
	};

	it("should display image with correct props", () => {
		const { wrapper, src, alt } = setupWithShallowMount();

		const image = wrapper.findComponent(VImg);

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(src);
		expect(image.attributes("alt")).toBe(alt);
		expect(image.attributes("aspectratio")).toBe("1.77777");
		expect(image.attributes("cover")).toBe("true");
		expect(image.attributes("maxheight")).toBe("336");
	});

	it("should set max-width with correct value", async () => {
		const { wrapper } = setupWithShallowMount();
		wrapper.vm.imageRef.image = {
			naturalWidth: "100",
		};

		const image = wrapper.findComponent(VImg);

		await image.trigger("load");

		expect(image.attributes("maxwidth")).toBe("100");
	});

	it("should has loading spinner", () => {
		const { wrapper } = setupWithMount();

		expect(wrapper.html().includes("v-progress-circular")).toBe(true);
	});

	describe("when img emits error", () => {
		it("should display warning alert", async () => {
			const { wrapper } = setupWithMount();

			const image = wrapper.find("img");
			await image.trigger("error");

			const alert = wrapper.findComponent(WarningAlert);
			expect(alert.exists()).toBe(true);
		});

		it("should render error slot", async () => {
			const { wrapper } = setupWithMount();

			const image = wrapper.find("img");
			await image.trigger("error");

			const errorSlot = wrapper.find(".v-img__error");
			expect(errorSlot.exists()).toBe(true);
		});
	});
});
