import ContextExternalToolConfigurator from "@/components/external-tools/configuration/ContextExternalToolConfigurator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { contextExternalToolFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useBoardNotifier } from "@util-board";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";

vi.mock("@util-board");

describe("ExternalToolElementConfigurationDialog", () => {
	let useBoardNotifierMock: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		useBoardNotifierMock = createMock<ReturnType<typeof useBoardNotifier>>();

		vi.mocked(useBoardNotifier).mockReturnValue(useBoardNotifierMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const getWrapper = (
		props: ComponentProps<typeof ExternalToolElementConfigurationDialog> = {
			isOpen: true,
			contextId: "contextId",
			configId: "configId",
		}
	) => {
		const wrapper = mount(ExternalToolElementConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					ContextExternalToolConfigurator: {
						template: "<div></div>",
						setup() {
							return {
								fetchData: vi.fn(),
								clearData: vi.fn(),
							};
						},
					},
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	describe("Title", () => {
		const setup = async () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display the title", async () => {
			const { wrapper } = await setup();

			const dialog = wrapper.findComponent(vCustomDialog);
			const title = dialog.findComponent({ name: "v-card-title" });

			expect(title.text()).toEqual(
				"feature-board-external-tool-element.dialog.title"
			);
		});
	});

	describe("when the dialog is opened", () => {
		it("should load the configurator data", async () => {
			const { wrapper } = getWrapper();

			await nextTick();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);

			expect(configurator.vm.fetchData).toHaveBeenCalled();
		});
	});

	describe("when canceling the operation", () => {
		it("should emit the close event", async () => {
			const { wrapper } = getWrapper();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);
			configurator.vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("close")).toBeDefined();
		});

		it("should clear the configurator data", async () => {
			const { wrapper } = getWrapper();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);
			configurator.vm.$emit("cancel");
			await nextTick();

			expect(configurator.vm.clearData).toHaveBeenCalled();
		});
	});

	describe("when saving a tool", () => {
		it("should display a notification when created", async () => {
			const { wrapper } = getWrapper();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);
			configurator.vm.$emit("success", contextExternalToolFactory.build());
			await flushPromises();

			expect(useBoardNotifierMock.showSuccess).toHaveBeenCalledWith(
				"components.administration.externalToolsSection.notification.created"
			);
		});

		it("should emit the save event", async () => {
			const { wrapper } = getWrapper();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);
			configurator.vm.$emit("success", contextExternalToolFactory.build());
			await flushPromises();

			expect(wrapper.emitted("save")).toBeDefined();
		});

		it("should emit the close event", async () => {
			const { wrapper } = getWrapper();

			const configurator = wrapper.findComponent(
				ContextExternalToolConfigurator
			);
			configurator.vm.$emit("success", contextExternalToolFactory.build());
			await flushPromises();

			expect(wrapper.emitted("close")).toBeDefined();
		});
	});
});
