import TheTopBar from "./TheTopBar";

describe("@components/TheTopBar", () => {
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
		expect(wrapper.find(".page-title").text()).toBe("HPI Schul-Cloud");
		expect(wrapper.find(".action").exists()).toBe(false);
	});

	it("Render with links and buttons", () => {
		const mockActions = [
			{ icon: "house", title: "test home", to: "home" },
			{ title: "test away", href: "https://schul-cloud.org" },
			{ title: "test action", event: "light-camera" },
		];
		const wrapper = shallowMount(TheTopBar, {
			propsData: {
				actions: mockActions,
			},
			mocks: {
				$theme,
			},
		});
		expect(wrapper.findAll("base-link-stub").length).toBe(2);
		expect(wrapper.findAll("base-button-stub").length).toBe(1);
		expect(wrapper.find("base-link-stub").text()).toBe(mockActions[0].title);
		wrapper.find("base-button-stub").vm.$emit("click");
		expect(wrapper.emitted("action")[0]).toEqual(["light-camera"]);
		expect(wrapper.findAll(".action").length).toBe(3);
	});
});
