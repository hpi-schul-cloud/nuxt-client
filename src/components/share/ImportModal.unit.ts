import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import ImportModal from "@/components/share/ImportModal.vue";
import Vue from "vue";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("@components/share/ImportModal", () => {
	const getWrapper = (
		attrs = {},
		envConfigModuleGetter?: Partial<EnvConfigModule>
	) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			...envConfigModuleGetter,
		});

		const wrapper = mount(ImportModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		jest.clearAllMocks();
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should not render without required props", () => {
		console.error = jest.fn();

		getWrapper();

		expect(console.error).toBeCalledWith(
			expect.stringContaining('Missing required prop: "parentName"')
		);
	});

	it("should render with props", () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "course",
			},
		});
		expect(wrapper).toBeTruthy();
	});

	it("should render parentName in textfield onCreated", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "course",
			},
		});
		const nameInput = wrapper.findComponent({
			ref: "nameInputText",
		});
		expect(nameInput.props("value")).toStrictEqual("TestParentName");
		await wrapper.setProps({ parentName: "UpdateParentName" });
		expect(nameInput.props("value")).toStrictEqual("UpdateParentName");
	});

	it("should emit input value on next", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "course",
			},
		});
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-confirmed");

		const emitted = wrapper.emitted("import");

		expect(emitted).not.toBeUndefined();
		expect(emitted).toHaveLength(1);
		expect(emitted?.[0][0]).toStrictEqual("TestParentName");
	});

	it("should cancel on dialog cancel", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "course",
			},
		});
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-canceled");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});

	it("should not emit if nameInput has a required-error", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
				parentType: "course",
			},
		});

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
			const setup = () => {
				const wrapper = getWrapper(
					{
						propsData: {
							isOpen: true,
							parentName: "TestParentName",
							parentType: "courses",
						},
					},
					{
						getCtlToolsTabEnabled: true,
					}
				);
				return {
					wrapper,
				};
			};

			it("should show ctl tool info", () => {
				const { wrapper } = setup();

				const infoText = wrapper.get(
					`[data-testid="import-modal-external-tools-info"]`
				);

				expect(infoText.isVisible()).toBe(true);
			});

			it("should set the right key for ctl tools", () => {
				const { wrapper } = setup();

				const infoText = wrapper.get(
					`[data-testid="import-modal-external-tools-info"]`
				);

				expect(infoText.element.innerHTML).toContain(
					wrapper.vm.$i18n.t(
						`components.molecules.import.courses.options.ctlTools.infoText`
					)
				);
			});

			it("should not show course file info", () => {
				const { wrapper } = setup();

				const infoText = wrapper.find(
					`[data-testid="import-modal-coursefiles-info"]`
				);

				expect(infoText.isVisible()).toBe(false);
			});
		});

		describe("show ctl tool info is disabled", () => {
			const setup = () => {
				const wrapper = getWrapper(
					{
						propsData: {
							isOpen: true,
							parentName: "TestParentName",
							parentType: "course",
						},
					},
					{
						getCtlToolsTabEnabled: false,
					}
				);

				return {
					wrapper,
				};
			};

			describe("when ctl is disabled", () => {
				it("should not show ctl tool info", () => {
					const { wrapper } = setup();

					const infoText = wrapper.find(
						`[data-testid="import-modal-external-tools-info"]`
					);

					expect(infoText.isVisible()).toBe(false);
				});

				it("should show course file info", () => {
					const { wrapper } = setup();

					const infoText = wrapper.find(
						`[data-testid="import-modal-coursefiles-info"]`
					);

					expect(infoText.isVisible()).toBe(true);
				});

				it("should set the right key for course files", () => {
					const { wrapper } = setup();

					const infoText = wrapper.find(
						`[data-testid="import-modal-coursefiles-info"]`
					);

					expect(infoText.element.innerHTML).toContain(
						"components.molecules.import.course.options.infoText"
					);
				});
			});
		});
	});
});
