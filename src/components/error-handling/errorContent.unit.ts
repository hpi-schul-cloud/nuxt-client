import ErrorContent from "./ErrorContent.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import i18n from "vue-i18n";

describe("@components/error-handling/ErrorContent.vue", () => {
	const getWrapper = (props?: object) => {
		return mount<any>(ErrorContent, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				errorText: "an error has occurred",
				...props,
			},
		});
	};

	it("should show error text", () => {
		const wrapper = getWrapper();
		const errorTextElement = wrapper.find('[data-testid="err-text"]');
		expect(errorTextElement.element.innerHTML).toContain(
			"an error has occurred"
		);
	});

	it("should show generic error image", () => {
		const wrapper = getWrapper({ isGenericError: true });
		const genericErrorImage = wrapper.find('[data-testid="img-generic"]');
		expect(genericErrorImage.element).toBeInstanceOf(HTMLImageElement);
		const genericErrorImageContent = wrapper.find('[data-testid="img-generic"]')
			.element as HTMLImageElement;
		expect(genericErrorImageContent.src).toContain("assets/img/pc_repair.png");
	});

	it("should show generic error image", () => {
		const wrapper = getWrapper({ isPermissionError: true });
		const permissionElement = wrapper.find('[data-testid="img-permission"]');
		expect(permissionElement.exists()).toBe(true);
	});
});
