import { ENV_CONFIG_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import { mount, MountOptions } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import { Envs } from "@/store/types/env-config";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<Envs>({
		FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
		FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
		FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
	}),
});

const VALID_URL = "https://www.abc.de/my-article";
const INVALID_URL = "my-article";

describe("LinkContentElementCreate", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(LinkContentElementCreate as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
			},
		});

		const insertUrl = (url: string) => {
			const textAreaComponent = wrapper.findComponent({ name: "v-textarea" });
			textAreaComponent.vm.$emit("input", url);
		};

		const submitByClick = async () => {
			const button = wrapper.find("button");
			await button.trigger("click");
			await nextTick();
		};

		const submitByEnter = async () => {
			const textAreaComponent = wrapper.findComponent({ name: "v-textarea" });
			textAreaComponent.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "Enter",
					keyCode: 13,
				})
			);
			await nextTick();
		};

		const hasEmitted = (eventName: string): string | false => {
			const emitted = wrapper.emitted(eventName);
			return emitted ? emitted[0][0] : false;
		};

		const areRulesActive = () => {
			const rulesProperty = wrapper
				.findComponent({ name: "v-textarea" })
				.props("rules");
			return typeof rulesProperty === "function";
		};

		return {
			wrapper,
			insertUrl,
			submitByClick,
			submitByEnter,
			hasEmitted,
			areRulesActive,
		};
	};

	describe("when valid url was entered", () => {
		describe("when enter is pressed", () => {
			it("should not show error-message", async () => {
				const { wrapper, insertUrl, submitByClick } = setup();

				insertUrl(VALID_URL);
				await submitByClick();

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.exists()).toBe(false);
			});

			it("should emit create:url event", async () => {
				const { insertUrl, submitByEnter, hasEmitted } = setup();

				insertUrl(VALID_URL);
				await submitByEnter();

				expect(hasEmitted("create:url")).toEqual(VALID_URL);
			});
		});
	});

	describe("when invalid url was entered", () => {
		it("should not be validated during input", async () => {
			const { wrapper, insertUrl } = setup();

			insertUrl(INVALID_URL);
			await nextTick();

			const alerts = wrapper.find('[role="alert"]');

			expect(alerts.exists()).toBe(false);
		});

		describe("when enter is pressed", () => {
			it("should show invalid-url-error", async () => {
				const { wrapper, insertUrl, submitByEnter } = setup();

				insertUrl(INVALID_URL);
				await submitByEnter();

				const alerts = wrapper.find('[role="alert"]').text();

				expect(alerts).toEqual(
					expect.stringContaining("util-validators-invalid-url")
				);
			});

			it("should not emit create:url event", async () => {
				const { wrapper, insertUrl, submitByEnter } = setup();

				insertUrl(INVALID_URL);
				await submitByEnter();

				const emitted = wrapper.emitted("create:url");
				expect(emitted).toBeUndefined();
			});
		});
	});

	describe("when url field is empty", () => {
		describe("when submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const { wrapper, submitByEnter } = setup();

				await submitByEnter();

				const alerts = wrapper.find('[role="alert"]').text();
				expect(alerts).toEqual(
					expect.stringContaining("common.validation.required2")
				);
			});

			it("should not emit create:url event", async () => {
				const { wrapper, submitByClick } = setup();

				await submitByClick();

				const emitted = wrapper.emitted("create:url");
				expect(emitted).toBeUndefined();
			});
		});
	});
});
