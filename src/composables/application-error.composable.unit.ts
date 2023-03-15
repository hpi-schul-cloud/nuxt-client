import { defineComponent, provide } from "vue";
import { shallowMount } from "@vue/test-utils";
import { useApplicationError } from "@/composables/application-error.composable";
import { HttpStatusCode } from "../store/types/http-status-code.enum";

jest.mock("./loadingState");

export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(
	composable: () => R,
	providers: Record<string, unknown>
): R => {
	const ParentComponent = defineComponent({
		setup() {
			for (const [key, mockFn] of Object.entries(providers)) {
				provide(key, mockFn);
			}
		},
	});

	const TestComponent = {
		template: "<div></div>",
	};

	const wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
		parentComponent: ParentComponent,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
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
