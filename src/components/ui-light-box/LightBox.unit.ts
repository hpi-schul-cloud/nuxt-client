import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { ref } from "vue";
import { useInternalLightBox } from "./LightBox.composable";
import LightBox from "./LightBox.vue";
jest.mock("./LightBox.composable");

const mockedUseInternalLightBox = jest.mocked(useInternalLightBox);

describe("LightBox", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		mockedUseInternalLightBox.mockReturnValue({
			close: jest.fn(),
			lightBoxOptions: ref({
				url: "test-url",
				alt: "test-alt",
				name: "test-name",
			}),
			isLightBoxOpen: ref(true),
			openInternal: jest.fn(),
		});

		const wrapper = shallowMount(LightBox as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup();

			const lightBox = wrapper.findComponent(LightBox);

			expect(lightBox.exists()).toBe(true);
		});
	});
});
