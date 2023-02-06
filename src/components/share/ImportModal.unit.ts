import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import ImportModal from "@components/share/ImportModal.vue";
import Vue from "vue";

describe("@components/share/ImportModal", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ImportModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
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
		if (emitted === undefined) {
			return fail("Unknown emit");
		}

		expect(emitted).toHaveLength(1);
		expect(emitted[0][0]).toStrictEqual("TestParentName");
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
});
