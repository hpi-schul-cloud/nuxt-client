import {
	ToolParameter,
	ToolParameterLocationEnum,
	ToolParameterScopeEnum,
	ToolParameterTypeEnum,
} from "@/store/external-tool";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolConfigParameter from "@/components/administration/external-tool/ExternalToolConfigParameter.vue";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";

describe("ExternalToolConfigParameter", () => {
	let wrapper: Wrapper<any>;

	const setup = (parameter: ToolParameter = setupToolParameter()) => {
		document.body.setAttribute("data-app", "true");

		wrapper = mount(ExternalToolConfigParameter as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				value: parameter,
			},
		});
	};

	const setupToolParameter = (): ToolParameter => {
		return {
			value: undefined,
			default: undefined,
			scope: ToolParameterScopeEnum.School,
			type: ToolParameterTypeEnum.String,
			location: ToolParameterLocationEnum.Path,
			name: "Parameter1",
			isOptional: true,
		};
	};

	describe("inject", () => {
		describe("when i18n injection fails", () => {
			it("should throw an error", () => {
				const consoleErrorSpy = jest
					.spyOn(console, "error")
					.mockImplementation();

				try {
					shallowMount(ExternalToolConfigParameter as MountOptions<Vue>);
					// eslint-disable-next-line no-empty
				} catch (e) {}

				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(
						/\[Vue warn\]: Error in setup: "Error: Injection of dependencies failed"/
					)
				);

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const parameter: ToolParameter = setupToolParameter();
			setup(parameter);

			expect(
				wrapper.findComponent(ExternalToolConfigParameter).exists()
			).toBeTruthy();
		});
	});
});
