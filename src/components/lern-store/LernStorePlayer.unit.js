import LernStorePlayer from "./LernStorePlayer";
import { mount } from "@vue/test-utils";

describe("@/components/molecules/LernStorePlayer", () => {
	const wrapper = mount(LernStorePlayer);

	it("Renders the wrapper", () => {
		expect(wrapper.exists()).toBe(true);
	});

	it("Renders Spinner", async () => {
		wrapper.setData({
			loading: true,
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".player-iframe").exists()).toBe(false);
		expect(
			wrapper
				.find(".d-flex, .justify-center, .align-center, .min-height-screen")
				.exists()
		).toBe(true);
	});

	it("Renders Iframe", async () => {
		wrapper.setData({
			loading: false,
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".player-iframe").exists()).toBe(true);
	});

	it("Renders Iframe with data", async () => {
		wrapper.setData({
			loading: false,
			iframeSrc: "iframeTestSRC",
			scriptSrc: "scriptTestSRC",
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".player-iframe").attributes("src")).toBe(
			"iframeTestSRC"
		);
	});

	it("Renders script data", async () => {
		wrapper.setData({
			loading: false,
			iframeSrc: "iframeTestSRC",
			scriptSrc: "scriptTestSRC",
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.props("scriptSrc")).toBe("scriptTestSRC");
	});
});
