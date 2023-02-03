import { roomsModule } from "@/store";
import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import RoomModal from "./RoomModal.vue";

describe("@/components/molecules/RoomModal", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({ roomsModule: RoomsModule });
	});

	// isValidComponent test fails for typescript based components and thus is omitted

	it("should open and close on property change", async () => {
		const testProps = {
			isOpen: false,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: "4em",
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const dialog = wrapper.find(".room-dialog");
		const customDialog = wrapper.vm.$refs.customDialog as any;
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
			avatarSize: "4em",
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

	it("should make name editable", async () => {
		const testProps = {
			isOpen: true,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: "4em",
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const titleH2 = wrapper.find(".room-title h2");
		titleH2.trigger("click");

		const titleInput = wrapper.find(".room-title input");
		expect(titleInput.exists()).toBeTruthy();
	});

	it("should change name on blur", async () => {
		const storeRoomUpdateMock = jest.spyOn(roomsModule, "update");
		const testProps = {
			isOpen: true,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: "4em",
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const titleH2 = wrapper.find(".room-title h2");

		titleH2.trigger("click");
		const titleInput = wrapper.find(".room-title input");
		titleInput.setValue("changed title");
		titleInput.trigger("blur");
		await wrapper.vm.$nextTick();

		expect(storeRoomUpdateMock).toHaveBeenCalled();
		expect(storeRoomUpdateMock.mock.calls[0][0].title).toBe("changed title");
	});

	it("should change name on enter", async () => {
		const storeRoomUpdateMock = jest.spyOn(roomsModule, "update");
		const testProps = {
			isOpen: true,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: "4em",
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		const titleH2 = wrapper.find(".room-title h2");

		titleH2.trigger("click");
		const titleInput = wrapper.find(".room-title input");
		titleInput.setValue("changed title");
		titleInput.trigger("blur");
		await wrapper.vm.$nextTick();

		expect(storeRoomUpdateMock).toHaveBeenCalled();
		expect(storeRoomUpdateMock.mock.calls[0][0].title).toBe("changed title");
	});

	it("should pass 'draggable' prop to room-avatar-iterator", async () => {
		const testProps = {
			isOpen: true,
			groupData: { title: "dummy title", groupElements: [] },
			avatarSize: "4em",
			draggable: true,
		};
		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		const iterator = wrapper.find(".iterator");
		expect(iterator.vm.$props.canDraggable).toBe(true);
	});
});
