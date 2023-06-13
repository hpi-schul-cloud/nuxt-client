import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementAlert from "./FileContentElementAlert.vue";

describe("FileContentElementAlert", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileContentElementAlert, {
			...createComponentMocks({ i18n: true }),
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementAlert);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const icon = wrapper.find("v-alert-stub").attributes("icon");

		expect(icon).toBe("$error");
	});

	it("should find warning", async () => {
		const { wrapper } = setup();

		const warning = wrapper.find("v-alert-stub").text();

		expect(warning).toBe(
			wrapper.vm.$t("components.cardElement.fileElement.virusDetected")
		);
	});
});
