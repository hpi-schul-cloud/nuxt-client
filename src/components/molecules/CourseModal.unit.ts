import CourseAvatarIterator from "@/components/organisms/CourseAvatarIterator.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { coursesModule } from "@/store";
import CoursesModule from "@/store/courses";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import CourseModal from "./CourseModal.vue";

describe("CourseModal", () => {
	const getWrapper = (props: { isOpen: boolean }) => {
		const { isOpen } = props;
		setupStores({ coursesModule: CoursesModule });

		const wrapper = mount(CourseModal, {
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

			it("should pass 'draggable' prop to course-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(CourseAvatarIterator);
				expect(iterator.props("canDraggable")).toBe(true);
			});

			it("should pass itemsize prop to course-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(CourseAvatarIterator);
				expect(iterator.props("itemSize")).toBe("5em");
			});

			it("should pass groupElements prop to course-avatar-iterator", () => {
				const { wrapper } = setup();

				const iterator = wrapper.findComponent(CourseAvatarIterator);
				expect(iterator.props("avatars")).toEqual([]);
			});
		});

		describe("when enter is pressed", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const storeRoomUpdateMock = jest.spyOn(coursesModule, "update");
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

		describe("when enter is pressed two times ", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const storeRoomUpdateMock = jest.spyOn(coursesModule, "update");
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
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });

				const storeRoomUpdateMock = jest.spyOn(coursesModule, "update");
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

		describe("when course-avatar-iterator emits 'startDrag'", () => {
			const setup = async () => {
				const { wrapper } = getWrapper({ isOpen: true });
				const iterator = wrapper.findComponent(CourseAvatarIterator);
				const courseItem = {
					id: "dummy id",
					title: "dummy title",
					shortTitle: "dummy short title",
					displayColor: "dummy color",
					xPosition: 0,
					yPosition: 0,
				};
				iterator.vm.$emit("startDrag", courseItem);

				return { wrapper, courseItem };
			};

			it("should emit 'drag-from-group'", async () => {
				const { wrapper, courseItem } = await setup();

				const emitted = wrapper.emitted("drag-from-group");
				expect(emitted).toHaveLength(1);
				expect(emitted && emitted[0][0]).toEqual(courseItem);
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