import RoomInvitationLinkStatusPage from "./RoomInvitationLinkStatus.page.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomInvitationLinkValidationError, UseLinkResult, useRoomInvitationLinkStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRouter: vi.fn().mockReturnValue({
		push: vi.fn(),
	}),
}));

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});

describe("RoomInvitationLinkStatusPage", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = async (useLinkResult: UseLinkResult) => {
		const invitationLink = roomInvitationLinkFactory.build();

		const pinia = createTestingPinia({
			initialState: {
				roomInvitationLinkStore: {
					roomInvitationLinks: [invitationLink],
					isLoading: false,
				},
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(useRoomInvitationLinkStore);

		roomInvitationLinkStore.useLink.mockResolvedValueOnce(useLinkResult);

		const wrapper = mount(RoomInvitationLinkStatusPage, {
			attachTo: document.body,
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
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
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});

		expect(wrapper.exists()).toBe(true);
	});

	it("should render DefaultWireframe", async () => {
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
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

		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
		const wireframe = wrapper.findComponent(DefaultWireframe);

		expect(wireframe.props("breadcrumbs")).toEqual(roomInvitationLinkBreadcrumb);
	});

	it("should set the page title", async () => {
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
		const pageTitle = wrapper.find("[data-testid=page-title]");
		expect(pageTitle.text()).toContain("pages.rooms.invitationLinkStatus.title");
	});

	describe("when link store returns a roomId", () => {
		it("should call the router to navigate to the room", async () => {
			const { router } = await setup({
				roomId: "room-id",
				validationMessage: "",
				schoolName: "",
			});

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/room-id",
			});
		});
	});

	describe("when link store returns a message", () => {
		const testCases = [
			{
				message: RoomInvitationLinkValidationError.CantInviteStudentsFromOtherSchool,
				expectedMessage: "pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool",
			},
			{
				message: RoomInvitationLinkValidationError.Expired,
				expectedMessage: "pages.rooms.invitationLinkStatus.expired",
			},
			{
				message: RoomInvitationLinkValidationError.NotUsableForCurrentRole,
				expectedMessage: "pages.rooms.invitationLinkStatus.notUsableForCurrentRole",
			},
			{
				message: RoomInvitationLinkValidationError.RestrictedToCreatorSchool,
				expectedMessage: "pages.rooms.invitationLinkStatus.restrictedToCreatorSchool",
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
					validationMessage: message,
					schoolName: "Beispielschule",
				});

				const statusMessage = wrapper.find("[data-testid=status-message]");
				expect(statusMessage.text()).toContain(expectedMessage);
			});
		});

		it("should show bird image", async () => {
			const { wrapper } = await setup({
				roomId: "",
				validationMessage: RoomInvitationLinkValidationError.Expired,
				schoolName: "Beispielschule",
			});

			const statusImage = wrapper.find("[data-testid=img-crossed-hands]");
			expect(statusImage.exists()).toBe(true);
		});
	});

	describe("when the link store return neither roomId nor message", () => {
		it("should show the default message", async () => {
			const { wrapper } = await setup({
				roomId: "",
				validationMessage: "",
				schoolName: "",
			});

			const statusMessage = wrapper.find("[data-testid=status-message]");
			expect(statusMessage.text()).toContain("error.generic");
		});
	});
});
