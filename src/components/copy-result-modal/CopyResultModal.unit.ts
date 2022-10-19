import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { mount } from "@vue/test-utils";
import CopyResultModal from "./CopyResultModal.vue";

const defaultResultItems = () => {
	return [
		{
			type: CopyApiResponseTypeEnum.Lesson,
			title: "Lesson Title",
			elementId: "mockId",
			elements: [
				{
					title: "GeoGebra Element Title",
					type: CopyApiResponseTypeEnum.LessonContentGeogebra,
				},
				{
					title: "Etherpad Element Title",
					type: CopyApiResponseTypeEnum.LessonContentEtherpad,
				},
				{
					title: "Nexboard Element Title",
					type: CopyApiResponseTypeEnum.LessonContentNexboard,
				},
				{
					title: "CourseGroup Group Example",
					type: CopyApiResponseTypeEnum.CoursegroupGroup,
				},
				{
					title: "File Error Example",
					type: CopyApiResponseTypeEnum.File,
				},
			],
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
			copyResultItems: defaultResultItems(),
			...props,
		},
	});
};

describe("@/components/copy-result-modal/CopyResultModal", () => {
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
		it("should not render by default", () => {
			const copyResultItems = defaultResultItems();
			copyResultItems[0].elements = [];

			const wrapper = getWrapper({ isOpen: true, copyResultItems });

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').exists()
			).toBe(false);
		});

		// WIP make test titles work in Jest + VSCode
		it.each([
			["GeoGebra", CopyApiResponseTypeEnum.LessonContentGeogebra],
			["Etherpad", CopyApiResponseTypeEnum.LessonContentEtherpad],
			["NeXboard", CopyApiResponseTypeEnum.LessonContentNexboard],
			["Kursgruppen", CopyApiResponseTypeEnum.CoursegroupGroup],
			["File Error", CopyApiResponseTypeEnum.File],
		])("should render if there is a typed notification", (title, type) => {
			const copyResultItems = defaultResultItems();
			copyResultItems[0].elements = [
				{
					title,
					type,
				},
			];

			const wrapper = getWrapper({ isOpen: true, copyResultItems });

			expect(
				wrapper.find('[data-testid="copy-result-notifications"]').exists()
			).toBe(true);
		});

		// WIP make test titles work in Jest + VSCode
		it.each([
			["GeoGebra", CopyApiResponseTypeEnum.LessonContentGeogebra],
			["Etherpad", CopyApiResponseTypeEnum.LessonContentEtherpad],
			["NeXboard", CopyApiResponseTypeEnum.LessonContentNexboard],
			["Kursgruppen", CopyApiResponseTypeEnum.CoursegroupGroup],
			["Dateien", CopyApiResponseTypeEnum.File],
		])("should render if there is a typed notification item", (title, type) => {
			const copyResultItems = defaultResultItems();
			copyResultItems[0].elements = [
				{
					title,
					type,
				},
			];

			const wrapper = getWrapper({ isOpen: true, copyResultItems });

			expect(wrapper.find('[data-testid="warning-title"]').text()).toContain(
				title
			);
		});
	});
});
