import AuthModule from "@/store/auth";
import { BusinessError } from "@/store/types/commons";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { contextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardPermissions } from "@data-board";
import {
	ContextExternalToolConfigurationStatus,
	useContextExternalToolConfigurationStatus,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";

jest.mock("@data-board");

describe("ExternalToolElementAlert", () => {
	let useBoardPermissionsMock: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;

	let useToolConfigurationStatusMock: DeepMocked<
		ReturnType<typeof useContextExternalToolConfigurationStatus>
	>;

	beforeEach(() => {
		useBoardPermissionsMock =
			createMock<ReturnType<typeof useBoardPermissions>>();

		useToolConfigurationStatusMock =
			createMock<
				ReturnType<typeof useContextExternalToolConfigurationStatus>
			>();

		jest.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (
		propsData: {
			error?: BusinessError;
			toolStatus?: ContextExternalToolConfigurationStatus;
		},
		userRoles?: string[]
	) => {
		useToolConfigurationStatusMock.determineToolStatusTranslationKey.mockReturnValue(
			"translated"
		);

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: userRoles,
		});

		const wrapper = mount(ExternalToolElementAlert, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			},
			props: {
				toolDisplayName: "Tool name",
				toolStatus: contextExternalToolConfigurationStatusFactory.build(),
				...propsData,
			},
		});

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

				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper({ error });

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly error message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
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

				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper({ error });

				return {
					wrapper,
				};
			};

			it("should display a student friendly error message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					"feature-board-external-tool-element.alert.error.student"
				);
			});
		});
	});

	describe("when the tool is outdated on scope school", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
					},
					["teacher"]
				);

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdatedOnSchool.teacher {"toolName":"Tool name"}'
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
					},
					["student"]
				);

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.student {"toolName":"Tool name"}'
				);
			});
		});
	});

	describe("when the tool is outdated on scope context", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						}),
					},
					["teacher"]
				);

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.teacher {"toolName":"Tool name"}'
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						}),
					},
					["student"]
				);

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.student {"toolName":"Tool name"}'
				);
			});
		});
	});

	describe("when the tool is outdated on scope school and context", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
							isOutdatedOnScopeContext: true,
						}),
					},
					["teacher"]
				);

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.incomplete.outdated.schoolAndContext.teacher {"toolName":"Tool name"}'
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
							isOutdatedOnScopeContext: true,
						}),
					},
					["student"]
				);

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.student {"toolName":"Tool name"}'
				);
			});
		});
	});

	describe("when the tool is deactivated", () => {
		it("should display a user friendly message", () => {
			useBoardPermissionsMock.isTeacher.value = true;

			const { wrapper } = getWrapper(
				{
					toolStatus: contextExternalToolConfigurationStatusFactory.build({
						isDeactivated: true,
					}),
				},
				["teacher"]
			);

			const alerts = wrapper.findAllComponents(WarningAlert);

			expect(alerts).toHaveLength(1);
			expect(alerts[0].text()).toEqual(
				'common.tool.information.deactivated.teacher {"toolName":"Tool name"}'
			);
		});
	});

	describe("when the tool is not licensed", () => {
		it("should display a user friendly message", () => {
			useBoardPermissionsMock.isTeacher.value = true;

			const { wrapper } = getWrapper(
				{
					toolStatus: contextExternalToolConfigurationStatusFactory.build({
						isNotLicensed: true,
					}),
				},
				["teacher"]
			);

			const alerts = wrapper.findAllComponents(WarningAlert);

			expect(alerts).toHaveLength(1);
			expect(alerts[0].text()).toEqual(
				'common.tool.information.notLicensed.teacher {"toolName":"Tool name"}'
			);
		});
	});

	describe("when the tool is incomplete on scope context", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					},
					["teacher"]
				);

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.teacher {"toolName":"Tool name"}'
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					},
					["student"]
				);

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.student {"toolName":"Tool name"}'
				);
			});
		});
	});

	describe("when the tool is incomplete operational", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = true;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						}),
					},
					["teacher"]
				);

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(InfoAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual(
					'common.tool.information.outdated.teacher {"toolName":"Tool name"}'
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher.value = false;

				const { wrapper } = getWrapper(
					{
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						}),
					},
					["student"]
				);

				return {
					wrapper,
				};
			};

			it("should not display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(InfoAlert);

				expect(alerts).toHaveLength(0);
			});
		});
	});
});
