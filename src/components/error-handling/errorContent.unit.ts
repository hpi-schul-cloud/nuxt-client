import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { shallowMount } from "@vue/test-utils";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";

describe("@/components/error-handling/ErrorContent.vue", () => {
	const getWrapper = (errorText: string, statusCode: HttpStatusCode) => {
		return shallowMount(ErrorContent, {
			...createComponentMocks({}),
			propsData: {
				errorText,
				statusCode,
			},
		});
	};

	it("should show error text", () => {
		const wrapper = getWrapper(
			"an error has occurred",
			HttpStatusCode.InternalServerError
		);
		const errorTextElement = wrapper.find('[data-testid="err-text"]');
		expect(errorTextElement.html()).toContain("an error has occurred");
	});

	it("should show generic error svg", async () => {
		const wrapper = getWrapper(
			"an error has occurred",
			HttpStatusCode.InternalServerError
		);
		const genericErrorImage = wrapper.find('[data-testid="img-generic"]');
		expect(genericErrorImage.element).toBeInstanceOf(HTMLImageElement);
		const genericErrorImageContent = await wrapper.find(
			'[data-testid="img-generic"]'
		);
		expect(genericErrorImageContent.attributes("src")).toContain(
			"assets/img/pc_repair.png"
		);
	});

	it.each([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden])(
		"should show permission error svg on statuscode %s",
		async (statusCode: HttpStatusCode) => {
			const wrapper = getWrapper(
				"an permission error has occurred",
				statusCode
			);
			const permissionElement = await wrapper.findComponent(PermissionErrorSvg);
			expect(permissionElement.exists()).toBe(true);
		}
	);
});
