import userIsTabbingMixin from "@mixins/userIsTabbing";

describe("@mixins/userIsTabbing", () => {
	it("$userIsTabbing is true when user has pressed tab key and not clicked since that", () => {
		const Component = {
			template: "<div/>",
		};

		const wrapper = mount(Component, {
			mixins: [userIsTabbingMixin],
		});

		window.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 9 }));
		expect(wrapper.vm.$userIsTabbing).toBe(true);
		window.dispatchEvent(new Event("click"));
		expect(wrapper.vm.$userIsTabbing).toBe(false);
	});
});
