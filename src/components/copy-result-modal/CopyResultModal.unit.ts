import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mount } from "@vue/test-utils";
import CopyResultModal from "./CopyResultModal.vue";

const geoGebraItem = {
	title: "GeoGebra Element Title",
	type: CopyApiResponseTypeEnum.LessonContentGeogebra,
};
const etherpadItem = {
	title: "Etherpad Element Title",
	type: CopyApiResponseTypeEnum.LessonContentEtherpad,
};
const nexboardItem = {
	title: "Nexboard Element Title",
	type: CopyApiResponseTypeEnum.LessonContentNexboard,
};
const courseGroupItem = {
	title: "CourseGroup Group Example",
	type: CopyApiResponseTypeEnum.CoursegroupGroup,
};
const fileItem = {
	title: "File Error Example",
	type: CopyApiResponseTypeEnum.File,
};

const mockResultItems = (
	elements = [
		geoGebraItem,
		etherpadItem,
		nexboardItem,
		courseGroupItem,
		fileItem,
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

const getWrapper = (props?: any) => {
	return mount<any>(CopyResultModal, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: {
			isLoading: false,
			copyResultItems: mockResultItems(),
			...props,
		},
	});
};

describe("@components/copy-result-modal/CopyResultModal", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	describe("basic functions", () => {
		it("Should render component", () => {
			const wrapper = getWrapper();

			expect(wrapper.findComponent(CopyResultModal).exists()).toBe(true);
		});
	});

	describe("isOpen", () => {
		it("should be closed by default", () => {
			const wrapper = getWrapper();

			expect(wrapper.find(".v-dialog__content").exists()).toBe(false);
		});

		it("should be open when is-open property is true", () => {
			const wrapper = getWrapper({ isOpen: true });

			expect(wrapper.find(".v-dialog__content").exists()).toBe(true);
		});
	});

	describe("title", () => {
		it("should show partial-title when copy was partially successful", () => {
			const wrapper = getWrapper({ isOpen: true });

			const headline = wrapper.find('[data-testid="dialog-title"]').text();

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.partial")
			);
		});
	});

	describe("dialog-closed", () => {
		it("should forward the dialog-closed event of the wrapped dialog", async () => {
			const wrapper = getWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(vCustomDialog);
			dialog.vm.$emit("dialog-closed");

			expect(wrapper.emitted("dialog-closed")).toHaveLength(1);
		});
	});

	describe("copy result notifications", () => {
		it("should render coursefiles info if root item is a Course and has no failed file ", () => {
			const copyResultItems = mockResultItems([]);

			const wrapper = getWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.courseFiles.info")
			);
		});

		it("should merge file error and coursefiles info if root item is a Course and has a failed file ", () => {
			const copyResultItems = mockResultItems([fileItem]);

			const wrapper = getWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseTypeEnum.Course,
			});

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.courseFiles.info") +
					" " +
					wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
			);
		});

		it.each([[CopyApiResponseTypeEnum.Lesson], [CopyApiResponseTypeEnum.Task]])(
			"should render file error info if root item is a %s and has a failed file",
			(copyResultRootItemType) => {
				const copyResultItems = mockResultItems([fileItem]);

				const wrapper = getWrapper({
					isOpen: true,
					copyResultItems,
					copyResultRootItemType,
				});

				expect(
					wrapper.find('[data-testid="copy-result-notifications"]').text()
				).toContain(
					wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
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

			const wrapper = getWrapper({ isOpen: true, copyResultItems });

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').text()
			).toContain(title);
		});
	});
});
