import RoomExternalToolsErrorDialog from "@/pages/course-rooms/tools/RoomExternalToolsErrorDialog.vue";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import {
	contextExternalToolConfigurationStatusFactory,
	externalToolDisplayDataFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExternalToolDisplayData } from "@data-external-tool";
import { mount } from "@vue/test-utils";

describe("RoomExternalToolsErrorDialog", () => {
	const getWrapper = (props: {
		selectedItem: ExternalToolDisplayData;
		isOpen?: boolean;
	}) => {
		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
			getUserRoles: ["teacher"],
		});

		const wrapper = mount(RoomExternalToolsErrorDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
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
