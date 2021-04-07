import { default as StudentPage } from "./index.vue";

describe("students/index", () => {
	// const mockStore = {
	// 	auth: {
	// 		state: () => ({
	// 			user: {
	// 				roles: [
	// 					{
	// 						name: "administrator",
	// 					},
	// 				],
	// 			},
	// 		}),
	// 	},
	// 	users: {
	// 		actions: {},
	// 		getters: {},
	// 		state: () => ({
	// 			list: [
	// 				{
	// 					_id: "0000d224816abba584714c9c",
	// 					firstName: "Marla",
	// 					lastName: "Mathe",
	// 					email: "schueler@schul-cloud.org",
	// 					createdAt: "2017-01-01T00:06:37.148Z",
	// 					birthday: "01.01.2000",
	// 					preferences: {},
	// 					consent: {
	// 						userConsent: {
	// 							form: "digital",
	// 							privacyConsent: true,
	// 							termsOfUseConsent: true,
	// 							dateOfPrivacyConsent: "2017-01-01T00:06:37.148Z",
	// 							dateOfTermsOfUseConsent: "2017-01-01T00:06:37.148Z",
	// 						},
	// 						parentConsents: [
	// 							{
	// 								_id: "5ece7de4a194604c6e31f434",
	// 								form: "digital",
	// 								privacyConsent: true,
	// 								termsOfUseConsent: true,
	// 								dateOfPrivacyConsent: "2017-01-01T00:06:37.148Z",
	// 								dateOfTermsOfUseConsent: "2017-01-01T00:06:37.148Z",
	// 							},
	// 						],
	// 					},
	// 					consentStatus: "ok",
	// 					classes: [],
	// 				},
	// 				{
	// 					_id: "58b40278dac20e0645353e3a",
	// 					firstName: "Waldemar",
	// 					lastName: "Wunderlich",
	// 					createdAt: "2017-01-01T00:06:37.148Z",
	// 					birthday: "01.01.1989",
	// 					preferences: {},
	// 					email: "waldemar.wunderlich@schul-cloud.org",
	// 					consent: {
	// 						parentConsents: [
	// 							{
	// 								_id: "5ece7de4a194604c6e31f433",
	// 								form: "analog",
	// 								privacyConsent: true,
	// 								termsOfUseConsent: true,
	// 								dateOfPrivacyConsent: "2017-01-01T00:06:37.148Z",
	// 								dateOfTermsOfUseConsent: "2017-01-01T00:06:37.148Z",
	// 							},
	// 						],
	// 					},
	// 					consentStatus: "missing",
	// 					classes: [],
	// 				},
	// 			],
	// 		}),
	// 	},
	// };

	it(...isValidComponent(StudentPage));

	// it("should render the fab-floating component if user is admin", async () => {
	// 	const wrapper = mount(StudentPage, {
	// 		...createComponentMocks({
	// 			store: mockStore,
	// 		}),
	// 	});
	// 	const fabComponent = wrapper.find(
	// 		'[data-testid="fab_button_students_table"]'
	// 	);
	// 	expect(fabComponent.exists()).toBe(true);
	// });
});
