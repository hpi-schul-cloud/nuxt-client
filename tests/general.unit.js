describe("Timezones", () => {
	it("should always be Europe/Berlin", () => {
		expect(process.env.TZ).toBe("UTC");
		expect(new Date().getTimezoneOffset()).toBe(0);
	});
});
