import { createModuleMocks } from "@/utils/mock-store-module";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import ExternalToolConfigOverviewPage from "./ExternalToolConfigOverview.page.vue";
import { businessErrorFactory } from "../../../../tests/test-utils/factory";

describe("ExternalToolConfigOverview", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	const setup = (getters: Partial<ExternalToolsModule> = {}) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getBusinessError: businessErrorFactory(),
			loadAvailableToolConfigurations: (): Promise<void> => {
				return Promise.resolve();
			},
			...getters,
		}) as jest.Mocked<ExternalToolsModule>;

		const wrapper: Wrapper<any> = shallowMount(ExternalToolConfigOverviewPage, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
				externalToolsModule,
			},
		});

		return {
			wrapper,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(
				wrapper.findComponent(ExternalToolConfigOverviewPage).exists()
			).toBe(true);
		});
	});
});
