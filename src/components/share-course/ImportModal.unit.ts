import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import ImportModal from "@components/share-course/ImportModal.vue";

describe("@components/share-course/ImportModal", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
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
		try {
			getWrapper();
		} catch (e) {
			if (e instanceof Error) {
				expect(e.message).toContain("Missing required prop:");
			}
			return;
		}
		fail("No error on required props");
	});
	it("should render with props", () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
			},
		});
		expect(wrapper).toBeTruthy();
	});

	it("should render parentName in textfield onCreated", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
			},
		});
		const textField = wrapper.findComponent({
			ref: "textField",
		});
		expect(textField.props("value")).toStrictEqual("TestParentName");
		await wrapper.setProps({ parentName: "UpdateParentName" });
		expect(textField.props("value")).toStrictEqual("UpdateParentName");
	});

	it("should emit input value on next", async () => {
		const wrapper = getWrapper({
			propsData: {
				isOpen: true,
				parentName: "TestParentName",
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
			},
		});
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-canceled");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});
});
