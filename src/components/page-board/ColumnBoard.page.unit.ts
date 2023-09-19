import ContextExternalToolsModule from "@/store/context-external-tools";
import EnvConfigModule from "@/store/env-config";
import { ToolContextType } from "@/store/external-tool";
import { Envs } from "@/store/types/env-config";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import ColumnBoardPage from "./ColumnBoard.page.vue";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("@pages/ColumnBoard.page.vue", () => {
	const setup = (
		env: Partial<Envs> = {
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
		}
	) => {
		const boardId = "test-board-id";

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: env as Envs,
		});

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule
		);

		const wrapper = shallowMount(ColumnBoardPage as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				boardId,
			},
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
					contextExternalToolsModule,
			},
		});

		return {
			wrapper,
			contextExternalToolsModule,
			boardId,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.vm).toBeDefined();
	});

	it("should have Board component", async () => {
		const { wrapper } = setup();

		const boardComponent = wrapper.findComponent({ name: "Board" });

		expect(boardComponent.vm).toBeDefined();
	});

	it("should have DefaultWireframe layout", async () => {
		const { wrapper } = setup();

		const layout = wrapper.findComponent({ name: "DefaultWireframe" });

		expect(layout.vm).toBeDefined();
	});

	describe("ExternalToolElement feature", () => {
		describe("when FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED is enabled", () => {
			it("should fetch the external tool display data", async () => {
				const { contextExternalToolsModule, boardId } = setup({
					FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				});

				await Vue.nextTick();

				expect(
					contextExternalToolsModule.loadExternalToolDisplayData
				).toHaveBeenCalledWith({
					contextId: boardId,
					contextType: ToolContextType.BOARD,
				});
			});
		});

		describe("when FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED is disabled", () => {
			it("should not fetch the external tool display data", async () => {
				const { contextExternalToolsModule } = setup({
					FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
				});

				await Vue.nextTick();

				expect(
					contextExternalToolsModule.loadExternalToolDisplayData
				).not.toHaveBeenCalled();
			});
		});
	});
});
