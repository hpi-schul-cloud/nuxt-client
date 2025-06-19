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
import { nextTick } from "vue";

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

describe("Invitations", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);
	});

	afterEach(() => {
		vi.clearAllMocks();
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

	it("should fetch links onMount life cycle", async () => {
		const { roomInvitationLinkStore } = setup();
		await nextTick();

		expect(roomInvitationLinkStore.fetchLinks).toHaveBeenCalled();
	});

	it("should render InvitationTable component", () => {
		const { wrapper } = setup();
		const invitationTable = wrapper.findComponent({ name: "InvitationTable" });

		expect(invitationTable.exists()).toBe(true);
	});
});
