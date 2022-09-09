import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
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

		it("should open the dialog if timeout occurs", () => {
			const wrapper = getWrapper({
				copyResultError: { statusCode: "504", message: "" },
			});

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
	describe("status alerts", () => {
		describe("success", () => {
			it("should render success alert if status is success", async () => {
				const wrapper = getWrapper({
					isLoading: false,
					copyResultStatus: "success",
				});
				const successMessage = wrapper.find('[data-testId="success-alert"]')
					.element.textContent;

				expect(successMessage).toContain(
					wrapper.vm.$i18n.t(
						"components.molecules.copyResult.successfullyCopied"
					)
				);
			});
		});

		describe("timeout", () => {
			it("should render warning alert if copy result error is 405", async () => {
				const wrapper = getWrapper({
					copyResultError: { statusCode: "504", message: "" },
				});
				const timeoutMessage = wrapper.find('[data-testId="timeout-alert"]')
					.element.textContent;

				expect(timeoutMessage).toContain(
					wrapper.vm.$i18n.t("components.molecules.copyResult.timeoutCopy")
				);
			});
		});

		describe("failure", () => {
			it("should render error alert if status is failure", async () => {
				const wrapper = getWrapper({
					isLoading: false,
					copyResultStatus: "failure",
				});

				const failureMessage = wrapper.find('[data-testId="failure-alert"]')
					.element.textContent;

				expect(failureMessage).toContain(
					wrapper.vm.$i18n.t("components.molecules.copyResult.failedCopy")
				);
			});
		});

		describe("timeout", () => {
			it("should render success alert if status is success", async () => {
				const wrapper = getWrapper({
					isLoading: false,
					copyResultStatus: "success",
				});
				const successMessage = wrapper.find('[data-testId="success-alert"]')
					.element.textContent;

				expect(successMessage).toContain(
					wrapper.vm.$i18n.t(
						"components.molecules.copyResult.successfullyCopied"
					)
				);
			});
		});

		describe("partial - needsInfoText", () => {
			const setupWrapper = () => {
				return getWrapper({
					isLoading: false,
					copyResultStatus: "partial",
					copyResultItems: defaultResultItems,
				});
			};

			it("should show geogebra notification if partial geogebra element exists", () => {
				const geogebraNotification = setupWrapper().find(
					`[data-testid="copy-result-notifications"] [data-testid="geogebra"]`
				);

				expect(geogebraNotification.isVisible()).toBe(true);
			});

			it("should show etherpad notification if partial etherpad element exists", () => {
				const etherpadNotification = setupWrapper().find(
					`[data-testid="copy-result-notifications"] [data-testid="etherpad"]`
				);

				expect(etherpadNotification.isVisible()).toBe(true);
			});

			it("should show nexboard notification if partial nexboard element exists", () => {
				const nexboardNotification = setupWrapper().find(
					`[data-testid="copy-result-notifications"] [data-testid="nexboard"]`
				);

				expect(nexboardNotification.isVisible()).toBe(true);
			});

			it("should show coursegroup notification if coursegroup element exists", () => {
				const courseGroupNotification = setupWrapper().find(
					`[data-testid="copy-result-notifications"] [data-testid="coursegroups"]`
				);

				expect(courseGroupNotification.isVisible()).toBe(true);
			});

			it("should show file notification if file error element exists", () => {
				const fileNotification = setupWrapper().find(
					`[data-testid="copy-result-notifications"] [data-testid="files"]`
				);

				expect(fileNotification.isVisible()).toBe(true);
			});
		});
	});

	describe("skeleton loader", () => {
		it("should show skeleton loader, if copy process runs and isLoading is true", () => {
			const wrapper = getWrapper({
				isLoading: true,
				copyResultStatus: undefined,
			});

			const skeletonLoader = wrapper.find(`[data-testid="copy-skeleton"]`);

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

		it("should show loading-title during timeout", () => {
			const wrapper = getWrapper({
				copyResultError: { statusCode: 504, message: "" },
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.loading")
			);
		});

		it("should show success-title when copy was successful", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "success",
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.success")
			);
		});

		it("should show partial-title when copy was partially successful", () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "partial",
			});
			const headline = wrapper.find("h2").element.textContent;

			expect(headline).toContain(
				wrapper.vm.$i18n.t("components.molecules.copyResult.title.partial")
			);
		});

		it("should show failure-title when copy failed", () => {
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
		it("should forward the dialog-closed event of the wrapped dialog", async () => {
			const wrapper = getWrapper({
				isLoading: false,
				copyResultStatus: "partial",
			});

			const dialog = wrapper.findComponent(vCustomDialog);
			dialog.vm.$emit("dialog-closed");

			const emittedEvents = wrapper.emitted();
			const dialogClosedEvents = emittedEvents["dialog-closed"];
			expect(dialogClosedEvents?.length).toBe(1);
		});
	});
});
