import {
	BoardLayout,
	Permission,
	ImportUserResponseRoleNamesEnum as Roles,
} from "@/serverApi/v3";
import { BoardContextType } from "@/types/board/BoardContext";
import {
	boardResponseFactory,
	envsFactory,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { mockAuthModule } from "@@/tests/test-utils/mockAuthModule";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { useBoardStore } from "./Board.store";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
import { useBoardPermissions } from "./BoardPermissions.composable";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { envConfigModule } from "@/store";
import { useI18n } from "vue-i18n";

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

		setupStores({ envConfigModule: EnvConfigModule });

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
			permissions: [],
		});
		boardStore.board = board;

		return { boardStore, contextTypeRef, roomId };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should initalize board permissions", async () => {
		setup({ userRoles: [], userPermissions: [] });

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
		expect(isStudent.value).toBe(false);
	});
});
