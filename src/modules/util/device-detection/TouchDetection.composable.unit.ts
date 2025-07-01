import { useTouchDetection } from "./TouchDetection.composable";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

describe(useTouchDetection.name, () => {
	const getWrapper = () => {
		let composable: ReturnType<typeof useTouchDetection> | undefined;

		const TestComponent = defineComponent({
			setup() {
				composable = useTouchDetection();
			},
			template: "<div/>",
		});

		const wrapper = mount(TestComponent, {
			provide: {},
		});

		return {
			wrapper,
			composable,
		};
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("isTouchEvent", () => {
		it("should be defined", () => {
			const { composable } = getWrapper();

			expect(composable?.isTouchDetected).toBeDefined();
		});

		describe("when window has ontouchstart", () => {
			it("should return true initially", () => {
				Object.defineProperty(window, "ontouchstart", () => "anything");
				const { composable } = getWrapper();

				expect(composable?.isTouchDetected.value).toEqual(true);
			});
		});
	});
});
