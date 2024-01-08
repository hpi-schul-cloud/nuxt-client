import { mount } from "@vue/test-utils";

export const mountComposable = <T>(
	composable: () => T,
	providers: Record<string | symbol, unknown> = {}
): T => {
	const TestComponent = {
		setup() {
			const result = composable();
			return { result };
		},
		template: "<div></div>",
	};

	const wrapper = mount(TestComponent, {
		global: {
			provide: providers,
		},
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};
