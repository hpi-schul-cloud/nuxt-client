import RoomModule from "@/store/room";
import { mount } from "@vue/test-utils";
import ImportLessonModal from "./ImportLessonModal.vue";

declare let createComponentMocks: Function;

const getWrapper: any = (props: object, options?: object) => {
	return mount(ImportLessonModal, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomLessonModal", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should open and close on property change", async () => {
		const wrapper = getWrapper({ isOpen: false });

		const dialog = wrapper.find(".import-dialog");
		const importDialog = wrapper.vm.$refs.importDialog as any;
		expect(dialog.exists()).toBe(true);
		expect(importDialog.isOpen).toBe(false);
		await wrapper.setProps({
			isOpen: true,
		});
		expect(importDialog.isOpen).toBe(true);
		await wrapper.setProps({
			isOpen: false,
		});
		expect(importDialog.isOpen).toBe(false);
	});

	it("should emit event if vuetify modal is closed", async () => {
		const wrapper = getWrapper({ isOpen: true });

		const customDialog = wrapper.vm.$refs.importDialog as any;
		customDialog.$emit("dialog-closed");
		const emitted = wrapper.emitted("dialog-closed");
		expect(emitted).toHaveLength(1);
		expect(emitted && emitted[0][0]).toBe(false);
	});

	it("stepper should work by setting step value", async () => {
		const wrapper = getWrapper({ isOpen: true });

		const stepper = wrapper.find(".stepper");

		wrapper.setData({ step: 1 });
		expect(stepper.vm.steps[0].isActive).toBe(true);

		wrapper.setData({ step: 2 });
		await wrapper.vm.$nextTick();
		expect(stepper.vm.steps[1].isActive).toBe(true);
	});

	it("text fields should have correct value", async () => {
		const sharedLessonData = {
			code: "123",
		};
		const wrapper = getWrapper({ isOpen: true });

		wrapper.setData({ step: 2, sharedLessonData });
		await wrapper.vm.$nextTick();

		const textCourseCode = wrapper.find(".text-field-lesson-code");
		expect(textCourseCode.vm.value).toStrictEqual("123");
	});

	it("confirm and back button should increase and decrease the step value", async () => {
		const wrapper = getWrapper({ isOpen: true });

		const btnConfirm = wrapper.find(".dialog-next");
		const btnBack = wrapper.find(".dialog-back-button");
		btnConfirm.trigger("click");
		expect(wrapper.vm.step).toStrictEqual(2);

		btnBack.trigger("click");
		expect(wrapper.vm.step).toStrictEqual(1);
	});

	it("cancel button should emit 'dialog-closed'", async () => {
		const wrapper = getWrapper({ isOpen: true });

		const btnCancel = wrapper.find(".dialog-closed");
		btnCancel.trigger("click");
		const emitted = wrapper.emitted();

		expect(emitted["dialog-closed"]).toHaveLength(1);
	});

	describe("error handling", () => {
		it("should show code-error section if server sends shareToken error", async () => {
			const wrapper = getWrapper({
				isOpen: true,
				sharedLessonData: { code: 123 },
			});

			wrapper.setData({ step: 2 });
			await wrapper.vm.$nextTick();
			const errorElementBefore = wrapper.find(".code-error");
			expect(errorElementBefore.exists()).toBe(false);
			RoomModule.setBusinessError({
				statusCode: "400",
				message: "not-found",
				error: {},
			});
			const btnNext = wrapper.find(".dialog-next");
			await btnNext.trigger("click");

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.businessError.message).toStrictEqual("not-found");
			expect(wrapper.vm.businessError.statusCode).toStrictEqual("400");
			const errorElementAfter = wrapper.find(".code-error");
			expect(errorElementAfter.element.textContent).toContain(
				wrapper.vm.$i18n.t("pages.room.lessonShare.codeError")
			);
		});

		it("should show import-error section if server sends import-error", async () => {
			const wrapper = getWrapper({
				isOpen: true,
			});

			await wrapper.setData({ step: 2, sharedLessonData: { code: "123" } });

			await wrapper.vm.$nextTick();
			const errorElementBefore = wrapper.find(".create-error");

			expect(errorElementBefore.exists()).toBe(false);

			RoomModule.setBusinessError({
				statusCode: "400",
				message: "not-created",
				error: {},
			});
			await wrapper.vm.$nextTick();

			const errorElementAfter = wrapper.find(".create-error");
			expect(errorElementAfter.element.textContent).toContain(
				wrapper.vm.$i18n.t("pages.room.lessonShare.importError")
			);
		});
	});
});
