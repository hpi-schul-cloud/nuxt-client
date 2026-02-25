import MemberInvitationsTable from "../tables/MemberInvitationsTable.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
	createTestAppStoreWithUser,
	createTestEnvStore,
	mockedPiniaStoreTyping,
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
import { computed, Ref } from "vue";

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorizationMock = vi.mocked(useRoomAuthorization);

type RefPropertiesOnly<T> = {
	[K in keyof T as T[K] extends Ref ? K : never]: boolean;
};

type RoomAuthorizationRefs = Partial<RefPropertiesOnly<ReturnType<typeof useRoomAuthorization>>>;

const createRoomAuthorizationMock = (
	overrides: RoomAuthorizationRefs = {}
): ReturnType<typeof useRoomAuthorization> => {
	const defaults: RoomAuthorizationRefs = {
		canAddAllStudents: false,
		canAddRoomMembers: false,
		canChangeOwner: false,
		canCopyRoom: false,
		canCreateRoom: false,
		canDeleteRoom: false,
		canEditRoom: false,
		canEditRoomContent: false,
		canLeaveRoom: false,
		canListDrafts: false,
		canManageRoomInvitationLinks: false,
		canManageVideoconferences: false,
		canRemoveRoomMembers: false,
		canSeeAllStudents: false,
		canSeeMembersList: false,
		canShareRoom: false,
		canViewRoom: false,
	};

	const merged = { ...defaults, ...overrides };

	return {
		canAddAllStudents: computed(() => merged.canAddAllStudents ?? false),
		canAddRoomMembers: computed(() => merged.canAddRoomMembers ?? false),
		canChangeOwner: computed(() => merged.canChangeOwner ?? false),
		canCopyRoom: computed(() => merged.canCopyRoom ?? false),
		canCreateRoom: computed(() => merged.canCreateRoom ?? false),
		canDeleteRoom: computed(() => merged.canDeleteRoom ?? false),
		canEditRoom: computed(() => merged.canEditRoom ?? false),
		canEditRoomContent: computed(() => merged.canEditRoomContent ?? false),
		canLeaveRoom: computed(() => merged.canLeaveRoom ?? false),
		canListDrafts: computed(() => merged.canListDrafts ?? false),
		canManageRoomInvitationLinks: computed(() => merged.canManageRoomInvitationLinks ?? false),
		canManageVideoconferences: computed(() => merged.canManageVideoconferences ?? false),
		canRemoveRoomMembers: computed(() => merged.canRemoveRoomMembers ?? false),
		canSeeAllStudents: computed(() => merged.canSeeAllStudents ?? false),
		canSeeMembersList: computed(() => merged.canSeeMembersList ?? false),
		canShareRoom: computed(() => merged.canShareRoom ?? false),
		canViewRoom: computed(() => merged.canViewRoom ?? false),
	};
};

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
