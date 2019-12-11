describe("Timezones", () => {
	it("tests should always run in Europe/Berlin timezone", () => {
		expect(process.env.TZ).toBe("Europe/Berlin");
		expect(new Date().getTimezoneOffset()).toBe(-60);
	});
});
