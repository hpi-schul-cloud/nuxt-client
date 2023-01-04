import { defineComponent } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useApplicationError } from "@/composables/application-error.composable";
import { HttpStatusCode } from "../store/types/http-status-code.enum";

jest.mock("./loadingState");

export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
	const TestComponent = defineComponent({
		template: `<div></div>`,
	});

	const wrapper = mount(TestComponent, {
		setup() {
			options.provider?.();
			const result = composable();
			return { result };
		},
	});
	// @ts-ignore
	return wrapper.vm.result;
};

describe("application-error composable", () => {
	const setup = () => {
		return mountComposable(() => useApplicationError(), {});
	};

	it("should return createApplicationError", async () => {
		const { createApplicationError } = setup();

		expect(createApplicationError).toBeTruthy();
		expect(typeof createApplicationError).toBe("function");
	});

	it("createApplicationError should create an ApplicationError", async () => {
		const { createApplicationError } = setup();
		const result = createApplicationError(HttpStatusCode.InternalServerError);
		expect(result).toBeInstanceOf(Error);
		expect(result.name).toBe("ApplicationError");
	});
});
