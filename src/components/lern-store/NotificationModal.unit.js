import Vuex from "vuex";
import NotificationModal from "@/components/molecules/NotificationModal";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
	description: "test description",
};

describe("@/components/molecules/NotificationModal", () => {
	let wrapper;

	const setup = (isSuccess) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(NotificationModal, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: {
				...testProps,
				isSuccess,
			},
		});
	};
	it("success case", async () => {
		setup(true);

		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.successMsg);
		expect(
			wrapper
				.find(".material-icon")
				.element.innerHTML.includes("$mdiCheckCircle")
		).toBe(true);
		setTimeout(() => {
			expect(wrapper.find(".footer-button").attributes("style")).toBe(
				"background-color:rgba(var(--v-theme-success))"
			);
		}, 200);
	});

	it("error case", async () => {
		setup(false);

		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.errorMsg);
		expect(
			wrapper
				.find(".material-icon")
				.element.innerHTML.includes("$mdiAlertCircle")
		).toBe(true);
		setTimeout(() => {
			expect(wrapper.find(".footer-button").attributes("style")).toBe(
				"background-color: rgba(var(--v-theme-error))"
			);
		}, 200);
	});

	it("executes close action after close", async () => {
		setup(false);

		const button = wrapper.find(".btn-confirm");
		button.trigger("click");
		await wrapper.vm.$nextTick();
		expect(
			wrapper.findComponent(NotificationModal).emitted("close")
		).toHaveLength(1);
		expect(
			wrapper
				.findComponent(NotificationModal)
				.emitted("update:show-notification-modal")
		).toHaveLength(1);
	});
});
