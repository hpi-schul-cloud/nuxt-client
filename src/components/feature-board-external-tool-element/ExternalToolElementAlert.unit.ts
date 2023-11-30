import { BusinessError } from "@/store/types/commons";
import { AUTH_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { i18nMock, toolConfigurationStatusFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useBoardPermissions } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { WarningAlert } from "@ui-alert";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";
import { ToolConfigurationStatus } from "@/store/external-tool";
import { useToolConfigurationStatus } from "@data-external-tool";

jest.mock("@data-board");

describe("ExternalToolElementAlert", () => {
	let useBoardPermissionsMock: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;

	let useToolConfigurationStatusMock: DeepMocked<
		ReturnType<typeof useToolConfigurationStatus>
	>;

	beforeEach(() => {
		useBoardPermissionsMock =
			createMock<ReturnType<typeof useBoardPermissions>>();

		useToolConfigurationStatusMock =
			createMock<ReturnType<typeof useToolConfigurationStatus>>();

		jest.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (propsData: {
		error?: BusinessError;
		isToolOutdated?: boolean;
		toolOutdatedStatus?: ToolConfigurationStatus;
		userRoles?: string[];
	}) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: propsData.userRoles,
		});

		const wrapper: Wrapper<Vue> = mount(
			ExternalToolElementAlert as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			}
		);

		return {
			wrapper,
			authModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when an error exists", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};

				useBoardPermissionsMock.isTeacher = true;

				const { wrapper } = getWrapper({ error });

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly error message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"feature-board-external-tool-element.alert.error.teacher"
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};

				useBoardPermissionsMock.isTeacher = false;

				const { wrapper } = getWrapper({ error });

				return {
					wrapper,
				};
			};

			it("should display a student friendly error message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"feature-board-external-tool-element.alert.error.student"
				);
			});
		});
	});

	describe("when the tool is outdated on scope school", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = true;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: false,
					}),
					userRoles: ["teacher"],
				});

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdatedOnSchool.teacher"
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = false;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: false,
					}),
					userRoles: ["student"],
				});

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdated.student"
				);
			});
		});
	});

	describe("when the tool is outdated on scope context", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = true;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: false,
						isOutdatedOnScopeContext: true,
					}),
					userRoles: ["teacher"],
				});

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdatedOnContext.teacher"
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = false;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: false,
						isOutdatedOnScopeContext: true,
					}),
					userRoles: ["student"],
				});

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdated.student"
				);
			});
		});
	});

	describe("when the tool is outdated on scope school and context", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = true;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					}),
					userRoles: ["teacher"],
				});

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdatedOnSchoolAndContext.teacher"
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = false;

				const { wrapper } = getWrapper({
					isToolOutdated: true,
					toolOutdatedStatus: toolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					}),
					userRoles: ["student"],
				});

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"common.information.outdated.student"
				);
			});
		});
	});
});
