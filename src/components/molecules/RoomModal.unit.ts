import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { courseRoomListModule } from "@/store";
import CourseRoomListModule from "@/store/course-room-list";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import RoomModal from "./RoomModal.vue";

describe("RoomModal", () => {
	const getWrapper = (props: { isOpen: boolean }) => {
		const { isOpen } = props;
		setupStores({ courseRoomListModule: CourseRoomListModule });

		const wrapper = mount(RoomModal, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				isOpen,
				groupData: { title: "dummy title", groupElements: [] },
				draggable: true,
			},
		});
		return { wrapper };
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when modal is not open", () => {
		describe("when component is mounted", () => {
			const setup = () => {
				const { wrapper } = getWrapper({ isOpen: false });
				return { wrapper };
			};

			it("it should be rendered", () => {
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(vCustomDialog);

				expect(dialog.exists()).toBe(true);
			});

			it("it should pass isOpen to vCustomDialog", () => {
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(vCustomDialog);
				expect(dialog.props("isOpen")).toBeFalsy();
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

				const dialog = wrapper.findComponent(vCustomDialog);
				expect(dialog.props("isOpen")).toBeTruthy();
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

				const iterator = wrapper.findComponent(RoomAvatarIterator);
				expect(iterator.props("canDraggable")).toBe(true);
			});

			it("should pass itemsize prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(RoomAvatarIterator);
				expect(iterator.props("itemSize")).toBe("5em");
			});

			it("should pass groupElements prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(RoomAvatarIterator);
				expect(iterator.props("avatars")).toEqual([]);
			});
		});

		describe("when enter is pressed", () => {
			describe("when title is valid", () => {
				const setup = async () => {
					const { wrapper } = getWrapper({ isOpen: true });

					const storeRoomUpdateMock = vi
						.spyOn(courseRoomListModule, "update")
						.mockImplementation(vi.fn());
					const titleInput = wrapper
						.findComponent({ name: "v-text-field" })
						.find("input");

					const newTitle = "changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("keyup.enter");
					await wrapper.vm.$nextTick();

					return { storeRoomUpdateMock, newTitle, wrapper };
				};

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
			});

			describe("when title is not valid", () => {
				const setup = async () => {
					const { wrapper } = getWrapper({ isOpen: true });

					const storeRoomUpdateMock = vi
						.spyOn(courseRoomListModule, "update")
						.mockImplementation(vi.fn());
					const titleInput = wrapper
						.findComponent({ name: "v-text-field" })
						.find("input");

					const newTitle = "<changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("keyup.enter");
					await wrapper.vm.$nextTick();

					return { storeRoomUpdateMock };
				};

				it("should not change name", async () => {
					const { storeRoomUpdateMock } = await setup();

					expect(storeRoomUpdateMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("when enter is pressed two times ", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const storeRoomUpdateMock = vi
					.spyOn(courseRoomListModule, "update")
					.mockImplementation(vi.fn());
				const titleInput = wrapper
					.findComponent({ name: "v-text-field" })
					.find("input");

				const newTitle = "changed title";
				await titleInput.setValue(newTitle);

				await titleInput.trigger("keyup.enter");
				await wrapper.vm.$nextTick();

				const newTitle2 = "changed title again";
				await titleInput.setValue(newTitle2);

				await titleInput.trigger("keyup.enter");
				await wrapper.vm.$nextTick();

				return { storeRoomUpdateMock, newTitle2, wrapper };
			};

			it("should change name on second enter again", async () => {
				const { storeRoomUpdateMock, newTitle2 } = await setup();

				const expectedGroupData = {
					id: "",
					title: newTitle2,
					shortTitle: "",
					displayColor: "",
					xPosition: -1,
					yPosition: -1,
				};

				expect(storeRoomUpdateMock).toHaveBeenCalledTimes(2);
				expect(storeRoomUpdateMock).toHaveBeenCalledWith(expectedGroupData);
			});
		});

		describe("when course group name input emits blur", () => {
			describe("when title is valid", () => {
				const setup = async () => {
					const { wrapper } = getWrapper({ isOpen: true });

					const storeRoomUpdateMock = vi
						.spyOn(courseRoomListModule, "update")
						.mockImplementation(vi.fn());
					const titleInput = wrapper
						.findComponent({ name: "v-text-field" })
						.find("input");
					const newTitle = "changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("blur");
					await wrapper.vm.$nextTick();

					return { storeRoomUpdateMock, newTitle, wrapper };
				};

				it("should change name on blur", async () => {
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
			});

			describe("when title is not valid", () => {
				const setup = async () => {
					const { wrapper } = getWrapper({ isOpen: true });

					const storeRoomUpdateMock = vi
						.spyOn(courseRoomListModule, "update")
						.mockImplementation(vi.fn());
					const titleInput = wrapper
						.findComponent({ name: "v-text-field" })
						.find("input");
					const newTitle = "<changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("blur");
					await wrapper.vm.$nextTick();

					return { storeRoomUpdateMock, wrapper };
				};

				it("should change name on blur", async () => {
					const { storeRoomUpdateMock } = await setup();

					expect(storeRoomUpdateMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("when room-avatar-iterator emits 'startDrag'", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				const iterator = wrapper.findComponent(RoomAvatarIterator);
				const roomItem = {
					id: "dummy id",
					title: "dummy title",
					shortTitle: "dummy short title",
					displayColor: "dummy color",
					xPosition: 0,
					yPosition: 0,
				};
				iterator.vm.$emit("startDrag", roomItem);

				return { wrapper, roomItem };
			};

			it("should emit 'drag-from-group'", async () => {
				const { wrapper, roomItem } = await setup();

				const emitted = wrapper.emitted("drag-from-group");
				expect(emitted).toHaveLength(1);
				expect(emitted && emitted[0][0]).toEqual(roomItem);
			});
		});

		describe("when room name contains < followed by a string", () => {
			it("should show validation error", async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");

				await input.setValue("<abc123");

				expect(textField.text()).toContain(
					"common.validation.containsOpeningTag"
				);
			});
		});
	});

	describe("when vCustomDialog emits dialog-closed", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(vCustomDialog);
			dialog.vm.$emit("dialog-closed");

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
