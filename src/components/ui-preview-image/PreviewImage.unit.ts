import errorImage from "@/assets/img/image-not-available.svg";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { PreviewImage } from "@ui-preview-image";
import { mount, shallowMount } from "@vue/test-utils";

describe("PreviewImage", () => {
	const setupWithShallowMount = (props: any) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			...props,
			src: "https://www.example.com/image-preview.jpg",
			alt: "image.jpg",
			"aspect-ratio": 1.77777,
			position: "top",
			cover: true,
		};
		const wrapper = shallowMount(PreviewImage, {
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

	const setupWithMount = (props: any) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			...props,
			src: "https://www.example.com/image-preview.jpg",
			alt: "image.jpg",
			"aspect-ratio": 1.77777,
			position: "top",
			cover: true,
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
		const { wrapper, src, alt } = setupWithShallowMount({});

		const image = wrapper.find("v-img-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(src);
		expect(image.attributes("alt")).toBe(alt);
		expect(image.attributes("aspectratio")).toBe("1.77777");
		expect(image.attributes("position")).toBe("top");
		expect(image.attributes("cover")).toBe("true");
	});

	it("should has loading spinner", () => {
		const { wrapper } = setupWithMount({ isEditMode: false });

		expect(wrapper.html().includes("v-progress-circular")).toBe(true);
	});

	describe("when v-img emits error", () => {
		it("should display warning alert", async () => {
			const { wrapper } = setupWithShallowMount({});
			const image = wrapper.find("v-img-stub");
			await image.trigger("error");

			const alert = wrapper.find("warning-alert-stub");
			expect(alert.exists()).toBe(true);
		});

		it("should emit error event", async () => {
			const { wrapper } = setupWithShallowMount({});
			const image = wrapper.find("v-img-stub");
			await image.trigger("error");

			expect(wrapper.emitted("error")).toBeTruthy();
		});

		it("should pass error image to v-img", async () => {
			const { wrapper } = setupWithShallowMount({});
			const image = wrapper.find("v-img-stub");
			await image.trigger("error");

			expect(image.attributes("src")).toBe(errorImage);
		});
	});
});
