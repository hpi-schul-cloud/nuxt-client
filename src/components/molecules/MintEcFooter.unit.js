import MintEcFooter from "./MintEcFooter";

describe("@components/MintEcFooter", () => {
	it(...isValidComponent(MintEcFooter));

	it("chapertes get rendered", () => {
		const wrapper = mount(MintEcFooter, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				chapters: [
					{
						title: "title1",
						href: "/mint-ec/schule-informieren",
					},
					{
						title: "title2",
						href: "/mint-ec/unterricht-gestalten",
					},
					{
						title: "title3",
						href: "/mint-ec/kollegium-mitnehmen",
					},
				],
			},
		});
		expect(wrapper.props().chapters).toHaveLength(3);
	});

	it("computes right colWidth mobile", () => {
		global.innerWidth = 200;
		const wrapper = mount(MintEcFooter, {
			...createComponentMocks({ i18n: true }),
		});

		expect(wrapper.vm.colWidth).toBe("20rem");
	});
	it("computes right colWidth desktop, tablet", () => {
		global.innerWidth = 900;
		const wrapper = mount(MintEcFooter, {
			...createComponentMocks({ i18n: true }),
		});

		expect(wrapper.vm.colWidth).toBe("33rem");
	});
});
