import { useSharedBoardPageInformation } from "@/modules/data/board/BoardPageInformation.composable";
import {
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { BoardContextType } from "@/types/board/BoardContext";
import { mockedPiniaStoreTyping, roomFactory } from "@@/tests/test-utils";
import { mockAuthModule } from "@@/tests/test-utils/mockAuthModule";
import { useRoomDetailsStore } from "@data-room";
import { useRoomAuthorization } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { computed, nextTick, ref } from "vue";
import { useBoardPermissions } from "./BoardPermissions.composable";

jest.mock("@data-board/BoardPageInformation.composable");
const mockedUseSharedBoardPageInformation = jest.mocked(
	useSharedBoardPageInformation
);

jest.mock<typeof import("@/utils/create-shared-composable")>(
	"@/utils/create-shared-composable",
	() => ({
		createTestableSharedComposable: (composable) => composable,
	})
);

describe("BoardPermissions.composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});
	const setup = (
		options?: Partial<{
			userRoles: Roles[];
			userPermissions: Permission[];
			roomId: string;
			contextType: BoardContextType;
		}>
	) => {
		const { userRoles, userPermissions, roomId, contextType } = {
			userRoles: [Roles.Teacher],
			userPermissions: [
				Permission.CourseEdit,
				Permission.CourseCreate,
				Permission.CourseRemove,
			],
			roomId: "room-id",
			contextType: undefined,

			...options,
		};
		const contextTypeRef = ref(contextType);
		mockAuthModule(userRoles, userPermissions);

		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: jest.fn(),
			breadcrumbs: computed(() => []),
			contextType: computed(() => contextTypeRef.value),
			pageTitle: computed(() => "page-title"),
			roomId: computed(() => roomId),
			resetPageInformation: jest.fn(),
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const roomAuthorizationStore = mockedPiniaStoreTyping(useRoomAuthorization);

		return { roomDetailsStore, roomAuthorizationStore, contextTypeRef };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should initalize board permissions", async () => {
		setup({ userRoles: [], userPermissions: [] });

		const {
			canEditRoomBoard,
			hasMovePermission,
			hasCreateCardPermission,
			hasCreateColumnPermission,
			hasDeletePermission,
			hasCreateToolPermission,
			hasEditPermission,
		} = useBoardPermissions();

		expect(canEditRoomBoard.value).toBe(false);
		expect(hasMovePermission.value).toBe(false);
		expect(hasCreateCardPermission.value).toBe(false);
		expect(hasCreateColumnPermission.value).toBe(false);
		expect(hasDeletePermission.value).toBe(false);
		expect(hasCreateToolPermission.value).toBe(false);
		expect(hasEditPermission.value).toBe(false);
	});

	describe("when contextType changes", () => {
		describe("when contextType is not Room", () => {
			it("should not call fetchRoom", async () => {
				const { roomDetailsStore, contextTypeRef } = setup();
				const { hasMovePermission } = useBoardPermissions();

				contextTypeRef.value = BoardContextType.Course;
				await nextTick();

				expect(hasMovePermission.value).toBe(true);
				expect(roomDetailsStore.fetchRoom).not.toHaveBeenCalled();
			});

			it("should reset state", async () => {
				const { roomDetailsStore, contextTypeRef } = setup();
				useBoardPermissions();

				contextTypeRef.value = BoardContextType.Course;
				await nextTick();

				expect(roomDetailsStore.resetState).toHaveBeenCalled();
			});

			it("should set edit board permissions", async () => {
				const { contextTypeRef } = setup();
				const { canEditRoomBoard } = useBoardPermissions();

				contextTypeRef.value = BoardContextType.Course;
				await nextTick();

				expect(canEditRoomBoard.value).toBe(true);
			});
		});

		describe("when contextType is Room", () => {
			it("should call fetchRoom", async () => {
				const { roomDetailsStore, contextTypeRef } = setup();
				useBoardPermissions();

				contextTypeRef.value = BoardContextType.Room;
				await nextTick();

				expect(roomDetailsStore.fetchRoom).toHaveBeenCalled();
			});

			it("should set permissions", async () => {
				const { roomDetailsStore, contextTypeRef } = setup({
					userRoles: [],
					userPermissions: [],
				});
				roomDetailsStore.room = roomFactory.build({
					permissions: [Permission.RoomEdit],
				});

				const { hasMovePermission, hasCreateCardPermission, canEditRoomBoard } =
					useBoardPermissions();

				expect(hasMovePermission.value).toBe(false);
				expect(hasCreateCardPermission.value).toBe(false);
				expect(canEditRoomBoard.value).toBe(false);

				contextTypeRef.value = BoardContextType.Room;
				await nextTick();

				expect(hasMovePermission.value).toBe(true);
				expect(hasCreateCardPermission.value).toBe(true);
				expect(canEditRoomBoard.value).toBe(true);
			});
		});
	});
});
