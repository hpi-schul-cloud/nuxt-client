import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

describe("@/components/error-handling/ErrorContent.vue", () => {
	const getWrapper = (errorText: string, statusCode: HttpStatusCode) =>
		mount(ErrorContent, {
			propsData: {
				errorText,
				statusCode,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("should show error text", () => {
		const wrapper = getWrapper("an error has occurred", HttpStatusCode.InternalServerError);
		const errorTextElement = wrapper.find('[data-testid="err-text"]');
		expect(errorTextElement.html()).toContain("an error has occurred");
	});

	it("should show generic error svg", async () => {
		const errorMessage = "I'm an error message";
		const wrapper = getWrapper(errorMessage, HttpStatusCode.InternalServerError);

		const genericErrorImage = wrapper.find('[data-testid="img-generic"]');
		expect(genericErrorImage.element).toBeInstanceOf(HTMLImageElement);
		expect(genericErrorImage.attributes("alt")).toContain(errorMessage);
	});

	it.each([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden])(
		"should show permission error svg on statuscode %s",
		async (statusCode: HttpStatusCode) => {
			const wrapper = getWrapper("an permission error has occurred", statusCode);
			const permissionElement = wrapper.findComponent(PermissionErrorSvg);
			expect(permissionElement.exists()).toBe(true);
		}
	);
});
