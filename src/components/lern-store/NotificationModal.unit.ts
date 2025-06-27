import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import NotificationModal from "./NotificationModal.vue";
import { mdiAlertCircle, mdiCheckCircle } from "@icons/material";

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
	description: "test description",
};

describe("@/components/molecules/NotificationModal", () => {
	const setup = (isSuccess: boolean) => {
		return mount(NotificationModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				...testProps,
				isSuccess,
			},
		});
	};
	it("success case", async () => {
		const wrapper = setup(true);

		const dialogCard = wrapper
			.findComponent({ name: "v-dialog" })
			.findComponent({ name: "v-card" });

		expect(dialogCard.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(dialogCard.find(".modal-title").text()).toBe(testProps.successMsg);
		expect(
			dialogCard.find(".icon").element.innerHTML.includes(mdiCheckCircle)
		).toBe(true);
		setTimeout(() => {
			expect(dialogCard.find(".footer-button").attributes("style")).toBe(
				"background-color:rgba(var(--v-theme-success))"
			);
		}, 200);
	});

	it("error case", async () => {
		const wrapper = setup(false);

		const dialogCard = wrapper
			.findComponent({ name: "v-dialog" })
			.findComponent({ name: "v-card" });

		expect(dialogCard.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(dialogCard.find(".modal-title").text()).toBe(testProps.errorMsg);
		expect(
			dialogCard.find(".icon").element.innerHTML.includes(mdiAlertCircle)
		).toBe(true);
		setTimeout(() => {
			expect(dialogCard.find(".footer-button").attributes("style")).toBe(
				"background-color: rgba(var(--v-theme-error))"
			);
		}, 200);
	});

	it("executes close action after close", async () => {
		const wrapper = setup(false);

		const dialogCard = wrapper
			.findComponent({ name: "v-dialog" })
			.findComponent({ name: "v-card" });

		const button = dialogCard.get(".btn-confirm");
		await button.trigger("click");

		expect(wrapper.emitted("close")).toBeDefined();
		expect(wrapper.emitted("update:show-notification-modal")).toBeDefined();
	});
});
