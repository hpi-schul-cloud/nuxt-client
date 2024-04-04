import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import NotificationModal from "./NotificationModal.vue";

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
	description: "test description",
};

describe("@/components/molecules/NotificationModal", () => {
	const setup = (isSuccess: boolean) => {
		return mount(NotificationModal, {
			plugins: [createTestingVuetify(), createTestingI18n()],
			props: {
				...testProps,
				isSuccess,
			},
		});
	};
	it("success case", async () => {
		const wrapper = setup(true);

		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.successMsg);
		expect(
			wrapper.find(".icon").element.innerHTML.includes("$mdiCheckCircle")
		).toBe(true);
		setTimeout(() => {
			expect(wrapper.find(".footer-button").attributes("style")).toBe(
				"background-color:rgba(var(--v-theme-success))"
			);
		}, 200);
	});

	it("error case", async () => {
		const wrapper = setup(false);

		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.errorMsg);
		expect(
			wrapper.find(".icon").element.innerHTML.includes("$mdiAlertCircle")
		).toBe(true);
		setTimeout(() => {
			expect(wrapper.find(".footer-button").attributes("style")).toBe(
				"background-color: rgba(var(--v-theme-error))"
			);
		}, 200);
	});

	it("executes close action after close", async () => {
		const wrapper = setup(false);

		const button = wrapper.get(".btn-confirm");
		await button.trigger("click");
		expect(wrapper.emitted("close")).toHaveLength(1);
		expect(wrapper.emitted("update:show-notification-modal")).toHaveLength(1);
	});
});
