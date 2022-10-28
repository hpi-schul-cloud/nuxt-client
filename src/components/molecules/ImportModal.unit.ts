import { roomsModule } from "@/store";
import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import ImportModal from "./ImportModal.vue";

describe("@/components/molecules/RoomModal", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({ roomsModule: RoomsModule });
	});

	it("should open and close on property change", async () => {
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen: false,
			},
		});
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
		const wrapper = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen: true,
			},
		});
		const customDialog = wrapper.vm.$refs.importDialog as any;
		customDialog.$emit("dialog-closed");
		const emitted = wrapper.emitted("dialog-closed");
		expect(emitted).toHaveLength(1);
		expect(emitted && emitted[0][0]).toBe(false);
	});

	it("stepper should work by setting step value", async () => {
		const wrapper: any = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen: true,
			},
		});
		const stepper = wrapper.find(".stepper");

		wrapper.setData({ step: 1 });
		expect(stepper.vm.steps[0].isActive).toBe(true);

		wrapper.setData({ step: 2 });
		await wrapper.vm.$nextTick();
		expect(stepper.vm.steps[1].isActive).toBe(true);

		wrapper.setData({ step: 3 });
		await wrapper.vm.$nextTick();
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
		const wrapper: any = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		wrapper.setData({ step: 2, sharedCourseData });
		await wrapper.vm.$nextTick();

		const textCourseCode = wrapper.find(".text-field-course-code");
		expect(textCourseCode.vm.value).toStrictEqual("123");

		wrapper.setData({ step: 3, sharedCourseData });
		await wrapper.vm.$nextTick();
		const textCourseName = wrapper.find(".text-field-course-name");
		expect(textCourseName.vm.value).toStrictEqual("Mathe");
	});

	it("next and back button should increase and decrease the step value", async () => {
		const testProps = {
			isOpen: true,
		};
		const wrapper: any = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		const btnNext = wrapper.find(`[data-testId="dialog-next"]`);
		const btnBack = wrapper.find(`[data-testId="dialog-back"]`);
		btnNext.trigger("click");
		expect(wrapper.vm.step).toStrictEqual(2);

		btnBack.trigger("click");
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

		const btnNext = wrapper.find(`[data-testId="dialog-next"]`);
		expect(btnNext.element.innerHTML).toContain("Weiter");
		wrapper.setData({ step: 3 });
		await wrapper.vm.$nextTick();
		expect(btnNext.element.innerHTML).toContain("Importieren");
	});

	it("should have correct buttons according to error occurrence", async () => {
		const testProps = {
			isOpen: true,
		};
		const wrapper: any = mount(ImportModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		const buttons = ["back", "cancel", "next"];
		const onImportErrorButton = ["confirm"];

		expect(wrapper.vm.modalButtons).toStrictEqual(buttons);

		await wrapper.setData({ isImportError: true, step: 3 });
		expect(wrapper.vm.modalButtons).toStrictEqual(onImportErrorButton);
	});

	describe("error handling", () => {
		it("should show code-error section if server sends shareToken error", async () => {
			const getSharedCourseDataMock = jest
				.spyOn(roomsModule, "getSharedCourseData")
				.mockImplementation();
			const wrapper: any = mount(ImportModal, {
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					isOpen: true,
				},
			});

			wrapper.setData({ step: 2 });
			await wrapper.vm.$nextTick();
			const textElementBefore = wrapper.find(".text-field-course-code");
			expect(textElementBefore.vm.error).toBe(false);
			expect(textElementBefore.vm.errorMessages).toStrictEqual("");
			roomsModule.setBusinessError({
				statusCode: "400",
				message: "BadRequest",
				error: {},
			});
			const btnNext = wrapper.find(`[data-testId="dialog-next"]`);
			await btnNext.trigger("click");
			expect(getSharedCourseDataMock).toHaveBeenCalled();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.businessError.message).toStrictEqual("BadRequest");
			expect(wrapper.vm.businessError.statusCode).toStrictEqual("400");
			const textElementAfter = wrapper.find(".text-field-course-code");
			expect(textElementAfter.vm.error).toBe(true);
			expect(textElementAfter.vm.errorMessages).toStrictEqual(
				wrapper.vm.$i18n.t("pages.rooms.importCourse.codeError")
			);
			getSharedCourseDataMock.mockClear();
		});

		it("should not go to step#3 if there is a code error", async () => {
			const wrapper: any = mount(ImportModal, {
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					isOpen: true,
				},
			});

			wrapper.setData({ step: 2 });
			await wrapper.vm.$nextTick();

			const btnNext = wrapper.find(`[data-testId="dialog-next"]`);
			await btnNext.trigger("click");
			await wrapper.vm.$nextTick();

			await btnNext.trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.step).toStrictEqual(2);
		});

		it("should show import-error section if server sends import-error", async () => {
			const wrapper: any = mount(ImportModal, {
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					isOpen: true,
				},
			});
			await wrapper.setData({
				businessError: {
					statusCode: "",
					message: "",
					error: {},
				},
				isImportError: false,
				step: 3,
			});

			const confirmButtonBefore = wrapper.find(".dialog-confirmed");
			const errorElementBefore = wrapper.find(".import-error");

			expect(confirmButtonBefore.exists()).toBe(false);
			expect(errorElementBefore.exists()).toBe(false);

			await wrapper.setData({
				businessError: {
					statusCode: "400",
					message: "import error",
					error: {},
				},
				isImportError: true,
			});

			const errorElementAfter = wrapper.find(".import-error");
			const confirmButtonAfter = wrapper.find(".dialog-confirmed");
			expect(errorElementAfter.element.textContent).toContain(
				wrapper.vm.$i18n.t("pages.rooms.importCourse.importError")
			);
			expect(confirmButtonAfter.exists()).toBe(true);
		});
	});
});
