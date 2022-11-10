import PopupIcon from "./PopupIcon";

const testProps = { source: "fa", icon: "pencil", fill: "red", centered: true };

describe("@components/legacy/BaseIcon", () => {
	it(...isValidComponent(PopupIcon));
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
		expect(wrapper.find(".fa-pencil").exists()).toBe(true);
		expect(wrapper.find("svg").exists()).toBe(false);
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
