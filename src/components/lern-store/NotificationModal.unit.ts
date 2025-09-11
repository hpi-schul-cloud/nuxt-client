import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import NotificationModal from "./NotificationModal.vue";
import { mdiAlertCircle, mdiCheckCircle } from "@icons/material";
import ModalBodyInfo from "../base/ModalBodyInfo.vue";
import { VIcon } from "vuetify/components";

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

	it("should render the component", () => {
		const wrapper = setup(true);

		expect(wrapper.exists()).toBe(true);
	});

	describe("success case", () => {
		it("should render corect title and description", () => {
			const wrapper = setup(true);

			const modalBodyInfo = wrapper.findComponent(ModalBodyInfo);

			expect(modalBodyInfo.props("title")).toBe(testProps.successMsg);
			expect(modalBodyInfo.props("description")).toBe(testProps.description);
		});

		it("should render success icon", () => {
			const wrapper = setup(true);

			const successIcon = wrapper
				.findComponent(ModalBodyInfo)
				.findComponent(VIcon);

			expect(successIcon.exists()).toBe(true);
			expect(successIcon.props("icon")).toBe(mdiCheckCircle);
		});
	});

	describe("error case", () => {
		it("should render corect title and description", () => {
			const wrapper = setup(false);

			const modalBodyInfo = wrapper.findComponent(ModalBodyInfo);

			expect(modalBodyInfo.props("title")).toBe(testProps.errorMsg);
			expect(modalBodyInfo.props("description")).toBe(testProps.description);
		});

		it("should render error icon", () => {
			const wrapper = setup(false);

			const errorIcon = wrapper
				.findComponent(ModalBodyInfo)
				.findComponent(VIcon);

			expect(errorIcon.exists()).toBe(true);
			expect(errorIcon.props("icon")).toBe(mdiAlertCircle);
		});
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
