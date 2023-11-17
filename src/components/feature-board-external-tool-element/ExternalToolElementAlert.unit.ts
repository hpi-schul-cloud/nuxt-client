import { BusinessError } from "@/store/types/commons";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useBoardPermissions } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { WarningAlert } from "@ui-alert";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";

jest.mock("@data-board");

describe("ExternalToolElementAlert", () => {
	let useBoardPermissionsMock: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;

	beforeEach(() => {
		useBoardPermissionsMock =
			createMock<ReturnType<typeof useBoardPermissions>>();

		jest.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (propsData: {
		error?: BusinessError;
		isToolOutdated?: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			ExternalToolElementAlert as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
				},
			}
		);

		return {
			wrapper,
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

	describe("when the tool is outdated", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = true;

				const { wrapper } = getWrapper({ isToolOutdated: true });

				return {
					wrapper,
				};
			};

			it("should display a teacher friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"feature-board-external-tool-element.alert.outdated.teacher"
				);
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				useBoardPermissionsMock.isTeacher = false;

				const { wrapper } = getWrapper({ isToolOutdated: true });

				return {
					wrapper,
				};
			};

			it("should display a student friendly message", () => {
				const { wrapper } = setup();

				const alerts = wrapper.findAllComponents(WarningAlert);

				expect(alerts).toHaveLength(1);
				expect(alerts.at(0).text()).toEqual(
					"feature-board-external-tool-element.alert.outdated.student"
				);
			});
		});
	});
});
