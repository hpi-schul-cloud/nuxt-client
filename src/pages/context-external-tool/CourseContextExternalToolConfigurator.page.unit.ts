import ContextExternalToolConfigurator from "@/components/external-tools/configuration/ContextExternalToolConfigurator.vue";
import { ToolContextType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import CourseRoomDetailsModule from "@/store/course-room-details";
import {
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { contextExternalToolFactory } from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { Router, useRouter } from "vue-router";
import CourseContextExternalToolConfigurator from "./CourseContextExternalToolConfigurator.page.vue";

jest.mock("vue-router", () => ({
	useRoute: jest.fn(),
	useRouter: jest.fn(),
}));

const useRouterMock = <jest.Mock>useRouter;
const router = createMock<Router>();
useRouterMock.mockReturnValue(router);

describe("CourseContextExternalToolConfigurator", () => {
	const getWrapper = (
		props: ComponentProps<typeof CourseContextExternalToolConfigurator>
	) => {
		const notifierModule = createModuleMocks(NotifierModule);

		const roomTitle = "Room Title";
		const courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getRoomData: {
				title: roomTitle,
				roomId: "contextId",
				displayColor: "#ffffff",
				elements: [],
				isArchived: false,
				isSynchronized: false,
			},
		});

		const wrapper = mount(CourseContextExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
				stubs: {
					ContextExternalToolConfigurator: {
						template: "<div></div>",
						setup() {
							return {
								fetchData: jest.fn(),
							};
						},
					},
				},
			},
			props: {
				...props,
			},
		});

		return {
			wrapper,
			courseRoomDetailsModule,
			notifierModule,
			roomTitle,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper, roomTitle } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0)?.text()).toEqual("common.words.courses");
			expect(breadcrumbs.at(1)?.text()).toEqual(roomTitle);
		});
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("onMounted", () => {
		const setup = async () => {
			const { wrapper } = getWrapper({
				configId: "configId",
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			await nextTick();

			return {
				wrapper,
			};
		};

		it("should load the configurator data", async () => {
			const { wrapper } = await setup();

			const configurator = wrapper.getComponent(
				ContextExternalToolConfigurator
			);

			expect(configurator.vm.fetchData).toHaveBeenCalled();
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper } = getWrapper({
				contextId: "contextId",
				contextType: ToolContextType.Course,
			});

			wrapper.findComponent(ContextExternalToolConfigurator).vm.$emit("cancel");
			await nextTick();

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/contextId",
				query: { tab: "tools" },
			});
		});
	});

	describe("onSuccess", () => {
		const setup = () => {
			const contextId = "contextId";
			const contextType: ToolContextType = ToolContextType.Course;

			const { wrapper, notifierModule } = getWrapper({
				contextId,
				contextType,
			});

			return {
				wrapper,
				notifierModule,
				contextId,
				contextType,
			};
		};

		it("should redirect back to the room page", async () => {
			const { wrapper, contextId } = setup();

			wrapper
				.findComponent(ContextExternalToolConfigurator)
				.vm.$emit("success", contextExternalToolFactory.build());
			await nextTick();

			expect(router.push).toHaveBeenCalledWith({
				path: `/rooms/${contextId}`,
				query: { tab: "tools" },
			});
		});

		it("should display a notification when created", async () => {
			const { wrapper, notifierModule } = setup();

			wrapper
				.findComponent(ContextExternalToolConfigurator)
				.vm.$emit("success", contextExternalToolFactory.build());
			await nextTick();

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "components.administration.externalToolsSection.notification.created",
				status: "success",
			});
		});
	});
});
