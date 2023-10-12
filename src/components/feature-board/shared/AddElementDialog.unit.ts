import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import AddElementDialog from "./AddElementDialog.vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { Envs } from "@/store/types/env-config";
jest.mock("./SharedElementTypeSelection.composable");

const mockEnvs: Envs = {
	ALERT_STATUS_URL: "mockValue",
	NOT_AUTHENTICATED_REDIRECT_URL: "/mock",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	FEATURE_LERNSTORE_ENABLED: true,
	SC_THEME: "mockValue",
	FALLBACK_DISABLED: false,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: false,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	I18N__AVAILABLE_LANGUAGES: "mockValue",
	I18N__DEFAULT_LANGUAGE: "mockValue",
	I18N__DEFAULT_TIMEZONE: "mockValue",
	I18N__FALLBACK_LANGUAGE: "mockValue",
	DOCUMENT_BASE_DIR: "mockValue",
	SC_TITLE: "mockValue",
	GHOST_BASE_URL: "mockValue",
	FEATURE_CONSENT_NECESSARY: true,
	FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED: true,
	MIGRATION_END_GRACE_PERIOD_MS: 1,
	FILES_STORAGE__MAX_FILE_SIZE: 0,
	FEATURE_SHOW_OUTDATED_USERS: true,
	FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
	FEATURE_CTL_CONTEXT_CONFIGURATION_ENABLED: true,
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

			const wrapper: Wrapper<Vue> = mount(
				AddElementDialog as MountOptions<Vue>,
				{
					...createComponentMocks({}),
					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				}
			);

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

			const wrapper: Wrapper<Vue> = mount(
				AddElementDialog as MountOptions<Vue>,
				{
					...createComponentMocks({}),
					provide: {
						[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					},
				}
			);

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
				const button = wrapper.find(
					`[data-testId=${elementTypeOption.testId}]`
				);

				const icon = button.find(".v-icon");
				icon.contains(elementTypeOption.icon);
				const label = button.find(".subtitle");
				label.contains(elementTypeOption.label);

				await button.trigger("click");

				await nextTick();

				expect(elementTypeOption.action).toHaveBeenCalled();
			}
		});

		it("should close modal on close button click", async () => {
			const { closeDialog, wrapper } = await setup();

			const closeButton = wrapper.find("[data-testId=dialog-close]");
			await closeButton.trigger("click");

			await nextTick();

			expect(closeDialog).toHaveBeenCalled();
		});
	});
});
