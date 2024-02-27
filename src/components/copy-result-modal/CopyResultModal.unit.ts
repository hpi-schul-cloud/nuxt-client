import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { mount } from "@vue/test-utils";
import CopyResultModal from "./CopyResultModal.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { Envs } from "@/store/types/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const mockGeoGebraItem = {
	title: "GeoGebra Element Title",
	type: CopyApiResponseTypeEnum.LessonContentGeogebra,
};
const mockEtherpadItem = {
	title: "Etherpad Element Title",
	type: CopyApiResponseTypeEnum.LessonContentEtherpad,
};
const mockNexboardItem = {
	title: "Nexboard Element Title",
	type: CopyApiResponseTypeEnum.LessonContentNexboard,
};
const mockCourseGroupItem = {
	title: "CourseGroup Group Example",
	type: CopyApiResponseTypeEnum.CoursegroupGroup,
};
const mockFileItem = {
	title: "File Error Example",
	type: CopyApiResponseTypeEnum.File,
};

const mockResultItems = (
	elements = [
		mockGeoGebraItem,
		mockEtherpadItem,
		mockNexboardItem,
		mockCourseGroupItem,
		mockFileItem,
	]
) => {
	return [
		{
			type: CopyApiResponseTypeEnum.Lesson,
			title: "Lesson Title",
			elementId: "mockId",
			elements,
			url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/courseId",
		},
	];
};

describe("@/components/copy-result-modal/CopyResultModal", () => {
	const createWrapper = (options = {}) => {
		const wrapper = mount(CopyResultModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: false,
				copyResultItems: mockResultItems(),
				...options,
			},
		});

		return wrapper;
	};

	beforeAll(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("basic functions", () => {
		it("Should render component", () => {
			const wrapper = createWrapper();

			expect(wrapper.findComponent(CopyResultModal).exists()).toBe(true);
		});
	});

	describe("isOpen", () => {
		it("should be closed by default", () => {
			const wrapper = createWrapper();

			const dialog = wrapper.findComponent(vCustomDialog);
			const title = dialog.findComponent('[data-testid="dialog-title"');

			expect(dialog.vm.isOpen).toBe(false);
			expect(title.exists()).toBe(false);
		});

		it("should be open when is-open property is true", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(vCustomDialog);
			const title = dialog.findComponent('[data-testid="dialog-title"');

			expect(dialog.vm.isOpen).toBe(true);
			expect(title.exists()).toBe(true);
		});
	});

	describe("title", () => {
		it("should show partial-title when copy was partially successful", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(vCustomDialog);
			const headline = dialog
				.findComponent('[data-testid="dialog-title"]')
				.text();

			expect(headline).toBe("components.molecules.copyResult.title.partial");
		});
	});

	describe("dialog-closed", () => {
		it("should forward the dialog-closed event of the wrapped dialog", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(vCustomDialog);
			dialog.vm.$emit("dialog-closed");

			expect(wrapper.emitted("dialog-closed")).toHaveLength(1);
		});
	});

	describe("copy result notifications", () => {
		it("should render coursefiles info if root item is a Course and has no failed file ", () => {
			const copyResultItems = mockResultItems([]);

			const wrapper = createWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			const dialog = wrapper.findComponent(vCustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain(
				"components.molecules.copyResult.courseFiles.info"
			);
		});

		it("should render ctl tools info if root item is a Course and has no failed file ", () => {
			const copyResultItems = mockResultItems([]);
			envConfigModule.setEnvs({ FEATURE_CTL_TOOLS_TAB_ENABLED: true } as Envs);
			const wrapper = createWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			const dialog = wrapper.findComponent(vCustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain(
				"components.molecules.copyResult.ctlTools.info"
			);
		});

		describe("when root item is a Course, has no failed file and CTL_TOOLS_COPY feature flag is enabled", () => {
			const setup = () => {
				const copyResultItems = mockResultItems([]);
				const wrapper = createWrapper({
					isOpen: true,
					copyResultItems,
					copyResultRootItemType: CopyApiResponseTypeEnum.Course,
				});

				return { wrapper };
			};

			it("should render ctl tools copy info ", () => {
				envConfigModule.setEnvs({
					FEATURE_CTL_TOOLS_TAB_ENABLED: true,
					FEATURE_CTL_TOOLS_COPY_ENABLED: true,
				} as Envs);
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(vCustomDialog);
				const content = dialog.findComponent(".v-card-text").text();

				expect(content).toContain(
					"components.molecules.copyResult.ctlTools.withFeature.info"
				);
			});
		});

		it("should merge file error and coursefiles info if root item is a Course and has a failed file ", () => {
			const copyResultItems = mockResultItems([mockFileItem]);

			const wrapper = createWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			const dialog = wrapper.findComponent(vCustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain(
				"components.molecules.copyResult.courseFiles.info" +
					" " +
					"components.molecules.copyResult.fileCopy.error"
			);
		});

		it.each([[CopyApiResponseTypeEnum.Lesson], [CopyApiResponseTypeEnum.Task]])(
			"should render file error info if root item is a %s and has a failed file",
			(copyResultRootItemType) => {
				const copyResultItems = mockResultItems([mockFileItem]);

				const wrapper = createWrapper({
					isOpen: true,
					copyResultItems,
					copyResultRootItemType,
				});

				const dialog = wrapper.findComponent(vCustomDialog);
				const content = dialog.findComponent(".v-card-text").text();

				expect(content).toContain(
					"components.molecules.copyResult.fileCopy.error"
				);
			}
		);

		it.each([
			["GeoGebra", CopyApiResponseTypeEnum.LessonContentGeogebra],
			["Etherpad", CopyApiResponseTypeEnum.LessonContentEtherpad],
			["NeXboard", CopyApiResponseTypeEnum.LessonContentNexboard],
			["Kursgruppen", CopyApiResponseTypeEnum.CoursegroupGroup],
			["Dateien", CopyApiResponseTypeEnum.File],
		])("should render if there is a %s item", (title, type) => {
			envConfigModule.setEnvs({
				FEATURE_NEXBOARD_COPY_ENABLED: true,
			} as Envs);
			const copyResultItems = mockResultItems();
			copyResultItems[0].elements = [
				{
					title,
					type,
				},
			];

			const wrapper = createWrapper({ isOpen: true, copyResultItems });

			const dialog = wrapper.findComponent(vCustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain(title);
		});
	});
});
