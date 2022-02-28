import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import Index from "./index.vue";
import { Auth } from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

jest.mock("@store/auth", () => ({
	...jest.requireActual("@store/auth"),
	__esModule: true,
	get default() {
		return {
			getSchool: {
				name: "Test-Schule",
			},
		};
	},
}));

describe("@index", () => {
	let authModuleMock: Auth;
	let wrapper: Wrapper<Index>;

	beforeEach(() => {
		wrapper = mount(Index);
	});

	it("index", () => {
		expect(wrapper.text()).toContain("Murat");
	});

	describe("store", () => {
		it("should display school name", () => {
			expect(wrapper.find(".school").text()).toBe("Test-Schule");
		});
	});
});
