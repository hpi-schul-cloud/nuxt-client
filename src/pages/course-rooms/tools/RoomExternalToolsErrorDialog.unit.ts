import RoomExternalToolsErrorDialog from "@/pages/course-rooms/tools/RoomExternalToolsErrorDialog.vue";
import {
	contextExternalToolConfigurationStatusFactory,
	createTestAppStore,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExternalToolDisplayData } from "@data-external-tool";
import { mount } from "@vue/test-utils";
import { Permission, RoleName } from "@/serverApi/v3";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("RoomExternalToolsErrorDialog", () => {
	const getWrapper = (props: {
		selectedItem: ExternalToolDisplayData;
		isOpen?: boolean;
	}) => {
		setActivePinia(createTestingPinia());
		createTestAppStore({
			me: {
				permissions: [Permission.ContextToolAdmin],
				roles: [{ name: RoleName.Teacher, id: "teacher1" }],
			},
		});

		const wrapper = mount(RoomExternalToolsErrorDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: true,
				...props,
			},
		});

		return {
			wrapper,
		};
	};

	describe("when dialog is rendered", () => {
		describe("when status is outdated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
					}),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual("pages.rooms.tools.outdatedDialog.title");
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					"common.tool.information.outdatedOnSchool.teacher"
				);
			});
		});

		describe("when status is incomplete", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					}),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					"pages.rooms.tools.incompleteDialog.title"
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					"common.tool.information.outdated.teacher"
				);
			});
		});

		describe("when status is incomplete operational", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						}),
					}),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual("error.generic");
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					"common.tool.information.outdated.teacher"
				);
			});
		});

		describe("when status is deactivated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						}),
					}),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					"pages.rooms.tools.deactivatedDialog.title"
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					"common.tool.information.deactivated.teacher"
				);
			});
		});

		describe("when status is not licensed", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						}),
					}),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					"pages.rooms.tools.notLicensedDialog.title"
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					"common.tool.information.notLicensed.teacher"
				);
			});
		});
	});
});
