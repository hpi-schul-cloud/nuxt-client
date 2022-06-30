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
		{ title: "files", type: "file", status: "not-implemented" },
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
				Task: "task",
				Lesson: "lesson",
				Course: "course",
				Board: "board",
				File: "file",
				Leaf: "leaf",
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
						status: "success-all",
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

		it("'getItemTitleAndStatus' method should return a correct title and status", async () => {
			const wrapper = getWrapper({ isOpen: true, loading: false });
			await wrapper.vm.$nextTick();
			const status = wrapper.vm.statusEnum;
			const types = wrapper.vm.typesEnum;

			const method = wrapper.vm.getItemTitleAndStatus;

			expect(
				method({
					type: types.File,
					title: "files",
					status: status.NotImplemented,
				}).status
			).toStrictEqual("failure");
			expect(
				method({
					type: types.File,
					title: "files",
					status: status.NotImplemented,
				}).title
			).toStrictEqual(
				wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
			);

			expect(
				method({
					type: types.Lesson,
					title: "lesson-1",
					status: status.NotImplemented,
				}).status
			).toStrictEqual(status.Failure);
			expect(
				method({
					type: types.Lesson,
					title: "lesson-1",
					status: status.NotImplemented,
				}).title
			).toStrictEqual(
				`${wrapper.vm.$i18n.t("common.words.topics")} - lesson-1`
			);

			expect(
				method({
					type: types.Task,
					title: "task-1",
					status: status.NotImplemented,
				}).status
			).toStrictEqual(status.Failure);
			expect(
				method({
					type: types.Task,
					title: "task-1",
					status: status.NotImplemented,
				}).title
			).toStrictEqual(`${wrapper.vm.$i18n.t("common.words.task")} - task-1`);

			expect(
				method({ type: types.Leaf, title: "metadata", status: status.Success })
					.status
			).toStrictEqual(status.Success);
			expect(
				method({ type: types.Leaf, title: "metadata", status: status.Success })
					.title
			).toStrictEqual(
				wrapper.vm.$i18n.t("components.molecules.copyResult.metadata")
			);

			expect(
				method({
					type: types.Leaf,
					title: "description",
					status: status.Success,
				}).status
			).toStrictEqual(status.Success);
			expect(
				method({
					type: types.Leaf,
					title: "description",
					status: status.Success,
				}).title
			).toStrictEqual(wrapper.vm.$i18n.t("common.labels.description"));
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
						index: 1,
					},
					{
						title: i18n.t("common.words.times"),
						type: types.Leaf,
						status: status.Failure,
						index: 2,
					},
					{
						title: i18n.t("components.molecules.copyResult.fileCopy.error"),
						type: types.File,
						status: status.Failure,
						index: 3,
					},
					{
						title: i18n.t("common.words.courseGroups"),
						type: types.Leaf,
						status: status.Failure,
						index: 4,
					},
					{
						title: i18n.t("common.labels.room"),
						type: types.Board,
						status: status.Failure,
						id: "boardId",
						index: 5,
						elements: [
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) ",
								type: types.Task,
								status: status.Success,
								id: "---",
								index: 6,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Leaf,
										status: status.Success,
										index: 7,
									},
									{
										title: i18n.t("common.labels.description"),
										type: types.Leaf,
										status: status.Success,
										index: 8,
									},
								],
							},
							{
								title: "Aufgabe - Aufgabe an Marla (Mathe) - offen",
								type: types.Task,
								status: status.Success,
								id: "567890",
								index: 9,
								elements: [
									{
										title: i18n.t("components.molecules.copyResult.metadata"),
										type: types.Leaf,
										status: status.Success,
										index: 10,
									},
									{
										title: i18n.t("common.labels.description"),
										type: types.Leaf,
										status: status.Success,
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
			expect(copiedItems.elements[0].title).toStrictEqual(
				i18n.t("components.molecules.copyResult.metadata")
			);
			expect(copiedItems.elements[1].title).toStrictEqual(
				wrapper.vm.$i18n.t("common.words.times")
			);
			expect(copiedItems.elements[1].status).toStrictEqual(status.Failure);
			expect(copiedItems.elements[2].title).toStrictEqual(
				wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
			);
			expect(copiedItems.elements[2].status).toStrictEqual(status.Failure);
			expect(copiedItems.elements[3].title).toStrictEqual(
				wrapper.vm.$i18n.t("common.words.courseGroups")
			);
			expect(copiedItems.elements[3].status).toStrictEqual(status.Failure);
			expect(copiedItems.elements[4].elements[0].elements).toHaveLength(2);
		});
	});
});
