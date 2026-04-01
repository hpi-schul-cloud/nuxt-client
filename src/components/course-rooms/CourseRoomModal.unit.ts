import CourseRoomAvatarIterator from "./CourseRoomAvatarIterator.vue";
import CourseRoomModal from "./CourseRoomModal.vue";
import CustomDialog from "@/components/organisms/CustomDialog.vue";
import { courseRoomElementFactory, courseRoomGroupFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCourseRoomListStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("RoomModal", () => {
	const getWrapper = (props: { isOpen: boolean }) => {
		const { isOpen } = props;
		const pinia = createTestingPinia({ stubActions: false });
		setActivePinia(pinia);

		const courseRoomListStore = mockedPiniaStoreTyping(useCourseRoomListStore);

		const wrapper = mount(CourseRoomModal, {
			global: { plugins: [pinia, createTestingVuetify(), createTestingI18n()] },
			props: {
				isOpen,
				groupData: courseRoomGroupFactory.build({ title: "dummy title", groupElements: [] }),
				draggable: true,
			},
		});
		return { wrapper, courseRoomListStore };
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

				const dialog = wrapper.findComponent(CustomDialog);

				expect(dialog.exists()).toBe(true);
			});

			it("it should pass isOpen to CustomDialog", () => {
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(CustomDialog);
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

			it("should pass isOpen to CustomDialog", async () => {
				const { wrapper } = await setup();

				const dialog = wrapper.findComponent(CustomDialog);
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

				const iterator = wrapper.findComponent(CourseRoomAvatarIterator);
				expect(iterator.props("canDraggable")).toBe(true);
			});

			it("should pass itemsize prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(CourseRoomAvatarIterator);
				expect(iterator.props("itemSize")).toBe("5em");
			});

			it("should pass groupElements prop to room-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(CourseRoomAvatarIterator);
				expect(iterator.props("avatars")).toEqual([]);
			});
		});

		describe("when enter is pressed", () => {
			describe("when title is valid", () => {
				const setup = async () => {
					const { wrapper, courseRoomListStore } = getWrapper({ isOpen: true });

					const titleInput = wrapper.findComponent({ name: "v-text-field" }).find("input");

					const newTitle = "changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("keyup.enter");
					await wrapper.vm.$nextTick();

					return { courseRoomListStore, newTitle, wrapper };
				};

				it("should change name on enter", async () => {
					const { courseRoomListStore, newTitle } = await setup();

					expect(courseRoomListStore.updateCourse).toHaveBeenCalledTimes(1);
					expect(courseRoomListStore.updateCourse).toHaveBeenCalledWith(
						expect.objectContaining({
							title: newTitle,
						})
					);
				});
			});

			describe("when title is not valid", () => {
				const setup = async () => {
					const { wrapper, courseRoomListStore } = getWrapper({ isOpen: true });

					const titleInput = wrapper.findComponent({ name: "v-text-field" }).find("input");

					const newTitle = "<changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("keyup.enter");
					await wrapper.vm.$nextTick();

					return { courseRoomListStore };
				};

				it("should not change name", async () => {
					const { courseRoomListStore } = await setup();

					expect(courseRoomListStore.updateCourse).not.toHaveBeenCalled();
				});
			});
		});

		describe("when enter is pressed two times ", () => {
			const setup = async () => {
				const { wrapper, courseRoomListStore } = getWrapper({ isOpen: true });

				const titleInput = wrapper.findComponent({ name: "v-text-field" }).find("input");

				const newTitle = "changed title";
				await titleInput.setValue(newTitle);

				await titleInput.trigger("keyup.enter");
				await wrapper.vm.$nextTick();

				const newTitle2 = "changed title again";
				await titleInput.setValue(newTitle2);

				await titleInput.trigger("keyup.enter");
				await wrapper.vm.$nextTick();

				return { courseRoomListStore, newTitle2, wrapper };
			};

			it("should change name on second enter again", async () => {
				const { courseRoomListStore, newTitle2 } = await setup();

				expect(courseRoomListStore.updateCourse).toHaveBeenCalledTimes(2);
				expect(courseRoomListStore.updateCourse).toHaveBeenCalledWith(
					expect.objectContaining({
						title: newTitle2,
					})
				);
			});
		});

		describe("when course group name input emits blur", () => {
			describe("when title is valid", () => {
				const setup = async () => {
					const { wrapper, courseRoomListStore } = getWrapper({ isOpen: true });

					const titleInput = wrapper.findComponent({ name: "v-text-field" }).find("input");
					const newTitle = "changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("blur");
					await wrapper.vm.$nextTick();

					return { courseRoomListStore, newTitle, wrapper };
				};

				it("should change name on blur", async () => {
					const { courseRoomListStore, newTitle } = await setup();

					expect(courseRoomListStore.updateCourse).toHaveBeenCalledTimes(1);
					expect(courseRoomListStore.updateCourse).toHaveBeenCalledWith(
						expect.objectContaining({
							title: newTitle,
						})
					);
				});
			});

			describe("when title is not valid", () => {
				const setup = async () => {
					const { wrapper, courseRoomListStore } = getWrapper({ isOpen: true });

					const titleInput = wrapper.findComponent({ name: "v-text-field" }).find("input");
					const newTitle = "<changed title";
					await titleInput.setValue(newTitle);

					await titleInput.trigger("blur");
					await wrapper.vm.$nextTick();

					return { courseRoomListStore, wrapper };
				};

				it("should change name on blur", async () => {
					const { courseRoomListStore } = await setup();

					expect(courseRoomListStore.updateCourse).not.toHaveBeenCalled();
				});
			});
		});

		describe("when room-avatar-iterator emits 'startDrag'", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				const iterator = wrapper.findComponent(CourseRoomAvatarIterator);
				const roomItem = courseRoomElementFactory.build();
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

				expect(textField.text()).toContain("common.validation.containsOpeningTag");
			});
		});

		describe("when groupData prop changes", () => {
			it("should update internal data", async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const newGroupData = courseRoomGroupFactory.build({
					title: "new title",
					groupElements: [],
					isSynchronized: true,
				});

				await wrapper.setProps({ groupData: newGroupData });

				const textField = wrapper.findComponent({ name: "v-text-field" });
				const input = textField.find("input");
				expect((input.element as HTMLInputElement).value).toBe("new title");
			});
		});
	});

	describe("when CustomDialog emits dialog-closed", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(CustomDialog);
			dialog.vm.$emit("dialog-closed");

			return { wrapper };
		};

		it("should emit 'update:isOpen", async () => {
			const { wrapper } = setup();

			const emitted = wrapper.emitted("update:isOpen");
			expect(emitted).toHaveLength(1);
			expect(emitted && emitted[0][0]).toBeFalsy();
		});
	});
});
