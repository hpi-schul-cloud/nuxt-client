import AuthModule from "@/store/auth";
import { useBoardPermissions } from "./BoardPermissions.composable";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("BoardPermissions.composable", () => {
	let authModuleMock: jest.Mocked<AuthModule>;
	beforeEach(() => {
		authModuleMock = createModuleMocks(AuthModule, {
			getUserPermissions: ["course_edit", "course_create", "course_remove"],
			getUserRoles: ["teacher"],
		});
	});

	it("should set user permissions to boardPermission", async () => {
		const permissions = mountComposable(() => useBoardPermissions(), {
			global: { plugins: [createTestingI18n()] },
		});

		expect(authModuleMock).toBeDefined();
		expect(permissions).toBeDefined();
	});
});
