import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import RoomExternalToolsErrorDialog from "@/pages/rooms/tools/RoomExternalToolsErrorDialog.vue";
import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	ContextExternalToolConfigurationStatusFactory,
	i18nMock,
} from "@@/tests/test-utils";
import { AUTH_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import AuthModule from "@/store/auth";

describe("RoomExternalToolsErrorDialog", () => {
	const getWrapper = (propsData: {
		selectedItem: ExternalToolDisplayData;
		isOpen?: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
			getUserRoles: ["teacher"],
		});

		const wrapper: Wrapper<any> = mount(
			RoomExternalToolsErrorDialog as MountOptions<Vue>,
			{
				...createComponentMocks({}),
				propsData: {
					isOpen: true,
					...propsData,
				},
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[I18N_KEY.valueOf()]: i18nMock,
				},
			}
		);

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

				const title = wrapper.find('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.outdatedDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.find(".v-card__text");

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

				const title = wrapper.find('[data-testid="dialog-title"]');

				expect(title.text()).toEqual(
					'pages.rooms.tools.deactivatedDialog.title {"toolName":"Test Tool"}'
				);
			});

			it("should render the correct content text", () => {
				const { wrapper } = setup();

				const content = wrapper.find(".v-card__text");

				expect(content.text()).toEqual(
					'common.tool.information.deactivated {"toolName":"Test Tool"}'
				);
			});
		});
	});
});
