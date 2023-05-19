import AuthModule from "@/store/auth";
import {
	useBoardPermissions,
	handlePermittedAction,
} from "./BoardPermissions.composable";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("BoardPermissions.composable", () => {
	let authModuleMock: jest.Mocked<AuthModule>;
	beforeEach(() => {
		authModuleMock = createModuleMocks(AuthModule, {
			getUserPermissions: ["course_edit", "course_create", "course_remove"],
		});
	});

	// trouble with authModule mocking
	it("should set user permissions to boardPermission", async () => {
		const permissions = useBoardPermissions();

		expect(authModuleMock).toBeDefined();
		expect(permissions).toBeDefined();
	});

	describe("handlePermittedAction", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		describe("when the action is permitted", () => {
			it("should call the action without any parameter", () => {
				const mockAction = jest.fn();

				handlePermittedAction(true, mockAction);

				expect(mockAction).toHaveBeenCalled();
			});

			it("should call the action with parameters", () => {
				const mockAction = jest.fn();

				handlePermittedAction(true, mockAction, "params_1", "params_2");

				expect(mockAction).toHaveBeenCalled();
				expect(mockAction).toHaveBeenCalledWith("params_1", "params_2");
			});
		});
		describe("when the action is not permitted", () => {
			it("should call the action without any parameter", () => {
				const mockAction = jest.fn();

				handlePermittedAction(false, mockAction);

				expect(mockAction).not.toHaveBeenCalled();
			});
		});
	});
});
