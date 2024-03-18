import {
	ConfigResponse,
	Language,
	SchulcloudTheme,
	Timezone,
} from "@/serverApi/v3/api";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import AddElementDialog from "./AddElementDialog.vue";

jest.mock("./SharedElementTypeSelection.composable");

const mockEnvs: ConfigResponse = {
	ALERT_STATUS_URL: "mockValue",
	NOT_AUTHENTICATED_REDIRECT_URL: "/mock",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	FEATURE_LERNSTORE_ENABLED: true,
	SC_THEME: SchulcloudTheme.Default,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: false,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	I18N__AVAILABLE_LANGUAGES: [],
	I18N__DEFAULT_LANGUAGE: Language.De,
	I18N__DEFAULT_TIMEZONE: Timezone.EuropeBerlin,
	I18N__FALLBACK_LANGUAGE: Language.En,
	DOCUMENT_BASE_DIR: "mockValue",
	SC_TITLE: "mockValue",
	GHOST_BASE_URL: "mockValue",
	FEATURE_CONSENT_NECESSARY: true,
	FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED: true,
	MIGRATION_END_GRACE_PERIOD_MS: 1,
	FEATURE_SHOW_OUTDATED_USERS: true,
	FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
	FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED: true,
	FEATURE_TLDRAW_ENABLED: true,
	ACCESSIBILITY_REPORT_EMAIL: "",
	FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED: false,
	FEATURE_CTL_TOOLS_TAB_ENABLED: false,
	FEATURE_LTI_TOOLS_TAB_ENABLED: false,
	FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED: false,
	FEATURE_CTL_TOOLS_COPY_ENABLED: false,
	FEATURE_SHOW_MIGRATION_WIZARD: false,
	TLDRAW__ASSETS_ENABLED: false,
	TLDRAW__ASSETS_MAX_SIZE: 0,
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
	TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
	TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
	TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false,
	FEATURE_SCHOOL_POLICY_ENABLED_NEW: false,
	FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: false,
	FEATURE_NEST_SYSTEMS_API_ENABLED: false,
	FEATURE_NEXBOARD_COPY_ENABLED: false,
	FEATURE_VIDEOCONFERENCE_ENABLED: false,
	FEATURE_COLUMN_BOARD_ENABLED: false,
	FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
	FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: false,
	FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
	FEATURE_COURSE_SHARE: false,
	FEATURE_LOGIN_LINK_ENABLED: false,
	FEATURE_LESSON_SHARE: false,
	FEATURE_TASK_SHARE: false,
	FEATURE_USER_MIGRATION_ENABLED: false,
	FEATURE_COPY_SERVICE_ENABLED: false,
	FEATURE_IMSCC_COURSE_EXPORT_ENABLED: false,
	FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
	ROCKETCHAT_SERVICE_ENABLED: false,
	CTL_TOOLS_RELOAD_TIME_MS: 299000,
};

describe("ElementTypeSelection", () => {
	const envConfigModule: jest.Mocked<EnvConfigModule> = createModuleMocks(
		EnvConfigModule,
		{
			getEnv: {
				...mockEnvs,
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
			},
		}
	);

	const setupMocks = () => {
		const { closeDialog, isDialogOpen, elementTypeOptions } =
			setupSharedElementTypeSelectionMock();

		const createTextElement = jest.fn();
		const createFileElement = jest.fn();

		elementTypeOptions.value = [
			{
				icon: "action1-icon",
				label: "action1-label",
				action: createTextElement,
				testId: "action1-id",
			},
			{
				icon: "action2-icon",
				label: "action2-label",
				action: createFileElement,
				testId: "action2-id",
			},
		];

		return { isDialogOpen, elementTypeOptions, closeDialog };
	};

	describe("when isDialogOpen is false", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			setupMocks();

			const wrapper = mount(AddElementDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				},
			});

			return { wrapper };
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(AddElementDialog).exists()).toBe(true);
		});
	});

	describe("when isDialogOpen is changed from false to true", () => {
		const setup = async () => {
			document.body.setAttribute("data-app", "true");

			const { isDialogOpen, elementTypeOptions, closeDialog } = setupMocks();

			const wrapper = mount(AddElementDialog, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],

					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				},
			});

			isDialogOpen.value = true;
			await nextTick();

			return { isDialogOpen, elementTypeOptions, closeDialog, wrapper };
		};

		it("should make modal visible", async () => {
			const { wrapper } = await setup();

			expect(wrapper.isVisible()).toBe(true);
		});

		it("should render buttons correctly and correct action will be called on click", async () => {
			const { elementTypeOptions, wrapper } = await setup();

			for (const elementTypeOption of elementTypeOptions.value) {
				const button = wrapper.findComponent(
					`[data-testid=${elementTypeOption.testId}]`
				);
				await button.trigger("click");
				await nextTick();

				expect(elementTypeOption.action).toHaveBeenCalled();
			}
		});

		it("should close modal on close button click", async () => {
			const { closeDialog, wrapper } = await setup();

			const closeButton = wrapper.findComponent("[data-testId=dialog-close]");
			await closeButton.trigger("click");

			await nextTick();

			expect(closeDialog).toHaveBeenCalled();
		});
	});
});
