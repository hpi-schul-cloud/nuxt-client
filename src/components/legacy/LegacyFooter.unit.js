import LegacyFooter from "./LegacyFooter";

describe("@components/LegacyFooter", () => {
	it(...isValidComponent(LegacyFooter));

	it("links get rendered", () => {
		const wrapper = mount(LegacyFooter, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "link1",
						href: "/impressum",
					},
					{
						title: "link2",
						href: "/datenschutz",
					},
					{
						title: "link3",
						href: "/team",
					},
				],
			},
		});
		expect(wrapper.props().links).toHaveLength(3);
	});

	it("mail links get rendered", () => {
		const wrapper = mount(LegacyFooter, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				contacts: [
					{
						title: "mail1",
						href: "mailto:info@schulcloud.org",
					},
					{
						title: "mail2",
						href: "mailto:feedback@schulcloud.org",
					},
					{
						title: "mail3",
						href: "mailto:inhalte@schulcloud.org",
					},
				],
			},
		});
		expect(wrapper.props().contacts).toHaveLength(3);
	});

	it("computes right colWidth mobile", () => {
		global.innerWidth = 200;
		const wrapper = mount(LegacyFooter, {
			...createComponentMocks({ i18n: true }),
		});

		expect(wrapper.vm.colWidth).toBe("20rem");
	});
	it("computes right colWidth desktop, tablet", () => {
		global.innerWidth = 900;
		const wrapper = mount(LegacyFooter, {
			...createComponentMocks({ i18n: true }),
		});

		expect(wrapper.vm.colWidth).toBe("33rem");
	});
});
