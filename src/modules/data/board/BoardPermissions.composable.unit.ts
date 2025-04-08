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
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import AuthModule from "../../../store/auth";
import { useBoardStore } from "./Board.store";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
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

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: jest.fn().mockImplementation((key: string) => key),
			n: jest.fn().mockImplementation((key: string) => key),
		}),
	};
});

jest.mocked(useI18n());

jest.mock("@/components/error-handling/ErrorHandler.composable");
const mockedUseErrorHandler = jest.mocked(useErrorHandler);

describe("BoardPermissions.composable", () => {
	let mockedErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		mockedErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();
		mockedUseErrorHandler.mockReturnValue(mockedErrorHandler);
	});

	afterEach(() => {
		jest.clearAllMocks();
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
			createPageInformation: jest.fn(),
			breadcrumbs: computed(() => []),
			contextType: computed(() => contextTypeRef.value),
			pageTitle: computed(() => "page-title"),
			roomId: computed(() => roomId),
			resetPageInformation: jest.fn(),
		});

		setupStores({ envConfigModule: EnvConfigModule, authModule: AuthModule });

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
				isTeacher,
				isStudent,
			} = useBoardPermissions();

			expect(hasMovePermission.value).toBe(false);
			expect(hasCreateCardPermission.value).toBe(false);
			expect(hasCreateColumnPermission.value).toBe(false);
			expect(hasDeletePermission.value).toBe(false);
			expect(hasCreateToolPermission.value).toBe(false);
			expect(hasEditPermission.value).toBe(false);

			expect(isTeacher.value).toBe(false);
			expect(isStudent.value).toBe(true);
		});
	});

	describe("when the user does have the permissions", () => {
		it("should return true for board permissions", async () => {
			setupAllStores({
				userRoles: [RoleName.Teacher],
				userPermissions: [Permission.ContextToolAdmin],
				boardPermissions: [Permission.BoardEdit],
			});

			const {
				hasMovePermission,
				hasCreateCardPermission,
				hasCreateColumnPermission,
				hasDeletePermission,
				hasCreateToolPermission,
				hasEditPermission,
				isTeacher,
				isStudent,
			} = useBoardPermissions();

			expect(hasMovePermission.value).toBe(true);
			expect(hasCreateCardPermission.value).toBe(true);
			expect(hasCreateColumnPermission.value).toBe(true);
			expect(hasDeletePermission.value).toBe(true);
			expect(hasCreateToolPermission.value).toBe(true);
			expect(hasEditPermission.value).toBe(true);

			expect(isTeacher.value).toBe(true);
			expect(isStudent.value).toBe(false);
		});
	});
});
