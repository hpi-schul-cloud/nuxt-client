import toastsFromQueryString from "./toastsFromQueryString";

describe("@/mixins/toastsFromQueryString", () => {
	it.each([
		["error", "errorMessage", undefined],
		["success", "successMessage", 2000],
		["info", "infoMessage", undefined],
		["show", "showMessage", undefined],
	])("can show an toast of type %p", (type, message, duration) => {
		const toastMock = jest.fn();
		shallowMount({
			template: "<div/>",
			beforeMount() {
				Object.defineProperty(document, "referrer", {
					configurable: true, // defaults to false
					writable: false,
					value: "http://schul-cloud.com",
				});
				Object.defineProperty(location, "origin", {
					configurable: true, // defaults to false
					writable: false,
					value: "http://schul-cloud.com",
				});
				this.$route = {
					query: {
						"toast-type": type,
						"toast-message": message,
						"toast-duration": duration,
					},
				};
				this.$toast = {
					[type]: toastMock,
				};
			},
			mixins: [toastsFromQueryString],
		});
		expect(toastMock).toHaveBeenCalledWith(message, {
			duration: duration || 5000,
		});
	});

	it.each([[""], ["http://another.adress/abc/def"]])(
		"does not show a toast if request is coming from origin %p",
		(ref) => {
			const errorToastMock = jest.fn();
			shallowMount({
				template: "<div/>",
				beforeMount() {
					Object.defineProperty(document, "referrer", {
						configurable: true, // defaults to false
						writable: false,
						value: ref,
					});
					Object.defineProperty(location, "origin", {
						configurable: true, // defaults to false
						writable: false,
						value: "http://schul-cloud.com",
					});
					this.$route = {
						query: {
							"toast-type": "error",
							"toast-message": "test",
						},
					};
					this.$toast = {
						error: errorToastMock,
					};
				},
				mixins: [toastsFromQueryString],
			});
			expect(errorToastMock).not.toHaveBeenCalled();
		}
	);
});
