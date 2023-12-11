import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import ImportModal from "@/components/share/ImportModal.vue";
import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";

describe("@components/share/ImportModal", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ImportModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");

		setupStores({ envConfigModule: EnvConfigModule });
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

	describe("when ctl tools are enabled", () => {
		it("should show ctl tool info", () => {
			const wrapper = getWrapper({
				propsData: {
					isOpen: true,
					parentName: "TestParentName",
					parentType: "course",
				},
			});

			const infoText = wrapper.find(
				`[data-testid="import-modal-external-tools-info"]`
			);

			expect(infoText.text()).toEqual(
				wrapper.vm.$i18n.t(
					`components.molecules.import.courses.options.ctlTools.infoText`
				)
			);
		});
	});
});
