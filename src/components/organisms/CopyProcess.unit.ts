import { mount } from "@vue/test-utils";
import { copyModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import CopyModule from "@/store/copy-process";
import CopyProcess from "./CopyProcess.vue";

declare let createComponentMocks: Function;

const serverResponseAllSuccess = {
	title: "Success-Title",
	type: "TASK",
	status: "success",
	id: "success-id-123",
	elements: [
		{ type: "METADATA", status: "success" },
		{ type: "SUBMISSION_GROUP", status: "not-doing" },
	],
};

const serverResponseCourseCopy = {
	title: "Mathe",
	type: "COURSE",
	status: "partial",
	id: "456",
	elements: [
		{ type: "METADATA", status: "success" },
		{ type: "LEAF", status: "not-doing" },
		{ type: "LEAF", status: "not-doing" },
		{ type: "LEAF", status: "not-doing" },
		{ type: "LEAF", status: "not-doing" },
		{ type: "LEAF", status: "not-doing" },
		{ type: "FILE_GROUP", status: "not-implemented" },
		{
			type: "COURSEGROUP_GROUP",
			status: "not-implemented",
		},
		{
			type: "BOARD",
			status: "failure",
			id: "boardId",
			elements: [
				{
					title: "Aufgabe an Marla (Mathe) ",
					type: "TASK",
					status: "success",
					id: "---",
					elements: [
						{ type: "METADATA", status: "success" },
						{ type: "SUBMISSION_GROUP", status: "not-doing" },
					],
				},
				{
					title: "Aufgabe an Marla (Mathe) - offen",
					type: "TASK",
					status: "success",
					id: "567890",
					elements: [
						{ type: "METADATA", status: "success" },
						{ type: "SUBMISSION_GROUP", status: "not-doing" },
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

		it("'typesEnum' should return the types object", () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });
			const expectedTypes = {
				Board: "BOARD",
				Content: "CONTENT",
				Course: "COURSE",
				CoursegroupGroup: "COURSEGROUP_GROUP",
				File: "FILE",
				FileGroup: "FILE_GROUP",
				Leaf: "LEAF",
				Lesson: "LESSON",
				LessonContent: "LESSON_CONTENT",
				LessonContentGroup: "LESSON_CONTENT_GROUP",
				LtitoolGroup: "LTITOOL_GROUP",
				Metadata: "METADATA",
				SubmissionGroup: "SUBMISSION_GROUP",
				Task: "TASK",
				TimeGroup: "TIME_GROUP",
				UserGroup: "USER_GROUP",
			};

			expect(wrapper.vm.typesEnum).toStrictEqual(expectedTypes);
		});

		it("'statusEnum' should return the types object", () => {
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
			describe("should return the correct title", () => {
				it("when type is 'BOARD'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Board,
						})
					).toStrictEqual(wrapper.vm.$i18n.t("common.labels.room"));
				});

				it("when type is 'CONTENT'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Content,
						})
					).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.label.content")
					);
				});

				it("when type is 'COURSE'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(method({ type: wrapper.vm.typesEnum.Course })).toStrictEqual(
						wrapper.vm.$i18n.t("common.labels.room")
					);
				});

				it("when type is 'COURSEGROUP_GROUP", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.CoursegroupGroup })
					).toStrictEqual(wrapper.vm.$i18n.t("common.words.courseGroups"));
				});

				it("when type is 'FILE'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.File,
							title: "file-title",
						})
					).toStrictEqual("file-title");
				});

				describe("when type is 'FILE_GROUP'", () => {
					it("when status is 'not-implemented'", () => {
						const wrapper = getWrapper({ isOpen: true, loading: false });
						const method = wrapper.vm.getItemTitle;
						expect(
							method({
								type: wrapper.vm.typesEnum.FileGroup,
								status: wrapper.vm.statusEnum.NotImplemented,
							})
						).toStrictEqual(
							wrapper.vm.$i18n.t(
								"components.molecules.copyResult.fileCopy.error"
							)
						);
					});

					it("when status is 'success'", () => {
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

				it("when type is 'LEAF'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(method({ type: wrapper.vm.typesEnum.Leaf })).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.label.leaf")
					);
				});

				it("when type is 'LESSON'", () => {
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

				it("when type is 'LESSON_CONTENT'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.LessonContent,
							title: "lesson-content",
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContent"
						)} - lesson-content`
					);
				});

				it("when type is 'LESSON_CONTENT_GROUP'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.LessonContentGroup })
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.lessonContentGroup"
						)
					);
				});

				it("when type is 'LTITOOL_GROUP'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.LtitoolGroup })
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.ltiToolsGroup"
						)
					);
				});

				it("when type is 'METADATA'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(method({ type: wrapper.vm.typesEnum.Metadata })).toStrictEqual(
						wrapper.vm.$i18n.t("components.molecules.copyResult.metadata")
					);
				});

				it("when type is 'SUBMISSION_GROUP'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.SubmissionGroup })
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.submissions"
						)
					);
				});

				it("when type is 'TASK'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({
							type: wrapper.vm.typesEnum.Task,
							title: "test-task",
						})
					).toStrictEqual(
						`${wrapper.vm.$i18n.t("common.words.task")} - test-task`
					);
				});

				it("when type is 'TIME_GROUP'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.TimeGroup })
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.timeGroup"
						)
					);
				});

				it("when type is 'USER_GROUP'", () => {
					const wrapper = getWrapper({ isOpen: true, loading: false });
					const method = wrapper.vm.getItemTitle;
					expect(
						method({ type: wrapper.vm.typesEnum.UserGroup })
					).toStrictEqual(
						wrapper.vm.$i18n.t(
							"components.molecules.copyResult.label.userGroup"
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
						type: types.Metadata,
						status: status.Success,
						feStatus: status.Success,
						index: 1,
					},

					{
						title: i18n.t("components.molecules.copyResult.fileCopy.error"),
						type: types.FileGroup,
						status: status.NotImplemented,
						feStatus: status.Failure,
						index: 2,
					},
					{
						title: i18n.t("common.words.courseGroups"),
						type: types.CoursegroupGroup,
						status: status.NotImplemented,
						feStatus: status.Failure,
						index: 3,
					},
					{
						title: i18n.t("common.labels.room"),
						type: types.Board,
						status: status.Success,
						feStatus: status.Success,
						id: "boardId",
						index: 4,
						elements: [
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) ",
								type: types.Task,
								status: status.Success,
								feStatus: status.Success,
								id: "---",
								index: 5,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Metadata,
										status: status.Success,
										feStatus: status.Success,
										index: 6,
									},
								],
							},
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) - offen",
								type: types.Task,
								status: status.Success,
								feStatus: status.Success,
								id: "567890",
								index: 7,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Metadata,
										status: status.Success,
										feStatus: status.Success,
										index: 8,
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
