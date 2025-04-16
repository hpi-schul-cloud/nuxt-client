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
import {
	useRoomMembersStore,
	useRoomMemberVisibilityOptions,
} from "@data-room";
import { Members, MembersTable } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { authModule, schoolsModule } from "@/store";
import { computed } from "vue";

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@data-room/roomMembers/membersVisibleOptions.composable");
const useMemberVisibilityOptions = jest.mocked(useRoomMemberVisibilityOptions);

describe("Members", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let memberVisibilityOptions: DeepMocked<
		ReturnType<typeof useRoomMemberVisibilityOptions>
	>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		memberVisibilityOptions =
			createMock<ReturnType<typeof useRoomMemberVisibilityOptions>>();
		useMemberVisibilityOptions.mockReturnValue(memberVisibilityOptions);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);
	});

	const setup = (
		options?: Partial<{
			isLoading: boolean;
			isCurrentUser: boolean;
		}>
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

	it("should render info text when page info text visibility is enabled", () => {
		memberVisibilityOptions.isVisiblePageInfoText = computed(() => true);
		const { wrapper } = setup();

		const infoText = wrapper.find("[data-testid=info-text]");

		expect(infoText.exists()).toBe(true);
	});

	it("should not render info text when page info text visibility is not enabled", () => {
		memberVisibilityOptions.isVisiblePageInfoText = computed(() => false);
		const { wrapper } = setup();

		const infoText = wrapper.find("[data-testid=info-text]");

		expect(infoText.exists()).toBe(false);
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

		it("should not render member table when current user is not present", () => {
			const { wrapper } = setup({ isLoading: false, isCurrentUser: false });

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
