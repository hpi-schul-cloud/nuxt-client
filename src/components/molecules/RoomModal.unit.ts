import { roomsModule } from "@/store";
import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import RoomModal from "./RoomModal.vue";

describe("RoomModal", () => {
	const getWrapper = (props: { isOpen: boolean }) => {
		const { isOpen } = props;
		document.body.setAttribute("data-app", "true");
		setupStores({ roomsModule: RoomsModule });

		const wrapper = mount(RoomModal, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen,
				groupData: { title: "dummy title", groupElements: [] },
				draggable: true,
			},
		});
		return { wrapper };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when modal is not open", () => {
		describe("when component is mounted", () => {
			const setup = () => {
				const { wrapper } = getWrapper({ isOpen: false });
				return { wrapper };
			};

			it("it should be rendered", () => {
				const { wrapper } = setup();

				const dialog = wrapper.find(".room-dialog");
				expect(dialog.exists()).toBe(true);
			});

			it("it should pass isOpen to vCustomDialog", () => {
				const { wrapper } = setup();
				const customDialog = wrapper.vm.$refs.customDialog as any;
				expect(customDialog.isOpen).toBeFalsy();
			});
		});

		describe("when modal receives isOpen as true", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: false });
				await wrapper.setProps({
					isOpen: true,
				});

				return { wrapper };
			};

			it("should pass isOpen to vCustomDialog", async () => {
				const { wrapper } = await setup();

				const customDialog = wrapper.vm.$refs.customDialog as any;
				expect(customDialog.isOpen).toBeTruthy();
			});
		});
	});

	describe("when modal is open", () => {
		describe("when component is mounted", () => {
			const setup = () => {
				const { wrapper } = getWrapper({ isOpen: true });
				return { wrapper };
			};

			it("should pass 'draggable' prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.find(".iterator");
				expect(iterator.vm.$props.canDraggable).toBe(true);
			});

			it("should pass itemsize prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.find(".iterator");
				expect(iterator.vm.$props.itemSize).toBe("5em");
			});

			it("should pass groupElements prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.find(".iterator");
				expect(iterator.vm.$props.items).toEqual([]);
			});
		});

		describe("when enter is pressed", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				await wrapper.setData({ roomNameEditMode: true });

				const storeRoomUpdateMock = jest.spyOn(roomsModule, "update");
				const titleInput = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				const newTitle = "changed title";
				await titleInput.setValue(newTitle);

				await titleInput.trigger("keyup.enter");
				await wrapper.vm.$nextTick();

				return { storeRoomUpdateMock, newTitle, wrapper };
			};

			it("should let input emit blur", async () => {
				const { wrapper } = await setup();

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();

				const titleInput = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				expect(titleInput.element).not.toBe(document.activeElement);
			});

			it("should change name on enter", async () => {
				const { storeRoomUpdateMock, newTitle } = await setup();

				const expectedGroupData = {
					id: "",
					title: newTitle,
					shortTitle: "",
					displayColor: "",
					xPosition: -1,
					yPosition: -1,
				};

				expect(storeRoomUpdateMock).toHaveBeenCalledTimes(1);
				expect(storeRoomUpdateMock).toHaveBeenCalledWith(expectedGroupData);
			});

			it("should set roomNameEditMode to false", async () => {
				const { wrapper } = await setup();

				expect(wrapper.vm.$data.roomNameEditMode).toBeFalsy();
			});
		});

		describe("when course group name input emits blur", () => {
			const setup = async (props: { roomNameEditMode: boolean }) => {
				const { roomNameEditMode } = props;
				const { wrapper } = getWrapper({ isOpen: true });
				await wrapper.setData({ roomNameEditMode });

				const storeRoomUpdateMock = jest.spyOn(roomsModule, "update");
				const titleInput = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");
				const newTitle = "changed title";
				await titleInput.setValue(newTitle);

				await titleInput.trigger("blur");
				await wrapper.vm.$nextTick();

				return { storeRoomUpdateMock, newTitle, wrapper };
			};

			describe("when roomNameEditMode is false", () => {
				it("should not change name on blur", async () => {
					const { storeRoomUpdateMock } = await setup({
						roomNameEditMode: false,
					});

					expect(storeRoomUpdateMock).not.toHaveBeenCalled();
				});
			});

			describe("when roomNameEditMode is true", () => {
				it("should change name on blur", async () => {
					const { storeRoomUpdateMock, newTitle } = await setup({
						roomNameEditMode: true,
					});
					const expectedGroupData = {
						id: "",
						title: newTitle,
						shortTitle: "",
						displayColor: "",
						xPosition: -1,
						yPosition: -1,
					};

					expect(storeRoomUpdateMock).toHaveBeenCalledTimes(1);
					expect(storeRoomUpdateMock).toHaveBeenCalledWith(expectedGroupData);
				});

				it("should set roomNameEditMode to false", async () => {
					const { wrapper } = await setup({ roomNameEditMode: true });

					expect(wrapper.vm.$data.roomNameEditMode).toBeFalsy();
				});
			});
		});

		describe("when course group name input emits focus", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				await wrapper.setData({ roomNameEditMode: false });

				const titleInput = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				await titleInput.trigger("focus");
				await wrapper.vm.$nextTick();

				return { wrapper };
			};

			it("should set roomNameEditMode to true", async () => {
				const { wrapper } = await setup();
				expect(wrapper.vm.$data.roomNameEditMode).toBeTruthy();
			});
		});

		describe("when room-avatar-iterator emits 'startDrag'", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				const iterator = wrapper.find(".iterator");
				const roomItem = {
					id: "dummy id",
					title: "dummy title",
					shortTitle: "dummy short title",
					displayColor: "dummy color",
					xPosition: 0,
					yPosition: 0,
				};
				await iterator.vm.$emit("startDrag", roomItem);

				return { wrapper, roomItem };
			};

			it("should emit 'drag-from-group'", async () => {
				const { wrapper, roomItem } = await setup();

				const emitted = wrapper.emitted("drag-from-group");
				expect(emitted).toHaveLength(1);
				expect(emitted && emitted[0][0]).toEqual(roomItem);
			});
		});
	});

	describe("when vCustomDialog emits dialog-closed", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const customDialog = wrapper.vm.$refs.customDialog as any;
			customDialog.$emit("dialog-closed");

			return { wrapper };
		};

		it("should emit 'update:isOpen", async () => {
			const { wrapper } = setup();

			// save in var so that check if undefined works
			const emitted = wrapper.emitted("update:isOpen");
			expect(emitted).toHaveLength(1);
			expect(emitted && emitted[0][0]).toBeFalsy();
		});
	});
});
