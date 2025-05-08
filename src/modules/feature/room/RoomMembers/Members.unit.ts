import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { Members, MembersTable } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { authModule, schoolsModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { Ref, ref } from "vue";

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@data-room/roomAuthorization.composable");
const roomAuthorizationMock = jest.mocked(useRoomAuthorization);

type RefPropertiesOnly<T> = {
	[K in keyof T as T[K] extends Ref ? K : never]: boolean;
};

type RoomAuthorizationRefs = Partial<
	RefPropertiesOnly<ReturnType<typeof useRoomAuthorization>>
>;

describe("Members", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
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
		const mockMe = meResponseFactory.build({
			user: { id: currentUser.userId },
		});
		authModule.setMe(mockMe);

		const roomMembers = [];
		if (options?.isCurrentUser) {
			roomMembers.push(currentUser);
		}

		const authorizationPermissions =
			createMock<ReturnType<typeof useRoomAuthorization>>();

		for (const [key, value] of Object.entries(
			options.roomAuthorization ?? {}
		)) {
			authorizationPermissions[key as keyof RoomAuthorizationRefs] = ref(
				value ?? false
			);
		}
		roomAuthorizationMock.mockReturnValue(authorizationPermissions);

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
});
