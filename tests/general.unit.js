xdescribe("Timezones", () => {
	// Not working at all under windows and GitHub Actions
	it("tests should always run in Europe/Berlin timezone", () => {
		expect(process.env.TZ).toBe("Europe/Berlin");
		expect(new Date().getTimezoneOffset()).toBe(-60);
	});
});
