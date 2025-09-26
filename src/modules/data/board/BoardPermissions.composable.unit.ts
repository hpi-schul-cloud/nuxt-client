import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { BoardLayout, Permission, RoleName } from "@/serverApi/v3";
import { BoardContextType } from "@/types/board/BoardContext";
import {
	boardResponseFactory,
	createTestAppStore,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardStore } from "./Board.store";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
import { useBoardPermissions } from "./BoardPermissions.composable";

vi.mock("vue-router");
vi.mock("@data-board/BoardPageInformation.composable");
const mockedUseSharedBoardPageInformation = vi.mocked(
	useSharedBoardPageInformation
);

vi.mock(
	"@/utils/create-shared-composable",
	() =>
		({
			createTestableSharedComposable: (composable) => composable,
		}) as typeof import("@/utils/create-shared-composable")
);

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
			n: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});

vi.mocked(useI18n());

vi.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = vi.mocked(useErrorHandler);

describe("BoardPermissions.composable", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setupAllStores = (
		options?: Partial<{
			userRoles: RoleName[];
			userPermissions: Permission[];
			roomId: string;
			contextType: BoardContextType;
			boardPermissions: Permission[];
		}>
	) => {
		const {
			userRoles,
			userPermissions,
			roomId,
			contextType,
			boardPermissions,
		} = {
			userRoles: [RoleName.Teacher],
			userPermissions: [
				Permission.CourseEdit,
				Permission.CourseCreate,
				Permission.CourseRemove,
			],
			roomId: "room-id",
			contextType: undefined,
			boardPermissions: [],
			...options,
		};

		const contextTypeRef = ref(contextType);
		mockedUseSharedBoardPageInformation.mockReturnValue({
			createPageInformation: vi.fn(),
			breadcrumbs: computed(() => []),
			contextType: computed(() => contextTypeRef.value),
			pageTitle: computed(() => "page-title"),
			roomId: computed(() => roomId),
			resetPageInformation: vi.fn(),
		});

		const userRoleEntities = userRoles.map((role: RoleName) => ({
			id: Math.random().toString(),
			name: role,
		}));
		createTestAppStore({
			me: { roles: userRoleEntities, permissions: userPermissions },
		});

		const boardStore = mockedPiniaStoreTyping(useBoardStore);
		const board = boardResponseFactory.build({
			id: "board-id",
			title: "board-title",
			isVisible: true,
			layout: BoardLayout.Columns,
			features: [],
			permissions: boardPermissions,
		});
		boardStore.board = board;

		return { boardStore, contextTypeRef, roomId };
	};

	describe("when the user does not have the permissions", () => {
		it("should return false for board permissions", () => {
			setupAllStores({
				userRoles: [RoleName.Student],
				userPermissions: [],
				boardPermissions: [],
			});

			const {
				hasMovePermission,
				hasCreateCardPermission,
				hasCreateColumnPermission,
				hasDeletePermission,
				hasCreateToolPermission,
				hasEditPermission,
				hasManageVideoConferencePermission,
				hasShareBoardPermission,
				isTeacher,
				isStudent,
			} = useBoardPermissions();

			expect(hasMovePermission.value).toBe(false);
			expect(hasCreateCardPermission.value).toBe(false);
			expect(hasCreateColumnPermission.value).toBe(false);
			expect(hasDeletePermission.value).toBe(false);
			expect(hasCreateToolPermission.value).toBe(false);
			expect(hasEditPermission.value).toBe(false);
			expect(hasManageVideoConferencePermission.value).toBe(false);
			expect(hasShareBoardPermission.value).toBe(false);

			expect(isTeacher.value).toBe(false);
			expect(isStudent.value).toBe(true);
		});
	});

	describe("when the user does have the permissions", () => {
		it("should return true for board permissions", () => {
			setupAllStores({
				userRoles: [RoleName.Teacher],
				userPermissions: [Permission.ContextToolAdmin],
				boardPermissions: [
					Permission.BoardEdit,
					Permission.BoardManageVideoconference,
					Permission.BoardShareBoard,
				],
			});

			const {
				hasMovePermission,
				hasCreateCardPermission,
				hasCreateColumnPermission,
				hasDeletePermission,
				hasCreateToolPermission,
				hasEditPermission,
				hasManageVideoConferencePermission,
				isTeacher,
				isStudent,
				hasShareBoardPermission,
			} = useBoardPermissions();

			expect(hasMovePermission.value).toBe(true);
			expect(hasCreateCardPermission.value).toBe(true);
			expect(hasCreateColumnPermission.value).toBe(true);
			expect(hasDeletePermission.value).toBe(true);
			expect(hasCreateToolPermission.value).toBe(true);
			expect(hasEditPermission.value).toBe(true);
			expect(hasManageVideoConferencePermission.value).toBe(true);
			expect(hasShareBoardPermission.value).toBe(true);

			expect(isTeacher.value).toBe(true);
			expect(isStudent.value).toBe(false);
		});
	});
});
