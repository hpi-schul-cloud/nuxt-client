import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	RoomInvitationLinkValidationError,
	UseLinkResult,
	useRoomInvitationLinkStore,
} from "@data-room";
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
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { createPinia, setActivePinia } from "pinia";
import { flushPromises } from "@vue/test-utils";
import { useI18n } from "vue-i18n";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

describe("RoomInvitationLinkStatusPage", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createPinia());
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = async (useLinkResult: UseLinkResult) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const invitationLink = roomInvitationLinkFactory.build();

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		const pinia = createTestingPinia({
			initialState: {
				roomInvitationLinkStore: {
					roomInvitationLinks: [invitationLink],
					isLoading: false,
				},
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		roomInvitationLinkStore.useLink.mockResolvedValueOnce(useLinkResult);

		const wrapper = mount(RoomInvitationLinkStatusPage, {
			attachTo: document.body,
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},

			props: {
				invitationLinkId: invitationLink.id,
			},
		});

		await flushPromises();

		return {
			wrapper,
			roomInvitationLinkStore,
			invitationLink,
			router: useRouter(),
		};
	};

	it("should be found in the dom", async () => {
		const { wrapper } = await setup({ roomId: "room-id", message: "" });

		expect(wrapper.exists()).toBe(true);
	});

	it("should render DefaultWireframe", async () => {
		const { wrapper } = await setup({ roomId: "room-id", message: "" });
		const wireframe = wrapper.findComponent(DefaultWireframe);

		expect(wireframe.exists()).toBe(true);
	});

	it("should set correct breadcrumbs ", async () => {
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

		const { wrapper } = await setup({ roomId: "room-id", message: "" });
		const wireframe = wrapper.findComponent(DefaultWireframe);

		expect(wireframe.props("breadcrumbs")).toEqual(
			roomInvitationLinkBreadcrumb
		);
	});

	it("should set the page title", async () => {
		const { wrapper } = await setup({ roomId: "room-id", message: "" });
		const pageTitle = wrapper.find("[data-testid=page-title]");
		expect(pageTitle.text()).toContain(
			"pages.rooms.invitationLinkStatus.title"
		);
	});

	describe("when link store returns a roomId", () => {
		it("should call the router to navigate to the room", async () => {
			const { router } = await setup({
				roomId: "room-id",
				message: "",
			});

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/room-id",
			});
		});
	});

	describe("when link store returns a message", () => {
		const testCases = [
			{
				message:
					RoomInvitationLinkValidationError.CantInviteStudentsFromOtherSchool,
				expectedMessage:
					"pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool",
			},
			{
				message: RoomInvitationLinkValidationError.Expired,
				expectedMessage: "pages.rooms.invitationLinkStatus.expired",
			},
			{
				message: RoomInvitationLinkValidationError.OnlyForTeachers,
				expectedMessage: "pages.rooms.invitationLinkStatus.onlyForTeachers",
			},
			{
				message: RoomInvitationLinkValidationError.RestrictedToCreatorSchool,
				expectedMessage:
					"pages.rooms.invitationLinkStatus.restrictedToCreatorSchool",
			},
			{
				message: RoomInvitationLinkValidationError.InvalidLink,
				expectedMessage: "pages.rooms.invitationLinkStatus.invalidLink",
			},
		];

		testCases.forEach(({ message, expectedMessage }) => {
			it(`should show the correct message for ${message}`, async () => {
				const { wrapper } = await setup({
					roomId: "",
					message,
				});

				const statusMessage = wrapper.find("[data-testid=status-message]");
				expect(statusMessage.text()).toContain(expectedMessage);
			});
		});
	});

	describe("when the link store return neither roomId nor message", () => {
		it("should show the default message", async () => {
			const { wrapper } = await setup({
				roomId: "",
				message: "",
			});

			const statusMessage = wrapper.find("[data-testid=status-message]");
			expect(statusMessage.text()).toContain("error.generic");
		});
	});
});
