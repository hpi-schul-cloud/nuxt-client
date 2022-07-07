import { mount } from "@vue/test-utils";
import { copyModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import CopyModule from "@/store/copy-process";
import CopyProcess from "./CopyProcess.vue";

declare let createComponentMocks: Function;

const serverResponseAllSuccess = {
	title: "Success-Title",
	type: "task",
	status: "success",
	id: "success-id-123",
	elements: [
		{ title: "metadata", type: "leaf", status: "success" },
		{ title: "description", type: "leaf", status: "success" },
		{ title: "submissions", type: "leaf", status: "not-doing" },
	],
};

const serverResponseCourseCopy = {
	title: "Mathe",
	type: "course",
	status: "partial",
	id: "456",
	elements: [
		{ title: "metadata", type: "leaf", status: "success" },
		{ title: "teachers", type: "leaf", status: "not-doing" },
		{ title: "substitutionTeachers", type: "leaf", status: "not-doing" },
		{ title: "students", type: "leaf", status: "not-doing" },
		{ title: "classes", type: "leaf", status: "not-doing" },
		{ title: "ltiTools", type: "leaf", status: "not-doing" },
		{ title: "times", type: "leaf", status: "not-implemented" },
		{ title: "files", type: "file-group", status: "not-implemented" },
		{ title: "coursegroups", type: "leaf", status: "not-implemented" },
		{
			title: "board",
			type: "board",
			status: "failure",
			id: "boardId",
			elements: [
				{
					title: "Aufgabe an Marla (Mathe) ",
					type: "task",
					status: "success",
					id: "---",
					elements: [
						{ title: "metadata", type: "leaf", status: "success" },
						{ title: "description", type: "leaf", status: "success" },
						{ title: "submissions", type: "leaf", status: "not-doing" },
					],
				},
				{
					title: "Aufgabe an Marla (Mathe) - offen",
					type: "task",
					status: "success",
					id: "567890",
					elements: [
						{ title: "metadata", type: "leaf", status: "success" },
						{ title: "description", type: "leaf", status: "success" },
						{ title: "submissions", type: "leaf", status: "not-doing" },
					],
				},
			],
		},
	],
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(CopyProcess, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/organisms/CopyProcess", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			"copy-process": CopyModule,
		});
	});
	describe("configurations", () => {
		it("should have correct props and configuration", async () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });

			expect(wrapper.vm.isOpen).toBe(true);
			expect(wrapper.vm.loading).toBe(false);
		});
	});

	describe("computed properties", () => {
		beforeEach(() => {
			copyModule.setCopyResult(serverResponseAllSuccess);
			copyModule.setFilteredResult(serverResponseAllSuccess);
		});

		it("'copiedItemTitle' should be the correct title", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });

			expect(wrapper.vm.copiedItemTitle).toStrictEqual("Success-Title");
		});

		it("'copiedItemId' should be the correct id", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });

			expect(wrapper.vm.copiedItemId).toStrictEqual("success-id-123");
		});

		it("'types' should return the types object", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });
			const expectedTypes = {
				Board: "board",
				Course: "course",
				File: "file",
				FileGroup: "file-group",
				Leaf: "leaf",
				Lesson: "lesson",
				Task: "task",
				LessonContent: "lesson-content",
				LessonContentGroup: "lesson-content-group",
			};

			expect(wrapper.vm.typesEnum).toStrictEqual(expectedTypes);
		});

		it("'status' should return the types object", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });
			const expectedStatus = {
				Success: "success",
				Failure: "failure",
				NotDoing: "not-doing",
				NotImplemented: "not-implemented",
				Partial: "partial",
			};

			expect(wrapper.vm.statusEnum).toStrictEqual(expectedStatus);
		});

		it("'copiedItems' should return the cleanedup object", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });
			const status = wrapper.vm.statusEnum;
			const types = wrapper.vm.typesEnum;

			const expectedCopiedItems = {
				title: "Success-Title",
				type: types.Task,
				status: status.Success,
				id: "success-id-123",
				elements: [
					{
						id: "success-id-123",
						feStatus: "success-all",
						title: wrapper.vm.$i18n.t(
							"components.molecules.copyResult.successfullyCopied"
						),
						type: types.Task,
					},
				],
				index: 0,
				completed: true,
			};

			expect(wrapper.vm.copiedItems).toStrictEqual(expectedCopiedItems);
		});
	});

	describe("html section", () => {
		it("should show skeleton when its prop set", async () => {
			const wrapper = getWrapper({});
			const skeletonElementBefore = wrapper.findAll(
				`[data-testid="copy-process-skeleton"]`
			);
			expect(skeletonElementBefore).toHaveLength(0);

			await wrapper.setProps({ isOpen: true, loading: true });

			const skeletonElementAfter = wrapper.findAll(
				`[data-testid="copy-process-skeleton"]`
			);
			expect(skeletonElementAfter).toHaveLength(1);
		});
	});

	describe("watch section", () => {
		it("should watch 'isOpen' prop anc change 'showModal' property", async () => {
			const wrapper = getWrapper({ isOpen: false, loading: false });
			expect(wrapper.vm.showModal).toBe(false);

			await wrapper.setProps({ isOpen: true });
			expect(wrapper.vm.showModal).toBe(true);
		});
	});

	describe("methods section", () => {
		it("should call 'dialogClosed' method when 'close' button is clicked", async () => {
			const closeMockFunction = jest.fn();
			const resetCopyResultSpy = jest.spyOn(copyModule, "resetCopyResult");
			const wrapper = getWrapper({ isOpen: true, loading: false });
			wrapper.vm.dialogClosed = closeMockFunction;
			await wrapper.setData({ showModal: true });

			const closeButton = wrapper.find(`[data-testid="dialog-close"]`);
			closeButton.trigger("click");

			expect(closeMockFunction).toHaveBeenCalled();
		});

		it("should call 'resetCopyResult' store method when 'close' button is clicked", async () => {
			const resetCopyResultSpy = jest.spyOn(copyModule, "resetCopyResult");
			const wrapper = getWrapper({ isOpen: true, loading: false });
			await wrapper.setData({ showModal: true });

			const closeButton = wrapper.find(`[data-testid="dialog-close"]`);
			closeButton.trigger("click");

			expect(resetCopyResultSpy).toHaveBeenCalled();
		});

		describe("getItemTitle method", () => {
			describe("when type is 'file-group'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.FileGroup,
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
					);
				});

				it("should return correct title when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.FileGroup,
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.label.files")
					);
				});
			});

			describe("when type is 'file'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.File,
							title: "file-title",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual("file-title");
				});

				it("should return correct title when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.File,
							title: "file-title",
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual("file-title");
				});
			});

			describe("when type is 'board'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Board,
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.room"));
				});

				it("should return correct titlewhen status is 'partial'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Board,
							status: wrapper.vm.statusEnum.Partial,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.room"));
				});
			});

			describe("when type is 'course'", () => {
				it("should return correct title and status when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Course,
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.room"));
				});

				it("should return correct title when status is 'partial'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Course,
							status: wrapper.vm.statusEnum.Partial,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.room"));
				});
			});

			describe("when type is 'leaf'", () => {
				it("should return correct title when title is 'metadata'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Leaf,
							title: "metadata",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.metadata")
					);
				});

				it("should return correct title when title is 'description'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Leaf,
							title: "description",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.description"));
				});

				it("should return correct title when title is 'coursegroups'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Leaf,
							title: "coursegroups",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.words.courseGroups"));
				});

				it("should return correct title when title is 'submissions'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Leaf,
							title: "submissions",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.submissions"
						)
					);
				});

				it("should return correct title when title is 'times'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Leaf,
							title: "times",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.words.times"));
				});
			});

			describe("when type is 'lesson'", () => {
				it("should return correct title is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Lesson,
							title: "test-lesson",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t("common.words.topics")} - test-lesson`
					);
				});

				it("should return correct title when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Lesson,
							title: "test-lesson",
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t("common.words.topics")} - test-lesson`
					);
				});
			});

			describe("when type is 'task'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Task,
							title: "test-task",
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t("common.words.task")} - test-task`
					);
				});

				it("should return correct title and status when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Task,
							title: "test-task",
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t("common.words.task")} - test-task`
					);
				});
			});

			describe("when type is 'lesson-content'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.LessonContent,
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContent"
						)
					);
				});

				it("should return correct title when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.LessonContent,
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContent"
						)
					);
				});
			});

			describe("when type is 'lesson-content-group'", () => {
				it("should return correct title when status is 'not-implemented'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.LessonContentGroup,
							status: wrapper.vm.statusEnum.NotImplemented,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContentGroup"
						)
					);
				});

				it("should return correct title when status is 'success'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.LessonContentGroup,
							status: wrapper.vm.statusEnum.Success,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContentGroup"
						)
					);
				});
			});
		});

		describe("getItemStatus method", () => {
			it("should return correct feStatus when status is 'success'", () => {
				const wrapper = getWrapper({ isOpen: true, loading: false });
				const method = wrapper.vm.getItemStatus;
				expect(method(wrapper.vm.statusEnum.Success)).toStrictEqual(
					wrapper.vm.statusEnum.Success
				);
			});

			it("should return correct feStatus when status is 'partial'", () => {
				const wrapper = getWrapper({ isOpen: true, loading: false });
				const method = wrapper.vm.getItemStatus;
				expect(method(wrapper.vm.statusEnum.Partial)).toStrictEqual(
					wrapper.vm.statusEnum.Partial
				);
			});

			it("should return correct feStatus when status is 'failure'", () => {
				const wrapper = getWrapper({ isOpen: true, loading: false });
				const method = wrapper.vm.getItemStatus;
				expect(method(wrapper.vm.statusEnum.Failure)).toStrictEqual(
					wrapper.vm.statusEnum.Failure
				);
			});

			it("should return correct feStatus when status is 'not-doing'", () => {
				const wrapper = getWrapper({ isOpen: true, loading: false });
				const method = wrapper.vm.getItemStatus;
				expect(method(wrapper.vm.statusEnum.NotDoing)).toStrictEqual(
					wrapper.vm.statusEnum.Failure
				);
			});

			it("should return correct feStatus when status is 'not-implemented'", () => {
				const wrapper = getWrapper({ isOpen: true, loading: false });
				const method = wrapper.vm.getItemStatus;
				expect(method(wrapper.vm.statusEnum.NotImplemented)).toStrictEqual(
					wrapper.vm.statusEnum.Failure
				);
			});
		});

		it("'prepareCopiedElements' method should prepare the data  ", async () => {
			copyModule.setCopyResult(serverResponseCourseCopy);
			copyModule.setFilteredResult(serverResponseCourseCopy);
			const wrapper = getWrapper({ isOpen: true, loading: false });
			const status = wrapper.vm.statusEnum;
			const types = wrapper.vm.typesEnum;
			const i18n = wrapper.vm.$i18n;

			const expectedData = {
				title: "Mathe",
				type: types.Course,
				status: status.Partial,
				id: "456",
				elements: [
					{
						title: i18n.t("components.molecules.copyResult.metadata"),
						type: types.Leaf,
						status: status.Success,
						feStatus: status.Success,
						index: 1,
					},
					{
						title: i18n.t("common.words.times"),
						type: types.Leaf,
						status: status.NotImplemented,
						feStatus: status.Failure,
						index: 2,
					},
					{
						title: i18n.t("components.molecules.copyResult.fileCopy.error"),
						type: types.FileGroup,
						status: status.NotImplemented,
						feStatus: status.Failure,
						index: 3,
					},
					{
						title: i18n.t("common.words.courseGroups"),
						type: types.Leaf,
						status: status.NotImplemented,
						feStatus: status.Failure,
						index: 4,
					},
					{
						title: i18n.t("common.labels.room"),
						type: types.Board,
						status: status.Success,
						feStatus: status.Success,
						id: "boardId",
						index: 5,
						elements: [
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) ",
								type: types.Task,
								status: status.Success,
								feStatus: status.Success,
								id: "---",
								index: 6,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Leaf,
										status: status.Success,
										feStatus: status.Success,
										index: 7,
									},
									{
										title: i18n.t("common.labels.description"),
										type: types.Leaf,
										status: status.Success,
										feStatus: status.Success,
										index: 8,
									},
								],
							},
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) - offen",
								type: types.Task,
								status: status.Success,
								feStatus: status.Success,
								id: "567890",
								index: 9,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Leaf,
										status: status.Success,
										feStatus: status.Success,
										index: 10,
									},
									{
										title: i18n.t("common.labels.description"),
										type: types.Leaf,
										status: status.Success,
										feStatus: status.Success,
										index: 11,
									},
								],
							},
						],
					},
				],
				index: 0,
			};

			const copiedItems = wrapper.vm.copiedItems;

			expect(copiedItems).toStrictEqual(expectedData);
		});
	});
});
