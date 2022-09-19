import { defineComponent } from "@vue/composition-api";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useNotifier } from "./notifier";

describe("notifier composable", () => {
	it("should call notifierModule.show()", () => {
		const TestComponent = defineComponent({
			setup() {
				provide("notifierModule", {
					show: jest.fn(),
				});

				const { showNotifier } = useNotifier();

				return { showNotifier };
			},
			template: `<div></div>`,
		});

		const wrapper = mount(TestComponent, {});

		//@ts-ignore
		wrapper.vm.showNotifier({ text: "message", status: "success" });

		expect(true).toBeTruthy();
	});
});
