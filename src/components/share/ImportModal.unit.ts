import ImportModal from "@/components/share/ImportModal.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@components/share/ImportModal", () => {
	const setup = () => {
		const wrapper = mount(ImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
		vi.clearAllMocks();
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

	describe("when room name contains < followed by a string", () => {
		it("should show validation error", async () => {
			const { wrapper } = setup();

			const nameInput = wrapper.findComponent({
				ref: "nameInputText",
			});
			await nameInput.find("input").setValue("TestParentName<test");

			expect(nameInput.text()).toContain(
				"common.validation.containsOpeningTag"
			);
		});
	});

	describe("ctl tools info", () => {
		it("should show ctl tool info", () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
			const cardText = dialog.findComponent({ name: "v-card-text" });

			const infoText = cardText.get(
				`[data-testid="import-modal-external-tools-info"]`
			);

			expect(infoText.isVisible()).toBe(true);
		});

		it("should set the right key for ctl tools", () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
			const cardText = dialog.findComponent({ name: "v-card-text" });

			const infoText = cardText.get(
				`[data-testid="import-modal-external-tools-info"]`
			);

			expect(infoText.text()).toEqual(
				"components.molecules.shareImport.options.ctlTools.infoText.unavailable"
			);
		});
		it("should also show course file info", () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent({ name: "v-custom-dialog" });
			const cardText = dialog.findComponent({ name: "v-card-text" });

			const infoText = cardText.find(
				`[data-testid="import-modal-coursefiles-info"]`
			);

			expect(infoText.exists()).toBe(true);
		});
	});
});
