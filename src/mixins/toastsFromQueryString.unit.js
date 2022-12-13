import toastsFromQueryString from "./toastsFromQueryString";
import NotifierModule from "@/store/notifier";
import { notifierModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";

describe("@/mixins/toastsFromQueryString", () => {
	beforeEach(() => {
		setupStores({
			notifierModule: NotifierModule,
		});
		jest.clearAllMocks();
	});
	it.each([
		["error", "errorMessage", undefined],
		["success", "successMessage", 5000],
		["info", "infoMessage", undefined],
	])("can show an toast of type %p", (type, message, duration) => {
		const notifierMock = jest.spyOn(notifierModule, "show");

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
			},
			mixins: [toastsFromQueryString],
		});
		const expectedResult = {
			status: type,
			text: message,
			timeout: 5000,
		};
		expect(notifierMock).toHaveBeenCalledWith(expectedResult);
	});

	it.each([[""], ["http://another.adress/abc/def"]])(
		"does not show a toast if request is coming from origin %p",
		(ref) => {
			const notifierMock = jest.spyOn(notifierModule, "show");

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
				},
				mixins: [toastsFromQueryString],
			});
			expect(notifierMock).not.toHaveBeenCalled();
		}
	);
});
