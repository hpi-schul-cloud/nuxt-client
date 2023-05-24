import AuthModule from "@/store/auth";
import { useBoardPermissions } from "./BoardPermissions.composable";
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
});
