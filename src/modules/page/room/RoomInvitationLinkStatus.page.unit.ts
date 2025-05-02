import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useRoomInvitationLinkStore } from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRouter } from "vue-router";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import AuthModule from "@/store/auth";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import RoomInvitationLinkStatusPage from "./RoomInvitationLinkStatus.page.vue";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import NotifierModule from "@/store/notifier";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));

/* jest.mock("@data-room", () => ({
	useRoomInvitationLinkStore: jest.fn().mockReturnValue({
		useLink: jest.fn(),
	}),
})); */

describe("RoomInvitationLinkStatusPage", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = () => {
		const notifierModule = createModuleMocks(NotifierModule);
		const invitationLink = roomInvitationLinkFactory.build();

		const wrapper = mount(RoomInvitationLinkStatusPage, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							roomInvitationLinkStore: {
								roomInvitationLinks: [invitationLink],
								isLoading: false,
							},
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},

			props: {
				invitationLinkId: "invitation-link-id",
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		roomInvitationLinkStore.useLink.mockResolvedValueOnce({
			roomId: "room-id",
			message: "",
		});

		return {
			wrapper,
			roomInvitationLinkStore,
			invitationLink,
			router: useRouter(),
		};
	};

	it("should be found in the dom", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("DefaultWireframe", () => {
		const roomInvitationLinkBreadcrumb = [
			{
				title: "pages.rooms.title",
				to: "/rooms",
			},
			{
				title: "pages.rooms.invitationLinkStatus.title",
				disabled: true,
			},
		];

		it("should render DefaultWireframe", async () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.exists()).toBe(true);
		});

		it("should set correct breadcrumbs ", () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.props("breadcrumbs")).toEqual(
				roomInvitationLinkBreadcrumb
			);
		});
	});
});
