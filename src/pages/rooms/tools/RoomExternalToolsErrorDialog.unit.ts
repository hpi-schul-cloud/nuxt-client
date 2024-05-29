import RoomExternalToolsErrorDialog from "@/pages/rooms/tools/RoomExternalToolsErrorDialog.vue";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { contextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	ContextExternalToolConfigurationStatus,
	ExternalToolDisplayData,
} from "@data-external-tool";
import { mount } from "@vue/test-utils";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

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
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
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

	const createSelectedItem = (
		status: ContextExternalToolConfigurationStatus
	): ExternalToolDisplayData => {
		return {
			status,
			name: "Test Tool",
			openInNewTab: false,
			contextExternalToolId: "contextExternalToolId",
		};
	};

	describe("when dialog is rendered", () => {
		describe("when status is outdated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(
						contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						})
					),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.outdatedDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					'common.tool.information.outdatedOnSchool.teacher {"toolName":"Test Tool"}'
				);
			});
		});

		describe("when status is incomplete", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(
						contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						})
					),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.incompleteDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					'common.tool.information.outdated.teacher {"toolName":"Test Tool"}'
				);
			});
		});

		describe("when status is incomplete operational", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(
						contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						})
					),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual('error.generic {"toolName":"Test Tool"}');
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					'common.tool.information.outdated.teacher {"toolName":"Test Tool"}'
				);
			});
		});

		describe("when status is deactivated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						})
					),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.deactivatedDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					'common.tool.information.deactivated.teacher {"toolName":"Test Tool"}'
				);
			});
		});

		describe("when status is not licensed", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						})
					),
				});

				return {
					wrapper,
				};
			};

			it("should render the correct title", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.notLicensedDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.findComponent(".v-card-text");

				expect(content.text()).toEqual(
					'common.tool.information.notLicensed.teacher {"toolName":"Test Tool"}'
				);
			});
		});
	});
});
