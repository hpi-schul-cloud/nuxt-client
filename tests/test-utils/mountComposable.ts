import { ComponentMountingOptions, mount, VueWrapper } from "@vue/test-utils";
import { DefineComponent, defineComponent } from "vue";

export const mountComposable = <T>(
	composable: () => T,
	options?: ComponentMountingOptions<DefineComponent>
): T & { wrapper: VueWrapper } => {
	const TestComponent = defineComponent({
		setup() {
			const result = composable();
			return { result };
		},
		template: "<div></div>",
	});

	const wrapper = mount(TestComponent, options);

	return { ...(wrapper.vm.result as T), wrapper };
};
