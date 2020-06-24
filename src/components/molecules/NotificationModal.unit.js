import Vuex from 'vuex';
import NotificationModal from "@components/molecules/NotificationModal";
import { isValidComponent } from "@@/tests/unit/commonTests";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
	description: "test description",
};

describe("@components/molecules/NotificationModal", () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            closeModal: jest.fn(),
            close: jest.fn()
        }

        store = new Vuex.Store({
            actions
        });
    });

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

	it.skip("executes close action after close", async() => {
		const wrapper = mount(NotificationModal, {
			store, localVue,
			propsData: { ...testProps, isSuccess: false },
			stubs: {
				BaseIcon: true,
			},
		});
		const button = wrapper.find('.btn-confirm');
		button.trigger('click');
		await wrapper.vm.$nextTick();
		//TODO: check why this doesn't work
		expect(actions.close).toHaveBeenCalled();
	});
});
