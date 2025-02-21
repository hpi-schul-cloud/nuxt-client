import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { DefineComponent, defineComponent } from "vue";

export const mountComposable = <T>(
	composable: () => T,
	options?: ComponentMountingOptions<DefineComponent>
): T => {
	const TestComponent = defineComponent({
		setup() {
			const result = composable();
			return { result };
		},
		template: "<div></div>",
	});

	const wrapper = mount(TestComponent, options);
	// Todo: Fix this
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};
