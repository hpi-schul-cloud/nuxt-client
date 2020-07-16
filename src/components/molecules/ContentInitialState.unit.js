import ContentInitialState from "./ContentInitialState";

describe("@components/molecules/ContentInitialState", () => {
	const wrapper = mount(ContentInitialState, {
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(ContentInitialState));

	// eslint-disable-next-line jest/no-commented-out-tests
	it("Renders an image", () => {
		console.log(wrapper.html());
		expect(wrapper.find(".img-container").exists()).toBe(true);
		expect(wrapper.find(".img-container img").attributes("alt")).toBe(
			"Initial state Image"
		);
	});
	it("Provides proper title", () => {
		expect(wrapper.find(".title").exists()).toBe(true);
		expect(wrapper.find(".title").text()).toBe(
			"Willkommen im neuen Lern-Store!"
		);
	});
	it("Provides proper message", () => {
		expect(wrapper.find(".description").exists()).toBe(true);
		expect(wrapper.find(".description").text()).toBe(
			"Was ist NEU? Ab sofort findest du hier hochwertige Inhalte von unserem Partner WirLernenOnline und noch viel mehr.Was kommt als nächstes? Durch die Anbindung von Antares Content Access ermöglichen wir die leichte Einbindung tausender lizensierter Inhalte direkt in der HPI Schul-Cloud.Exclusive Inhalte für einzelne Bundesländer durch die Erschließung der Inhalte verschiedener Landesmedienzentren.Unser Ziel ist die technische Bereitstellung möglichst aller digitalen Materialbestände, die Schulen und Unterrichtspraxis gesichert helfen können – im Interesse aller allgemeinbildenden Schulformen, aller Fächer und aller Kompetenzbereiche, aus dem Bereich OER sowie von etablierten Verlagen und Bildungsproduzenten."
		);
	});
});
