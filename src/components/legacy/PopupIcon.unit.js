import PopupIcon from "./PopupIcon";

const testProps = {
	icon: "qrcode",
	fill: "red",
	centered: true,
};

describe("@/components/legacy/PopupIcon", () => {
	it(
		...rendersSlotContent(PopupIcon, ["default"], {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: testProps,
		})
	);

	it("contains an icon", () => {
		const wrapper = mount(PopupIcon, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: testProps,
		});

		const popupIcon = wrapper.find(".popup .v-icon");
		expect(popupIcon.exists()).toBe(true);
		expect(popupIcon.element.innerHTML).toBe(testProps.icon);
	});

	it("it pops up when it is clicked", async () => {
		const wrapper = mount(PopupIcon, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			propsData: testProps,
		});

		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).toContain("visible");
		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).not.toContain("visible");
	});
});
