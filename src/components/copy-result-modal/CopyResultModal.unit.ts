import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import CopyResultModal from "./CopyResultModal.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import { envConfigModule } from "@/store";
import { Envs } from "@/store/types/env-config";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

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

/* const getWrapper = (props?: any) => {
	const wrapper = mount<any>(CopyResultModal as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: {
			isLoading: false,
			copyResultItems: mockResultItems(),
			...props,
		},
	});

	return wrapper;
}; */

describe("@/components/copy-result-modal/CopyResultModal", () => {
	const createWrapper = (options: ComponentMountingOptions<typeof CopyResultModal> = {}) => {
		const wrapper = mount(CopyResultModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: false,
				...options,
			},
			mocks: {
				copyResultItems: mockResultItems(),
			}
		});

		return wrapper;
	};

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
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

			expect(wrapper.findComponent(".v-dialog__content").exists()).toBe(false);
		});

		it("should be open when is-open property is true", () => {
			const wrapper = createWrapper({ isOpen: true });

			expect(wrapper.findComponent(".v-dialog__content").exists()).toBe(true);
		});
	});

	describe("title", () => {
		it("should show partial-title when copy was partially successful", () => {
			const wrapper = createWrapper({ isOpen: true });

			const headline = wrapper.findComponent('[data-testid="dialog-title"]').text();

			expect(headline).toBe("components.molecules.copyResult.title.partial");
		});
	});

	describe("dialog-closed", () => {
		it("should forward the dialog-closed event of the wrapped dialog", async () => {
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

			expect(
				wrapper.findComponent('[data-testid="copy-result-notifications"]').text()
			).toContain(
				createTestingI18n("components.molecules.copyResult.courseFiles.info")
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

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(
				createTestingI18n("components.molecules.copyResult.ctlTools.info")
			);
		});

		it("should merge file error and coursefiles info if root item is a Course and has a failed file ", () => {
			const copyResultItems = mockResultItems([mockFileItem]);

			const wrapper = createWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(
				createTestingI18n("components.molecules.copyResult.courseFiles.info") +
					" " +
					createTestingI18n("components.molecules.copyResult.fileCopy.error")
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

				expect(
					wrapper.find('[data-testid="copy-result-notifications"]').text()
				).toContain(
					createTestingI18n("components.molecules.copyResult.fileCopy.error")
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
			const copyResultItems = mockResultItems();
			copyResultItems[0].elements = [
				{
					title,
					type,
				},
			];

			const wrapper = createWrapper({ isOpen: true, copyResultItems });

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(title);
		});
	});
});