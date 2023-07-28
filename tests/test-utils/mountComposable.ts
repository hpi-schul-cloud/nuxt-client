import { shallowMount } from "@vue/test-utils";
import { defineComponent, provide } from "vue";

export const mountComposable = <T>(
	composable: () => T,
	providers: Record<string | symbol, unknown> = {}
): T => {
	const ParentComponent = defineComponent({
		setup() {
			for (const [key, mockFn] of Object.entries(providers)) {
				provide(key, mockFn);
			}
		},
		provide: providers,
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
	// @ts-ignore
	return wrapper.vm.result;
};
