import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import Index from "./index.vue";
import { Auth } from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

const mockAuthModule = jest.fn();
jest.mock("@store/auth", () => ({
	...jest.requireActual("@store/auth"),
	__esModule: true,
	get default() {
		return mockAuthModule();
	},
}));

const mockTaskModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockTaskModule();
	},
}));

// describe("bla", () => {
// 	it("blabla", () => {
// 		expect(mockAuthModule).toBeDefined();
// 	});
// });

describe("@index", () => {
	let authModuleMock: Auth;
	let wrapper: Wrapper<Index>;

	beforeEach(() => {
		authModuleMock = {
			...createModuleMocks(Auth),
			// TODO - solve when factories are implemented
			// @ts-ignore
			getSchool: {
				name: "Test-Schule",
			},
		};
		//	mockAuthModule.mockReturnValue(authModuleMock);

		wrapper = mount(Index, {
			...createComponentMocks({
				i18n: true,
			}),
		});
	});

	it("index", async () => {
		expect(wrapper.text()).toContain("Murat");
	});

	// describe("store", () => {
	// 	it("should display school name", () => {
	// 		expect(wrapper.find(".school").text()).toBe("Test-Schule");
	// 	});
	// });
});
