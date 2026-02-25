import MemberInvitationsTable from "../tables/MemberInvitationsTable.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
	createRoomAuthorizationMock,
	createTestAppStoreWithUser,
	createTestEnvStore,
	mockedPiniaStoreTyping,
	RoomAuthorizationRefs,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { Members, MembersTable } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorizationMock = vi.mocked(useRoomAuthorization);

describe("Members", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});

	beforeEach(() => {
		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);
	});

	const setup = (
		options: Partial<{
			isLoading: boolean;
			isCurrentUser: boolean;
			roomAuthorization: RoomAuthorizationRefs;
		}> = {}
	) => {
		const currentUser = roomMemberFactory.build();
		createTestAppStoreWithUser(currentUser.userId);

		const roomMembers = [];
		if (options?.isCurrentUser) {
			roomMembers.push(currentUser);
		}

		roomAuthorizationMock.mockReturnValue(createRoomAuthorizationMock(options.roomAuthorization));

		const wrapper = shallowMount(Members, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								isLoading: options?.isLoading ?? false,
								roomMembers,
							},
						},
					}),
				],
			},
		});
		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return { wrapper, roomMembersStore };
	};

	it("renders correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("when user is allowed to add room members", () => {
		it("should render info text", () => {
			const { wrapper } = setup({
				roomAuthorization: { canAddRoomMembers: true },
			});

			const infoText = wrapper.find("[data-testid=info-text]");

			expect(infoText.exists()).toBe(true);
		});
	});

	describe("when user is not allowed to add room members", () => {
		it("should not render info text", () => {
			const { wrapper } = setup({
				roomAuthorization: { canAddRoomMembers: false },
			});

			const infoText = wrapper.find("[data-testid=info-text]");

			expect(infoText.exists()).toBe(false);
		});
	});

	describe("members table", () => {
		it("should render members table when loading is complete and the current user is present", () => {
			const { wrapper } = setup({ isLoading: false, isCurrentUser: true });

			const membersTable = wrapper.findComponent(MembersTable);

			expect(membersTable.exists()).toBe(true);
		});

		it("should not render member table when loading is not complete", () => {
			const { wrapper } = setup({ isLoading: true, isCurrentUser: true });

			const membersTable = wrapper.findComponent(MembersTable);

			expect(membersTable.exists()).toBe(false);
		});

		it("should not render member table when loading is not complete and  current user is not present", () => {
			const { wrapper } = setup({ isLoading: true, isCurrentUser: false });

			const membersTable = wrapper.findComponent(MembersTable);

			expect(membersTable.exists()).toBe(false);
		});
	});

	describe("pending invitations table", () => {
		describe("when feature flag is disabled", () => {
			it("should not render pending invitations table", () => {
				createTestEnvStore({ FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: false });
				const { wrapper } = setup({
					roomAuthorization: { canManageRoomInvitationLinks: false },
				});

				const invitationsTable = wrapper.findComponent(MemberInvitationsTable);
				expect(invitationsTable.exists()).toBe(false);
			});
		});

		describe("when feature flag is enabled", () => {
			describe("when user has permission to manage room invitation links", () => {
				it("should render pending invitations table", () => {
					createTestEnvStore({ FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true });
					const { wrapper } = setup({
						roomAuthorization: { canManageRoomInvitationLinks: true },
					});

					const invitationsTable = wrapper.findComponent(MemberInvitationsTable);
					expect(invitationsTable.exists()).toBe(true);
				});
			});

			describe("when user has no permission to manage room invitation links", () => {
				it("should not render pending invitations table", () => {
					createTestEnvStore({ FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true });
					const { wrapper } = setup({
						roomAuthorization: { canManageRoomInvitationLinks: false },
					});

					const invitationsTable = wrapper.findComponent(MemberInvitationsTable);
					expect(invitationsTable.exists()).toBe(false);
				});
			});
		});
	});
});
