import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import RoomsPage from "./Rooms.page.vue";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { flushPromises } from "@vue/test-utils";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useTitle: jest.fn(),
	};
});
jest.mocked(useTitle).mockReturnValue(ref(null));

describe("RoomsPage", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = () => {
		const wrapper = mount(RoomsPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		const wrapperVM = wrapper.vm as unknown as {
			pageTitle: string;
			fabItem: {
				icon: string;
				title: string;
				to: string;
				ariaLabel: string;
				testId: string;
			};
		};

		return {
			wrapper,
			wrapperVM,
		};
	};

	describe("when the page is mounted", () => {
		it("should be found in the dom", async () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should have the correct title", async () => {
			const { wrapperVM } = setup();
			await flushPromises();
			expect(useTitle).toHaveBeenCalled();
			expect(wrapperVM.pageTitle).toContain("pages.rooms.title");
		});
	});

	describe("Page Components", () => {
		describe("DefaultWireframe", () => {
			it("should be found in the dom", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});

				expect(wireframe.exists()).toBe(true);
			});

			it("should have the correct props", async () => {
				const { wrapper, wrapperVM } = setup();
				const wireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});

				expect(wireframe.vm["fab-items"]).toBe(wrapperVM.fabItem);
			});
		});

		describe("RoomGrid", () => {
			it("should be found in the dom", async () => {
				const { wrapper } = setup();
				const roomGrid = wrapper.findComponent({ name: "RoomGrid" });

				expect(roomGrid.exists()).toBe(true);
			});
		});
	});
});
