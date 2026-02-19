import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";
import { Permission, RoleName } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { contextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { useBoardAllowedOperations } from "@data-board";
import { ContextExternalToolConfigurationStatus, useContextExternalToolConfigurationStatus } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed } from "vue";

vi.mock("@data-board");
vi.mock("@data-app");

describe("ExternalToolElementAlert", () => {
	let useToolConfigurationStatusMock: DeepMocked<ReturnType<typeof useContextExternalToolConfigurationStatus>>;

	type ExternalToolElementAlertSetupOptions = {
		allowedOperations?: Record<string, boolean>;
		isTeacher?: boolean;
		props?: {
			error?: BusinessError;
			toolStatus?: ContextExternalToolConfigurationStatus;
			toolDisplayName?: string;
		};
	};

	const setup = (options: ExternalToolElementAlertSetupOptions = {}) => {
		const {
			allowedOperations = { createExternalToolElement: true },
			isTeacher = true,
			props: overriddenProps = {},
		} = options;

		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(() => allowedOperations as unknown),
		} as ReturnType<typeof useBoardAllowedOperations>);

		useToolConfigurationStatusMock = createMock<ReturnType<typeof useContextExternalToolConfigurationStatus>>();
		useToolConfigurationStatusMock.determineToolStatusTranslationKey.mockReturnValue("translated");

		setActivePinia(createTestingPinia());
		const hasContextToolAdminPermission = allowedOperations.createExternalToolElement ?? false;
		const permissions = hasContextToolAdminPermission ? [Permission.ContextToolAdmin] : [];
		vi.mocked(useAppStore).mockReturnValue({
			hasPermission: (permission: Permission) => permissions.includes(permission),
			userRoles: [isTeacher ? RoleName.Teacher : RoleName.Student],
		} as unknown as ReturnType<typeof useAppStore>);

		const wrapper = mount(ExternalToolElementAlert, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$t: (key: string, dynamic?: object): string => key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			},
			props: {
				toolDisplayName: "Tool name",
				toolStatus: contextExternalToolConfigurationStatusFactory.build(),
				...overriddenProps,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		// vi.clearAllMocks();
		vi.resetAllMocks();
	});

	describe("when an error exists", () => {
		describe("when the user is a teacher", () => {
			it("should display a teacher friendly error message", () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: true },
					props: { error },
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual("feature-board-external-tool-element.alert.error.teacher");
			});
		});

		describe("when the user is a student", () => {
			it("should display a student friendly error message", () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: false },
					isTeacher: false,
					props: { error },
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual("feature-board-external-tool-element.alert.error.student");
			});
		});
	});

	describe("when the tool is outdated on scope school", () => {
		describe("when the user is a teacher", () => {
			it("should display a teacher friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: true },
					isTeacher: true,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
					},
				});

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdatedOnSchool.teacher {"toolName":"Tool name"}');
			});
		});

		describe("when the user is a student", () => {
			it("should display a student friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: false },
					isTeacher: false,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
					},
				});

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.student {"toolName":"Tool name"}');
			});
		});
	});

	describe("when the tool is outdated on scope context", () => {
		describe("when the user is a teacher", () => {
			it("should display a teacher friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: true },
					isTeacher: true,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.teacher {"toolName":"Tool name"}');
			});
		});

		describe("when the user is a student", () => {
			it("should display a student friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: false },
					isTeacher: false,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.student {"toolName":"Tool name"}');
			});
		});
	});

	describe("when the tool is incomplete on scope context", () => {
		describe("when the user is a teacher", () => {
			it("should display a teacher friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: true },
					isTeacher: true,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.teacher {"toolName":"Tool name"}');
			});
		});

		describe("when the user is a student", () => {
			it("should display a student friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: false },
					isTeacher: false,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(WarningAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.student {"toolName":"Tool name"}');
			});
		});
	});

	describe("when the user is a teacher", () => {
		it("should display a teacher friendly message", () => {
			const { wrapper } = setup({
				allowedOperations: { createExternalToolElement: true },
				isTeacher: true,
				props: {
					toolStatus: contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
					}),
				},
			});
			const alerts = wrapper.findAllComponents(WarningAlert);
			expect(alerts).toHaveLength(1);
			expect(alerts[0].text()).toEqual('common.tool.information.outdatedOnSchool.teacher {"toolName":"Tool name"}');
		});
	});

	describe("when the user is a student", () => {
		it("should display a student friendly message", () => {
			const { wrapper } = setup({
				allowedOperations: { createExternalToolElement: false },
				isTeacher: false,
				props: {
					toolStatus: contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
					}),
				},
			});
			const alerts = wrapper.findAllComponents(WarningAlert);
			expect(alerts).toHaveLength(1);
			expect(alerts[0].text()).toEqual('common.tool.information.outdated.student {"toolName":"Tool name"}');
		});
	});

	describe("when the tool is incomplete operational", () => {
		describe("when the user is a teacher", () => {
			it("should display a teacher friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: true },
					isTeacher: true,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(InfoAlert);
				expect(alerts).toHaveLength(1);
				expect(alerts[0].text()).toEqual('common.tool.information.outdated.teacher {"toolName":"Tool name"}');
			});
		});

		describe("when the user is a student", () => {
			it("should not display a student friendly message", () => {
				const { wrapper } = setup({
					allowedOperations: { createExternalToolElement: false },
					isTeacher: false,
					props: {
						toolStatus: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOperationalOnScopeContext: true,
						}),
					},
				});
				const alerts = wrapper.findAllComponents(InfoAlert);
				expect(alerts).toHaveLength(0);
			});
		});
	});
});
