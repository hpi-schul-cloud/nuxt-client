import RoomExternalToolsErrorDialog from "@/pages/rooms/tools/RoomExternalToolsErrorDialog.vue";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { ContextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExternalToolDisplayData } from "@data-external-tool";
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
		deactivated: boolean,
		outdated = false
	): ExternalToolDisplayData => {
		return {
			status: ContextExternalToolConfigurationStatusFactory.build({
				isDeactivated: deactivated,
				isOutdatedOnScopeSchool: outdated,
			}),
			name: "Test Tool",
			openInNewTab: false,
			contextExternalToolId: "contextExternalToolId",
		};
	};

	describe("when dialog is rendered", () => {
		describe("when status is outdated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(false, true),
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

		describe("when status is deactivated", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					selectedItem: createSelectedItem(true),
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
					'common.tool.information.deactivated {"toolName":"Test Tool"}'
				);
			});
		});
	});
});
