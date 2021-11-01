import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import RoomModal from "./RoomModal.vue";
// import { isValidComponent } from "../../../tests/unit/commonTests.js";

describe("@components/molecules/RoomModal", () => {
	it("should open and close on property change", async () => {
		const testProps = {
			isOpen: false,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: 200,
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const dialog = wrapper.find(".room-dialog");
		const customDialog = wrapper.vm.$refs.customDialog as any;
		// const vDialog = customDialog?.$refs.vDialog;
		expect(dialog.exists()).toBe(true);
		expect(customDialog.isOpen).toBeFalsy();
		await wrapper.setProps({
			isOpen: true,
		});
		expect(customDialog.isOpen).toBeTruthy();
		await wrapper.setProps({
			isOpen: false,
		});
		expect(customDialog.isOpen).toBeFalsy();
	});

	it("should emit event if vuetify modal is closed", async () => {
		const testProps = {
			isOpen: false,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: 200,
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const dialog = wrapper.find(".room-dialog");
		const customDialog = wrapper.vm.$refs.customDialog as any;
		customDialog.$emit("dialog-closed");

		// save in var so that check if undefined works
		const emitted = wrapper.emitted("dialog-closed");
		expect(emitted).toHaveLength(1);
		expect(emitted && emitted[0][0]).toBeFalsy();
	});
});
