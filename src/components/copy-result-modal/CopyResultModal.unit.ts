import CopyResultModal from "./CopyResultModal.vue";
import CustomDialog from "@/components/organisms/CustomDialog.vue";
import { CopyApiResponseType } from "@api-server";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

const mockGeoGebraItem = {
	title: "GeoGebra Element Title",
	type: CopyApiResponseType.LESSON_CONTENT_GEOGEBRA,
};
const mockEtherpadItem = {
	title: "Etherpad Element Title",
	type: CopyApiResponseType.LESSON_CONTENT_ETHERPAD,
};
const mockCourseGroupItem = {
	title: "CourseGroup Group Example",
	type: CopyApiResponseType.COURSEGROUP_GROUP,
};
const mockFileItem = {
	title: "File Error Example",
	type: CopyApiResponseType.FILE,
};

const mockLessonResultItems = (elements = [mockGeoGebraItem, mockEtherpadItem, mockCourseGroupItem, mockFileItem]) => [
	{
		type: CopyApiResponseType.LESSON,
		title: "Lesson Title",
		elementId: "mockId",
		elements,
		url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/courseId",
	},
];

describe("@/components/copy-result-modal/CopyResultModal", () => {
	const createWrapper = (options = {}) => {
		const wrapper = mount(CopyResultModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: false,
				copyResultItems: mockLessonResultItems(),
				...options,
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});

	afterEach(() => {
		vi.clearAllMocks();
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

			const dialog = wrapper.findComponent(CustomDialog);
			const title = dialog.findComponent('[data-testid="dialog-title"');

			expect(dialog.vm.isOpen).toBe(false);
			expect(title.exists()).toBe(false);
		});

		it("should be open when is-open property is true", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(CustomDialog);
			const title = dialog.findComponent('[data-testid="dialog-title"');

			expect(dialog.vm.isOpen).toBe(true);
			expect(title.exists()).toBe(true);
		});
	});

	describe("title", () => {
		it("should show partial-title when copy was partially successful", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(CustomDialog);
			const headline = dialog.findComponent('[data-testid="dialog-title"]').text();

			expect(headline).toBe("components.molecules.copyResult.title.partial");
		});
	});

	describe("dialog-closed", () => {
		it("should forward the dialog-closed event of the wrapped dialog", () => {
			const wrapper = createWrapper({ isOpen: true });

			const dialog = wrapper.findComponent(CustomDialog);
			dialog.vm.$emit("dialog-closed");

			expect(wrapper.emitted("copy-dialog-closed")).toHaveLength(1);
		});
	});

	describe("copy result notifications", () => {
		it("should render coursefiles info if root item is a Course and has no failed file ", () => {
			const copyResultItems = mockLessonResultItems([]);

			const wrapper = createWrapper({
				isOpen: true,
				copyResultItems,
				copyResultRootItemType: CopyApiResponseType.COURSE,
			});

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain("components.molecules.copyResult.courseFiles.info");
		});

		describe("when there is no failed file and CTL_TOOLS_COPY feature flag is enabled", () => {
			describe("when the item has element of type external tool", () => {
				const setup = () => {
					createTestEnvStore({ FEATURE_CTL_TOOLS_COPY_ENABLED: true });

					const copyResultItems = mockLessonResultItems([]);
					copyResultItems[0].elements.push({
						title: "Course External Tool",
						type: CopyApiResponseType.EXTERNAL_TOOL,
					});
					copyResultItems[0].type = CopyApiResponseType.COURSE;

					const wrapper = createWrapper({
						isOpen: true,
						copyResultItems,
						copyResultRootItemType: CopyApiResponseType.COURSE,
					});

					return { wrapper };
				};

				it("should show the warning text for non-copyable course external tools", () => {
					const { wrapper } = setup();

					const dialog = wrapper.findComponent(CustomDialog);
					const content = dialog.findComponent(".v-card-text").text();

					expect(content).toContain("components.molecules.copyResult.ctlTools.withFeature.info");
				});
			});

			describe("when there is an item of type ExternalToolElement", () => {
				const setup = () => {
					createTestEnvStore({ FEATURE_CTL_TOOLS_COPY_ENABLED: true });

					const copyResultItems = mockLessonResultItems([]);
					copyResultItems[0].elements.push({
						title: "Board External Tool Element",
						type: CopyApiResponseType.EXTERNAL_TOOL_ELEMENT,
					});
					copyResultItems[0].type = CopyApiResponseType.COURSE;

					const wrapper = createWrapper({
						isOpen: true,
						copyResultItems,
						copyResultRootItemType: CopyApiResponseType.COURSE,
					});

					return { wrapper };
				};

				it("should show the warning text for non-copyable course external tools", () => {
					const { wrapper } = setup();

					const dialog = wrapper.findComponent(CustomDialog);
					const content = dialog.findComponent(".v-card-text").text();

					expect(content).toContain("components.molecules.copyResult.ctlTools.withFeature.info");
				});
			});
		});
	});

	describe("when root element is course", () => {
		const setup = () => {
			const wrapper = mount(CopyResultModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					isOpen: true,
					copyResultItems: [
						{
							type: CopyApiResponseType.COURSE,
							title: "Lesson Title",
							elementId: "mockId",
							elements: [mockGeoGebraItem, mockEtherpadItem, mockCourseGroupItem, mockFileItem],
							url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/courseId",
						},
					],
					copyResultRootItemType: CopyApiResponseType.COURSE,
				},
			});

			return wrapper;
		};

		it("should render members and permission information", () => {
			const wrapper = setup();

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).toContain("components.molecules.copyResult.membersAndPermissions");
		});
	});

	describe("when root element is column board", () => {
		const setup = () => {
			const wrapper = mount(CopyResultModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					isOpen: true,
					copyResultItems: [],
					copyResultRootItemType: CopyApiResponseType.COLUMNBOARD,
				},
			});

			return wrapper;
		};

		it("should not render members and permission information", () => {
			const wrapper = setup();

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).not.toContain("components.molecules.copyResult.membersAndPermissions");
		});
	});

	describe("when root element is room", () => {
		const setup = () => {
			const wrapper = mount(CopyResultModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					isOpen: true,
					copyResultItems: [],
					copyResultRootItemType: CopyApiResponseType.ROOM,
				},
			});

			return wrapper;
		};

		it("should not render members and permission information", () => {
			const wrapper = setup();

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).not.toContain("components.molecules.copyResult.membersAndPermissions");
		});
	});

	describe("when root element is task", () => {
		const setup = () => {
			const wrapper = mount(CopyResultModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					isOpen: true,
					copyResultItems: [],
					copyResultRootItemType: CopyApiResponseType.TASK,
				},
			});

			return wrapper;
		};

		it("should not render members and permission information", () => {
			const wrapper = setup();

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).not.toContain("components.molecules.copyResult.membersAndPermissions");
		});
	});

	describe("when root element is lesson", () => {
		const setup = () => {
			const wrapper = mount(CopyResultModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					isOpen: true,
					copyResultItems: [],
					copyResultRootItemType: CopyApiResponseType.LESSON,
				},
			});

			return wrapper;
		};

		it("should not render members and permission information", () => {
			const wrapper = setup();

			const dialog = wrapper.findComponent(CustomDialog);
			const content = dialog.findComponent(".v-card-text").text();

			expect(content).not.toContain("components.molecules.copyResult.membersAndPermissions");
		});
	});
});
