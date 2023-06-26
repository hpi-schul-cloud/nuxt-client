import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolsModule from "@/store/external-tools";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils/factory/externalToolDisplayDataFactory";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";
import { I18N_KEY } from "@/utils/inject";
import { businessErrorFactory } from "@@/tests/test-utils/factory";

describe("RoomExternalToolOverview", () => {
	let el: HTMLDivElement;

	const getWrapper = (tools: ExternalToolDisplayData[]) => {
		el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
		});

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getExternalToolDisplayDataList: tools,
				getBusinessError: businessErrorFactory.build(),
			}
		);

		const externalToolsModule = createModuleMocks(ExternalToolsModule);

		const wrapper: Wrapper<any> = mount(
			RoomExternalToolsOverview as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					authModule,
					contextExternalToolsModule,
					externalToolsModule,
					[I18N_KEY as symbol]: {
						t: (key: string): string => key,
						tc: (key: string): string => key,
					},
				},
				propsData: {
					roomId: "testRoolId",
				},
			}
		);

		return {
			wrapper,
			externalToolsModule,
			authModule,
			contextExternalToolsModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("t", () => {
		describe("when known translation key is given", () => {
			const setup = async () => {
				const { wrapper } = getWrapper([]);
				const testKey = "testKey";

				return { wrapper, testKey };
			};

			it("should return translation", async () => {
				const { wrapper, testKey } = await setup();

				const result: string = wrapper.vm.t(testKey);

				expect(result).toEqual(testKey);
			});
		});

		describe("when known translation key is given", () => {
			const setup = async () => {
				const { wrapper } = getWrapper([]);
				const testKey = 123;

				return { wrapper, testKey };
			};

			it("should return 'unknown translation-key'", async () => {
				const { wrapper, testKey } = await setup();

				const result: string = wrapper.vm.t(testKey);

				expect(result.includes("unknown translation-key:")).toBeTruthy();
			});
		});
	});

	describe("when no tools are in the list", () => {
		const setup = () => {
			const { wrapper } = getWrapper([]);

			return {
				wrapper,
			};
		};

		it("should display empty state", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ ref: "tools-empty-state" }).exists()).toBe(
				true
			);
		});
	});

	describe("when there are tools in the list", () => {
		const setup = () => {
			const tools: ExternalToolDisplayData[] =
				externalToolDisplayDataFactory.buildList(2);

			const { wrapper } = getWrapper(tools);

			return {
				wrapper,
			};
		};

		it("should display the tools", () => {
			const { wrapper } = setup();

			const cards = wrapper.findAllComponents({
				name: "room-external-tool-card",
			});

			expect(cards.length).toEqual(2);
		});
	});

	describe("when clicking the delete button on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper([tool]);

			return {
				wrapper,
				tool,
			};
		};

		it("should open the delete dialog", async () => {
			const { wrapper, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]');

			expect(deleteDialog.element.childNodes.length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("when clicking on confirm button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper([tool]);

			return {
				tool,
				wrapper,
				contextExternalToolsModule,
			};
		};

		it("should call delete function of store", async () => {
			const { wrapper, tool, contextExternalToolsModule } = await setup();

			const card = wrapper.find('[data-testId="external-tool-card-0"]');
			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find('[data-testId="delete-dialog"]');

			const confirmBtn = deleteDialog.find('[data-testId="dialog-confirm"]');
			await confirmBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).toHaveBeenCalledWith(tool.id);
			expect(deleteDialog.element.childNodes.length).toEqual(0);
		});
	});

	describe("when clicking on cancel button of delete dialog", () => {
		const setup = async () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, contextExternalToolsModule } = getWrapper([tool]);

			return {
				tool,
				wrapper,
				contextExternalToolsModule,
			};
		};

		it("should close dialog", async () => {
			const { wrapper, tool, contextExternalToolsModule } = await setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			await card.vm.$emit("delete", tool);

			const deleteDialog = wrapper.find("[data-testId=delete-dialog]");

			const cancelBtn = wrapper.find("[data-testId=dialog-cancel]");
			await cancelBtn.trigger("click");

			expect(
				contextExternalToolsModule.deleteContextExternalTool
			).not.toHaveBeenCalled();
			expect(deleteDialog.element.childNodes.length).toEqual(0);
		});
	});

	describe("when clicking on a tool", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, externalToolsModule } = getWrapper([tool]);

			return {
				wrapper,
				externalToolsModule,
				tool,
			};
		};

		it("should fetch the launch data", async () => {
			const { wrapper, externalToolsModule, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.trigger("click");

			expect(externalToolsModule.getToolLaunchData).toHaveBeenCalledWith(
				tool.id
			);
		});
	});

	describe("when an error occurred", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper, externalToolsModule } = getWrapper([tool]);

			return {
				wrapper,
				externalToolsModule,
				tool,
			};
		};

		it("should display the error in the alert", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent({ name: "v-alert" });

			expect(alert.exists()).toBe(true);
		});
	});
});
