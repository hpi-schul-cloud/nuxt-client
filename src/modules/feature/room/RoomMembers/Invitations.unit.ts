import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Invitations } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useRoomInvitationLinkStore, RoomInvitationLink } from "@data-room";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { nextTick } from "vue";

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

describe("Invitations", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (roomInvitationLinks: RoomInvitationLink[] = []) => {
		const wrapper = shallowMount(Invitations, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							roomInvitationLinkStore: {
								isLoading: false,
								roomInvitationLinks,
							},
						},
					}),
				],
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		return { wrapper, roomInvitationLinkStore };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render info text", () => {
		const { wrapper } = setup();
		const infoText = wrapper.get("[data-testid=info-text]");

		expect(infoText.text()).toBe(
			"pages.rooms.members.tab.invitations.infoText"
		);
	});

	it("should handle onClick for 'Create Invitation' button", async () => {
		const { wrapper, roomInvitationLinkStore } = setup();

		const createButton = wrapper.get("[data-testid=create-invitation-button]");
		await createButton.trigger("click");

		expect(roomInvitationLinkStore.createLink).toHaveBeenCalledTimes(1);
	});

	it("should handle onClick for 'Delete Invitation' button", async () => {
		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);
		const { wrapper, roomInvitationLinkStore } = setup(roomInvitationLinks);

		const deleteButton = wrapper.get("[data-testid=delete-invitation-button]");
		await deleteButton.trigger("click");

		expect(roomInvitationLinkStore.deleteLinks).toHaveBeenCalledTimes(1);
	});

	it("should handle onClick for 'Update Invitation' button", async () => {
		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);
		const { wrapper, roomInvitationLinkStore } = setup(roomInvitationLinks);
		const firstLink = roomInvitationLinks[0];

		const updateButton = wrapper.get("[data-testid=update-invitation-button]");
		await updateButton.trigger("click");

		expect(roomInvitationLinkStore.updateLink).toHaveBeenCalledTimes(1);
		expect(roomInvitationLinkStore.updateLink).toHaveBeenCalledWith(
			expect.objectContaining({
				title: expect.stringContaining(firstLink.title),
			})
		);
	});

	it("should handle onClick for 'Use Invitation' button", async () => {
		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);

		const { wrapper } = setup(roomInvitationLinks);

		const linkId = roomInvitationLinks[0].id;
		const clipboardMock = createMock<Clipboard>();
		Object.assign(navigator, { clipboard: clipboardMock });

		const useButton = wrapper.get("[data-testid=copy-invitation-link-button]");
		await useButton.trigger("click");
		await nextTick();

		expect(clipboardMock.writeText).toHaveBeenCalledWith(
			expect.stringContaining(linkId)
		);
	});
});
