import { $axios, initializeAxios } from "@/utils/api";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount } from "@vue/test-utils";
import { expect } from "vitest";
import LernStorePlayer from "./LernStorePlayer";

initializeAxios({
	get: async () => {
		return { data: {} };
	},
});

vi.spyOn($axios, "get").mockResolvedValue({
	data: {
		iframe_src: "iframeTestSRC",
		script_src: "scriptTestSRC",
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
		const { wrapper } = setup();
		expect(wrapper.find(".player-iframe").exists()).toBe(false);
		expect(
			wrapper
				.find(".d-flex, .justify-center, .align-center, .min-height-screen")
				.exists()
		).toBe(true);
	});

	it("Fetches data by nodeId", async () => {
		setup({
			nodeId: "testNodeId",
		});

		expect($axios.get).toHaveBeenCalledWith(
			"/v1/edu-sharing/player/testNodeId"
		);
	});

	it("Renders Iframe src", async () => {
		const { wrapper } = setup();

		await flushPromises();

		expect(wrapper.find(".player-iframe").attributes("src")).toBe(
			"iframeTestSRC"
		);
	});

	it("Renders script tag", async () => {
		vi.spyOn(document.body, "appendChild");

		setup();

		await flushPromises();

		const appendedNode = document.body.appendChild.mock.calls[0][0];

		expect(appendedNode.tagName).toBe("SCRIPT");
		expect(appendedNode.src).toContain("scriptTestSRC");
	});
});
