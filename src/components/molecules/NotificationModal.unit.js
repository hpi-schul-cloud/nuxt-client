import NotificationModal from "@components/molecules/NotificationModal";
import { isValidComponent } from "@@/tests/unit/commonTests";

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
	description: "test description",
};

describe("@components/molecules/NotificationModal", () => {
	it(...isValidComponent(NotificationModal));

	it("success case", async () => {
		const wrapper = mount(NotificationModal, {
			propsData: { ...testProps, isSuccess: true },
			stubs: {
				BaseIcon: true,
			},
		});
		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.successMsg);
		expect(wrapper.find("baseicon-stub").element.attributes.icon.value).toBe(
			"check_circle"
		);
		expect(wrapper.find(".footer-button").classes("error")).toBe(false);
	});

	it("error case", async () => {
		const wrapper = mount(NotificationModal, {
			propsData: { ...testProps, isSuccess: false },
			stubs: {
				BaseIcon: true,
			},
		});
		expect(wrapper.find(".modal-description").text()).toBe(
			testProps.description
		);
		expect(wrapper.find(".modal-title").text()).toBe(testProps.errorMsg);
		expect(wrapper.find("baseicon-stub").element.attributes.icon.value).toBe(
			"error"
		);
		expect(wrapper.find(".footer-button").classes("error")).toBe(true);
	});
});
