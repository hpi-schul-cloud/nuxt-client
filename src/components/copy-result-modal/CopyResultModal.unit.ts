import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import CopyResultModal from "./CopyResultModal.vue";

const defaultResultItems = [
	{
		type: CopyApiResponseTypeEnum.Lesson,
		title: "Lesson Title",
		elementId: "mockId",
		elements: [
			{
				title: "Geogebra Element Title",
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

const getWrapper = (props?: any) => {
	return mount<any>(CopyResultModal, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: {
			isLoading: false,
			copyResultItems: defaultResultItems,
			...props,
		},
	});
};
describe("@components/copy-result-modal/CopyResultModal", () => {
	describe("basic functions", () => {
		it("Should render component", () => {
			const wrapper = getWrapper();

			expect(wrapper.findComponent(CopyResultModal).exists()).toBe(true);
		});
	});

	describe("isOpen", () => {
		it("should open the dialog during loading", () => {
			const wrapper = getWrapper({ isLoading: true });

			expect(wrapper.vm.isOpen).toBe(true);
		});

		it("should open the dialog if copy results exist", () => {
			const wrapper = getWrapper({
				copyResultStatus: "partial",
			});

			expect(wrapper.vm.isOpen).toBe(true);
		});

		it("should close the dialog if copy results is undefined and no data being loaded", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: undefined,
			});

			expect(wrapper.vm.isOpen).toBe(false);
		});
	});

	describe("hasNotification", () => {
		const setupWrapper = () => {
			return getWrapper({
				isLoading: false,
				copyResultStatus: "partial",
				copyResultItems: defaultResultItems,
			});
		};

		it("should show geogebra notification if failed geogebra element exists", () => {
			const geogebraNotification = setupWrapper().find(
				`[data-testid="copy-result-notifications"] [data-testid="geogebra"]`
			);

			expect(geogebraNotification.isVisible()).toBe(true);
		});

		it("should show etherpad notification if failed etherpad element exists", () => {
			const etherpadNotification = setupWrapper().find(
				`[data-testid="copy-result-notifications"] [data-testid="etherpad"]`
			);

			expect(etherpadNotification.isVisible()).toBe(true);
		});

		it("should show coursegroup notification if failed coursegroup element exists", () => {
			const courseGroupNotification = setupWrapper().find(
				`[data-testid="copy-result-notifications"] [data-testid="coursegroups"]`
			);

			expect(courseGroupNotification.isVisible()).toBe(true);
		});

		it("should show coursegroup notification if file error element exists", () => {
			const courseGroupNotification = setupWrapper().find(
				`[data-testid="copy-result-notifications"] [data-testid="files"]`
			);

			expect(courseGroupNotification.isVisible()).toBe(true);
		});
	});

	describe("skeleton loader", () => {
		it("should show skeleton loader, if copy process runs and isLoading is true", () => {
			const wrapper = getWrapper({
				isLoading: true,
				copyResultStatus: undefined,
			});

			const skeletonLoader = wrapper.find(
				`[data-testid="copy-process-skeleton"]`
			);

			expect(skeletonLoader.isVisible()).toBe(true);
		});
	});

	describe("title", () => {
		it("should show loading-title during loading", () => {
			const wrapper = getWrapper({
				isLoading: true,
				copyResultStatus: undefined,
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.loading")
			);
		});

		it("should show -title when ", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "success",
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.success")
			);
		});

		it("should show -title when ", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "partial",
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.partial")
			);
		});

		it("should show -title when ", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "failure",
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.failure")
			);
		});
	});

	describe("dialog-closed", () => {
		it("should emit dialog-closed if user closed dialog", async () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "partial",
			});
			const closeButton = wrapper.find('[data-testId="dialog-close"]');
			closeButton.trigger("click");
			await wrapper.vm.$nextTick();

			const emittedEvents = wrapper.emitted();
			const dialogClosedEvents = emittedEvents["dialog-closed"];
			expect(dialogClosedEvents?.length).toBe(1);
		});
	});

	// wip: success
	// wip: failed
});
