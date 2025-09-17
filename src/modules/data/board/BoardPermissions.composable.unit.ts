import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { BoardLayout, Permission, RoleName } from "@/serverApi/v3";
import { authModule, envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { BoardContextType } from "@/types/board/BoardContext";
import {
	boardResponseFactory,
	envsFactory,
	meResponseFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import AuthModule from "../../../store/auth";
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

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

describe("BoardPermissions.composable", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
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

		setupStores({
			envConfigModule: EnvConfigModule,
			authModule: AuthModule,
		});

		const userRoleEntities = userRoles.map((role: RoleName) => ({
			id: Math.random().toString(),
			name: role,
		}));
		const mockMe = meResponseFactory.build({
			roles: userRoleEntities,
			permissions: userPermissions,
		});
		authModule.setMe(mockMe);

		const env = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(env);

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
		it("should return false for board permissions", async () => {
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
				hasUpdateReadersCanEditPermission,
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
			expect(hasUpdateReadersCanEditPermission.value).toBe(false);
			expect(isTeacher.value).toBe(false);
			expect(isStudent.value).toBe(true);
		});
	});

	describe("when the user does have the permissions", () => {
		it("should return true for board permissions", async () => {
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
				hasUpdateReadersCanEditPermission,
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
			expect(hasUpdateReadersCanEditPermission.value).toBe(false);
			expect(isTeacher.value).toBe(true);
			expect(isStudent.value).toBe(false);
		});
	});
});
