import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import VueI18n from "vue-i18n";
import { I18N_KEY } from "@/utils/inject";
import { useI18n } from "./i18n.composable";

describe("useI18n", () => {
	const getWrapper = () => {
		let composable: ReturnType<typeof useI18n> | undefined;

		const TestComponent = defineComponent({
			template: "<div/>",
			setup() {
				composable = useI18n();
			},
		});

		const vueI18n: DeepMocked<VueI18n> = createMock<VueI18n>();

		const wrapper = mount(TestComponent, {
			provide: {
				[I18N_KEY.valueOf()]: vueI18n,
			},
		});

		return {
			wrapper,
			vueI18n,
			composable,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("t", () => {
		it("should be defined", () => {
			const { composable } = getWrapper();

			expect(composable?.t).toBeDefined();
		});

		describe("when translating", () => {
			const setup = () => {
				const { vueI18n, composable } = getWrapper();

				const translationResult = "translated";

				vueI18n.tc.mockReturnValue(translationResult);

				return {
					vueI18n,
					composable,
					translationResult,
				};
			};

			it("should call vueI18n", () => {
				const { vueI18n, composable } = setup();

				composable?.t("key", { param1: "value1" });

				expect(vueI18n.tc).toHaveBeenCalledWith("key", 0, { param1: "value1" });
			});

			it("should return a translated string", () => {
				const { composable, translationResult } = setup();

				const result = composable?.t("key", { param1: "value1" });

				expect(result).toEqual(translationResult);
			});
		});
	});
});
