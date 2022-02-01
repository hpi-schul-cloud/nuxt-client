import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import ImportModal from "./ImportModal.vue";

describe("@components/molecules/RoomModal", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should open and close on property change", async () => {
		const testProps = {
			isOpen: false,
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const dialog = wrapper.find(".import-dialog");
		const importDialog = wrapper.vm.$refs.importDialog as any;
		expect(dialog.exists()).toBe(true);
		expect(importDialog.isOpen).toBeFalsy();
		await wrapper.setProps({
			isOpen: true,
		});
		expect(importDialog.isOpen).toBeTruthy();
		await wrapper.setProps({
			isOpen: false,
		});
		expect(importDialog.isOpen).toBeFalsy();
	});

	it("should emit event if vuetify modal is closed", async () => {
		const testProps = {
			isOpen: false,
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const customDialog = wrapper.vm.$refs.importDialog as any;
		customDialog.$emit("dialog-closed");
		const emitted = wrapper.emitted("dialog-closed");
		expect(emitted).toHaveLength(1);
		expect(emitted && emitted[0][0]).toBeFalsy();
	});

	it("stepper should work by setting step value", async () => {
		const testProps = {
			isOpen: true,
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const stepper = wrapper.find(".stepper");

		wrapper.setData({ step: 1 });
		// @ts-ignore
		expect(stepper.vm.steps[0].isActive).toBe(true);

		wrapper.setData({ step: 2 });
		await wrapper.vm.$nextTick();
		// @ts-ignore
		expect(stepper.vm.steps[1].isActive).toBe(true);

		wrapper.setData({ step: 3 });
		await wrapper.vm.$nextTick();
		// @ts-ignore
		expect(stepper.vm.steps[2].isActive).toBe(true);
	});

	it("text fields should have correct value", async () => {
		const testProps = {
			isOpen: true,
		};
		const sharedCourseData = {
			code: "123",
			courseName: "Mathe",
			status: "success",
			message: "",
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		wrapper.setData({ step: 2, sharedCourseData });
		await wrapper.vm.$nextTick();

		const textCourseCode = wrapper.find(".text-field-course-code");
		// @ts-ignore
		expect(textCourseCode.vm.value).toStrictEqual("123");

		wrapper.setData({ step: 3, sharedCourseData });
		await wrapper.vm.$nextTick();
		const textCourseName = wrapper.find(".text-field-course-name");
		// @ts-ignore
		expect(textCourseName.vm.value).toStrictEqual("Mathe");
	});

	it("confirm and back button should increase and decrease the step value", async () => {
		const testProps = {
			isOpen: true,
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		const btnConfirm = wrapper.find(".dialog-confirmed");
		const btnBack = wrapper.find(".dialog-back-button");
		btnConfirm.trigger("click");
		// @ts-ignore
		expect(wrapper.vm.step).toStrictEqual(2);

		btnBack.trigger("click");
		// @ts-ignore
		expect(wrapper.vm.step).toStrictEqual(1);
	});

	it("cancel button should emit 'dialog-closed'", async () => {
		const testProps = {
			isOpen: true,
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		const btnCancel = wrapper.find(".dialog-closed");
		btnCancel.trigger("click");
		const emitted = wrapper.emitted();

		expect(emitted["dialog-closed"]).toHaveLength(1);
	});

	it("confirm button should be disabled if status is error", async () => {
		const testProps = {
			isOpen: true,
		};
		const sharedCourseData = {
			code: "123",
			courseName: "",
			status: "error",
			message: "",
		};
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		wrapper.setData({ step: 3, sharedCourseData });
		await wrapper.vm.$nextTick();

		const btnConfirm = wrapper.find(".dialog-confirmed");
		// @ts-ignore
		expect(btnConfirm.vm.disabled).toBe(true);
	});

	it("next button title should change if step=3 ", async () => {
		const testProps = {
			isOpen: true,
		};

		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		wrapper.setData({ step: 2 });
		await wrapper.vm.$nextTick();

		const btnConfirm = wrapper.find(".dialog-confirmed");
		expect(btnConfirm.element.innerHTML).toContain("Weiter");
		wrapper.setData({ step: 3 });
		await wrapper.vm.$nextTick();
		expect(btnConfirm.element.innerHTML).toContain("Importieren");
	});
});
