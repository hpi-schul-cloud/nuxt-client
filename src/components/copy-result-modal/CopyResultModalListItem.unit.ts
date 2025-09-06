import CopyResultModalListItem from "@/components/copy-result-modal/CopyResultModalListItem.vue";
import { CopyResultItem } from "@/components/copy-result-modal/types/CopyResultItem";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

const mockItem: CopyResultItem = {
	type: CopyApiResponseTypeEnum.Lesson,
	title: "Lesson Title",
	elementId: "mockId",
	elements: [
		{
			title: "Geogebra Element Title",
			type: CopyApiResponseTypeEnum.LessonContentGeogebra,
		},
	],

	url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/courseId",
};

const createWrapper = (props: { item: CopyResultItem }) => {
	return mount(CopyResultModalListItem, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
	});
};

describe("@/components/copy-result-modal/CopyResultModalListItem", () => {
	it("Should render component", () => {
		const wrapper = createWrapper({ item: mockItem });

		expect(wrapper.findComponent(CopyResultModalListItem).exists()).toBe(true);
	});

	it("should render the element with the correct element title", () => {
		const wrapper = createWrapper({ item: mockItem });
		const elementTitle = wrapper.find("ul > li").text();

		expect(elementTitle).toContain(
			"components.molecules.copyResult.label.geogebra"
		);
		expect(elementTitle).toContain("Geogebra Element Title");
	});

	it("should render the elements with the correct element title", () => {
		const wrapper = createWrapper({ item: mockItem });
		const elementTitles = wrapper.findAll("ul > li").map((el) => el.text());

		expect(elementTitles[0]).toContain(
			"components.molecules.copyResult.label.geogebra"
		);
		expect(elementTitles[0]).toContain("Geogebra Element Title");
	});

	it("should render the correct link", () => {
		const wrapper = createWrapper({ item: mockItem });
		const parentInfoLink = wrapper.find("a");

		expect(parentInfoLink.text()).toBe("Lesson Title");
		expect(parentInfoLink.attributes("href")).toBe(mockItem.url);
	});

	it("should translate types", () => {
		const wrapper = createWrapper({ item: mockItem });

		const map = [
			[CopyApiResponseTypeEnum.Board, "common.words.learnContent"],
			[
				CopyApiResponseTypeEnum.Content,
				"components.molecules.copyResult.label.content",
			],
			[CopyApiResponseTypeEnum.Course, "common.labels.room"],
			[CopyApiResponseTypeEnum.CoursegroupGroup, "common.words.courseGroups"],
			[
				CopyApiResponseTypeEnum.File,
				"components.molecules.copyResult.label.file",
			],
			[
				CopyApiResponseTypeEnum.FileGroup,
				"components.molecules.copyResult.label.files",
			],
			[
				CopyApiResponseTypeEnum.Leaf,
				"components.molecules.copyResult.label.leaf",
			],
			[
				CopyApiResponseTypeEnum.LernstoreMaterial,
				"components.molecules.copyResult.label.lernstoreMaterial",
			],
			[
				CopyApiResponseTypeEnum.LernstoreMaterialGroup,
				"components.molecules.copyResult.label.lernstoreMaterialGroup",
			],
			[CopyApiResponseTypeEnum.Lesson, "common.words.topic"],
			[
				CopyApiResponseTypeEnum.LessonContentGeogebra,
				"components.molecules.copyResult.label.geogebra",
			],
			[
				CopyApiResponseTypeEnum.LessonContentEtherpad,
				"components.molecules.copyResult.label.etherpad",
			],
			[
				CopyApiResponseTypeEnum.LessonContentText,
				"components.molecules.copyResult.label.text",
			],
			[
				CopyApiResponseTypeEnum.LessonContentLernstore,
				"common.words.lernstore",
			],
			[CopyApiResponseTypeEnum.LessonContentTask, "common.words.task"],
			[
				CopyApiResponseTypeEnum.LessonContentGroup,
				"components.molecules.copyResult.label.lessonContentGroup",
			],
			[
				CopyApiResponseTypeEnum.Metadata,
				"components.molecules.copyResult.metadata",
			],
			[
				CopyApiResponseTypeEnum.SubmissionGroup,
				"components.molecules.copyResult.label.submissions",
			],
			[CopyApiResponseTypeEnum.Task, "common.words.task"],
			[CopyApiResponseTypeEnum.TaskGroup, "common.words.tasks"],
			[
				CopyApiResponseTypeEnum.TimeGroup,
				"components.molecules.copyResult.label.timeGroup",
			],
			[
				CopyApiResponseTypeEnum.UserGroup,
				"components.molecules.copyResult.label.userGroup",
			],
			[
				"some-string-that-is-not-an-existing-type",
				"components.molecules.copyResult.label.unknown",
			],
			[
				CopyApiResponseTypeEnum.CollaborativeTextEditorElement,
				"components.molecules.copyResult.label.etherpad",
			],
			[
				CopyApiResponseTypeEnum.ExternalToolElement,
				"components.molecules.copyResult.label.toolElements",
			],
		];

		map.forEach(([constant, languageConstant]) => {
			expect(wrapper.vm.getElementTypeName(constant)).toBe(languageConstant);
		});
	});
});
