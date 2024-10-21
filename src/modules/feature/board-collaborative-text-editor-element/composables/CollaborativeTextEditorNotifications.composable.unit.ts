import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useI18n } from "vue-i18n";
import { useCollaborativeTextEditorNotifier } from "./CollaborativeTextEditorNotifications.composable";

vi.mock("vue-i18n", async () => {
	return {
		...(await vi.importActual("vue-i18n")),
		useI18n: vi.fn().mockReturnValue({
			t: jest
				.fn()
				.mockImplementation(
					(key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : "")
				),
			n: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});

const mockI18nModule = vi.mocked(useI18n());

const notifierModule = createModuleMocks(NotifierModule);

const setupMountComposable = () => {
	return mountComposable(() => useCollaborativeTextEditorNotifier(), {
		global: {
			provide: {
				[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
			},
		},
	});
};

describe("CollaborativeTextEditorNotifications.composable", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("when showForbiddenError called", () => {
		const setup = () => {
			const i18nKey = "error.403";

			return { i18nKey };
		};

		it("should call i18n.t with correct props", () => {
			const { showForbiddenError } = setupMountComposable();
			const { i18nKey } = setup();

			showForbiddenError();

			expect(mockI18nModule.t).toBeCalledWith(i18nKey);
		});

		it("should call showFailure with correct props", () => {
			const { showForbiddenError } = setupMountComposable();
			const { i18nKey } = setup();

			showForbiddenError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
			});
		});
	});

	describe("when showUnauthorizedError called", () => {
		const setup = () => {
			const i18nKey = "error.401";

			return { i18nKey };
		};

		it("should call i18n.t with correct props", () => {
			const { showUnauthorizedError } = setupMountComposable();
			const { i18nKey } = setup();

			showUnauthorizedError();

			expect(mockI18nModule.t).toBeCalledWith(i18nKey);
		});

		it("should call showFailure with correct props", () => {
			const { showUnauthorizedError } = setupMountComposable();
			const { i18nKey } = setup();

			showUnauthorizedError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
			});
		});
	});

	describe("when showInternalServerError called", () => {
		const setup = () => {
			const i18nKey = "components.board.notifications.errors.notCreated";
			const type = "components.cardElement.collaborativeTextEditorElement";

			return { i18nKey, type };
		};

		it("should call i18n.t with correct props", () => {
			const { showInternalServerError } = setupMountComposable();
			const { i18nKey, type } = setup();

			showInternalServerError();

			expect(mockI18nModule.t).toBeCalledWith(i18nKey, { type });
		});

		it("should call showFailure with correct props", () => {
			const { showInternalServerError } = setupMountComposable();
			const { i18nKey, type } = setup();

			const text = i18nKey + ` ${JSON.stringify({ type })}`;

			showInternalServerError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text,
				timeout: 5000,
			});
		});
	});
});
