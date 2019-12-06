describe("Timezones", () => {
	it("should always be Europe/Berlin", () => {
		expect(process.env.TZ).toBe("Europe/Berlin");
		expect(new Date().getTimezoneOffset()).toBe(-60);
	});
});
