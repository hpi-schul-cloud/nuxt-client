import TheTopBar from "./TheTopBar";

const mockActions = [
	{ type: "popupIcon", icon: "house", title: "test home", to: "home" },
	{ type: "text", title: "test away", href: "https://schul-cloud.org" },
	{
		type: "popupWithInitials",
		icon: "camera",
		title: "test action",
		event: "light-camera",
	},
];

describe("@components/legacy/TheTopBar", () => {
	it(...isValidComponent(TheTopBar));
	const $theme = {
		name: "test",
		logo: {
			app: "none",
		},
	};
	it("Render defaults", () => {
		const wrapper = shallowMount(TheTopBar, {
			mocks: {
				$theme,
			},
		});
		expect(wrapper.find(".action").exists()).toBe(false);
	});

	it("Render with links and buttons", () => {
		const wrapper = shallowMount(TheTopBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				actions: mockActions,
			},
			mocks: {
				$theme,
			},
		});
		expect(wrapper.findAll("base-button-stub")).toHaveLength(2);
		expect(wrapper.findAll("popup-icon-stub")).toHaveLength(1);
		expect(wrapper.findAll("button")).toHaveLength(1);
		wrapper.find("button").trigger("click");
		expect(wrapper.emitted("action")[0]).toStrictEqual(["light-camera"]);
		expect(wrapper.findAll(".item")).toHaveLength(4);
	});
	it("can switch to fullscreen mode", () => {
		const wrapper = mount(TheTopBar, {
			propsData: {
				fullscreenMode: true,
			},
		});

		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);

		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});
});
