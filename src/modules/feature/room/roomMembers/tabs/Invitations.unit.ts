import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomInvitationLink, useRoomInvitationLinkStore } from "@data-room";
import { Invitations } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";

describe("Invitations", () => {
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

		const roomInvitationLinkStore = mockedPiniaStoreTyping(useRoomInvitationLinkStore);

		return { wrapper, roomInvitationLinkStore };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render info text", () => {
		const { wrapper } = setup();
		const infoText = wrapper.get("[data-testid=info-text]");

		expect(infoText.text()).toBe("pages.rooms.members.tab.invitations.infoText");
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
