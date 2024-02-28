import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { createModuleMocks } from "@/utils/mock-store-module";
import { shallowMount } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import RoomModule from "@/store/room";
import {
	courseFactory,
	businessErrorFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils/factory";
import { CourseFeatures } from "@/store/types/room";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("RoomExternalToolOverview", () => {
	let el: HTMLDivElement;

	const getWrapper = (
		tools: ExternalToolDisplayData[],
		contextExternalToolsModuleGetter?: Partial<ContextExternalToolsModule>
	) => {
		el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getExternalToolDisplayDataList: tools,
				getBusinessError: businessErrorFactory.build(),
				getLoading: false,
				...contextExternalToolsModuleGetter,
			}
		);

		const roomModule = createModuleMocks(RoomModule, {
			getLoading: false,
		});

		roomModule.fetchCourse.mockResolvedValue(null);

		const wrapper = shallowMount(RoomExternalToolsOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
				},
			},
			props: {
				roomId: "testRoolId",
			},
		});

		return {
			wrapper,
			contextExternalToolsModule,
			roomModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when no tools or no videoconference is in the list", () => {
		const setup = () => {
			const { wrapper } = getWrapper([]);

			return {
				wrapper,
			};
		};

		it("should display empty state", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ ref: "tools-empty-state" }).exists()).toBe(
				true
			);
		});
	});

	describe("when the tools are loading", () => {
		const setup = () => {
			const { wrapper } = getWrapper([], {
				getLoading: true,
			});

			return {
				wrapper,
			};
		};

		it("should display progressbar", () => {
			const { wrapper } = setup();

			const progressbar = wrapper.findComponent('[data-testId="progress-bar"]');

			expect(progressbar.attributes("active")).toEqual("true");
		});
	});

	describe("when an error occurred", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper([tool], {
				getBusinessError: businessErrorFactory.build({ error: new Error() }),
			});

			return {
				wrapper,
				tool,
			};
		};

		it("should display the error in the alert", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.exists()).toEqual(true);
		});
	});

	describe("when video conferences are enabled", () => {
		const setup = async () => {
			const { wrapper, roomModule } = getWrapper([]);

			roomModule.fetchCourse.mockResolvedValue(
				courseFactory.build({ features: [CourseFeatures.VIDEOCONFERENCE] })
			);

			await flushPromises();

			return {
				wrapper,
			};
		};

		it("should display the video conference section", async () => {
			const { wrapper } = await setup();

			const vcSection = wrapper.findComponent({
				name: "room-video-conference-section",
			});

			expect(vcSection.exists()).toEqual(true);
		});
	});

	describe("when video conferences are disabled", () => {
		const setup = () => {
			const { wrapper } = getWrapper([]);

			return {
				wrapper,
			};
		};

		it("should display the video conference section", () => {
			const { wrapper } = setup();

			const vcSection = wrapper.findComponent({
				name: "room-video-conference-section",
			});

			expect(vcSection.exists()).toEqual(false);
		});
	});
});
