import ImportModal from "@/components/share/ImportModal.vue";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("@components/share/ImportModal", () => {
	const setup = (envConfigModuleGetter?: Partial<EnvConfigModule>) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			...envConfigModuleGetter,
		});

		const wrapper = mount(ImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
				stubs: ["RenderHTML"],
			},
			props: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "courses",
			},
		});
		return { wrapper };
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render with props", () => {
		const { wrapper } = setup();

		expect(wrapper).toBeTruthy();
	});

	it("should render parentName in textfield onCreated", async () => {
		const { wrapper } = setup();
		const nameInput = wrapper.findComponent({
			ref: "nameInputText",
		});

		expect(nameInput.props("modelValue")).toStrictEqual("TestParentName");

		await wrapper.setProps({ parentName: "UpdateParentName" });
		expect(nameInput.props("modelValue")).toStrictEqual("UpdateParentName");
	});

	it("should emit input value on next", async () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-confirmed");

		const emitted = wrapper.emitted("import");

		expect(emitted).toBeDefined();
		expect(emitted).toHaveLength(1);
		expect(emitted?.[0][0]).toStrictEqual("TestParentName");
	});

	it("should cancel on dialog cancel", async () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-canceled");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});

	it("should not emit if nameInput has a required-error", async () => {
		const { wrapper } = setup();

		await wrapper.setProps({ isOpen: true, parentName: "" });

		const nameInput = wrapper.findComponent({
			ref: "nameInputText",
		});
		await nameInput.trigger("input");

		const dialog = wrapper.findComponent({
			ref: "dialog",
		});
		await dialog.vm.$emit("dialog-confirmed");

		const emitted = wrapper.emitted("import");
		expect(emitted).toBeUndefined();
	});

	describe("ctl tools info", () => {
		describe("when ctl tools are enabled", () => {
			it("should show ctl tool info", () => {
				const { wrapper } = setup({ getCtlToolsTabEnabled: true });

				const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
				const cardText = dialog.findComponent({ name: "v-card-text" });

				const infoText = cardText.get(
					`[data-testid="import-modal-external-tools-info"]`
				);

				expect(infoText.isVisible()).toBe(true);
			});

			it("should set the right key for ctl tools", () => {
				const { wrapper } = setup({ getCtlToolsTabEnabled: true });

				const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
				const cardText = dialog.findComponent({ name: "v-card-text" });

				const infoText = cardText.get(
					`[data-testid="import-modal-external-tools-info"]`
				);

				expect(infoText.attributes("html")).toEqual(
					"components.molecules.import.courses.options.ctlTools.infoText"
				);
			});
			it("should not show course file info", () => {
				const { wrapper } = setup({ getCtlToolsTabEnabled: true });

				const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
				const cardText = dialog.findComponent({ name: "v-card-text" });

				const infoText = cardText.find(
					`[data-testid="import-modal-coursefiles-info"]`
				);

				expect(infoText.exists()).toBe(false);
			});
		});
		describe("show ctl tool info is disabled", () => {
			describe("when ctl is disabled", () => {
				it("should not show ctl tool info", () => {
					const { wrapper } = setup({ getCtlToolsTabEnabled: false });

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
					const cardText = dialog.findComponent({ name: "v-card-text" });

					const infoText = cardText.find(
						`[data-testid="import-modal-external-tools-info"]`
					);
					expect(infoText.exists()).toBe(false);
				});

				it("should show course file info", () => {
					const { wrapper } = setup({ getCtlToolsTabEnabled: false });

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
					const cardText = dialog.findComponent({ name: "v-card-text" });

					const infoText = cardText.find(
						`[data-testid="import-modal-coursefiles-info"]`
					);
					expect(infoText.isVisible()).toBe(true);
				});

				it("should set the right key for course files", () => {
					const { wrapper } = setup({ getCtlToolsTabEnabled: false });

					const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
					const cardText = dialog.findComponent({ name: "v-card-text" });

					const infoText = cardText.find(
						`[data-testid="import-modal-coursefiles-info"]`
					);

					expect(infoText.element.innerHTML).toEqual(
						"components.molecules.import.courses.options.infoText"
					);
				});
			});
		});
	});
});
