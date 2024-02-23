import LernStorePlayer from "./LernStorePlayer";
import { mount } from "@vue/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { initializeAxios } from "@/utils/api";

initializeAxios({
	get: async () => {
		return { data: [] };
	},
});

describe("@/components/molecules/LernStorePlayer", () => {
	const setup = (props = {}) => {
		const wrapper = mount(LernStorePlayer, {
			props,
			global: {
				plugins: [createTestingVuetify()],
			},
		});
		return {
			wrapper,
		};
	};

	it("Renders the wrapper", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("Renders Spinner", () => {
		const { wrapper } = setup({ loading: true });
		expect(wrapper.find(".player-iframe").exists()).toBe(false);
		expect(
			wrapper
				.find(".d-flex, .justify-center, .align-center, .min-height-screen")
				.exists()
		).toBe(true);
	});

	it("Renders Iframe", () => {
		const { wrapper } = setup({ loading: false });
		expect(wrapper.find(".player-iframe").exists()).toBe(true);
	});

	it("Renders Iframe with data", () => {
		const { wrapper } = setup({
			loading: false,
			iframeSrc: "iframeTestSRC",
			scriptSrc: "scriptTestSRC",
		});
		expect(wrapper.find(".player-iframe").attributes("src")).toBe(
			"iframeTestSRC"
		);
	});

	it("Renders script data", () => {
		const { wrapper } = setup({
			loading: false,
			iframeSrc: "iframeTestSRC",
			scriptSrc: "scriptTestSRC",
		});
		expect(wrapper.props("scriptSrc")).toBe("scriptTestSRC");
	});
});
