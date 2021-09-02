import SchoolPolicies from "./SchoolPolicies";
import SchoolsModule from "@/store/schoolss";

// Utilities
import { mount } from "@vue/test-utils";

const generateMockStore = (options = {}) => ({
	schools: {
		getters: {
			getSchool: () => ({
				id: "1",
			}),
		},
	},
	"consent-versions": {
		getters: {
			getConsentVersions: () => {
				return options.consentVersions || [];
			},
			getLoading: () => {
				return options.loading || false;
			},
			getError: () => null,
		},
		actions: {
			fetchConsentVersions: jest.fn(),
		},
	},
});

const mockSchool = {
	_id: "1",
	name: "",
	fileStorageType: "",
	federalState: "",
	county: {
		antaresKey: "",
		_id: "",
		countyId: "",
		name: "",
		id: "",
	},
	systems: [],
	updatedAt: "",
	createdAt: "",
	__v: 0,
	currentYear: "",
	purpose: "",
	features: {
		rocketChat: false,
		videoconference: false,
		messenger: false,
		studentVisibility: false,
		messengerSchoolRoom: false,
		messengerStudentRoomCreate: false,
	},
	enableStudentTeamCreation: false,
	permissions: {},
	inMaintenance: false,
	documentBaseDir: "",
	isExternal: false,
	id: "",
	years: {},
	isTeamCreationByStudentsEnabled: false,
};

describe("SchoolPolicies", () => {
	beforeAll(() => {});

	it(...isValidComponent(SchoolPolicies));

	it("should have the right number of policies", () => {
		const mockStore = generateMockStore();
		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		expect(wrapper.findAll(".school-policy-expansion-panel")).toHaveLength(
			mockStore["consent-versions"].getters.getConsentVersions.length
		);
	});

	it("should trigger the fetchConsentVersions action", () => {
		SchoolsModule.setSchool(mockSchool);
		const mockStore = generateMockStore();
		mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		expect(
			mockStore["consent-versions"].actions.fetchConsentVersions
		).toHaveBeenCalledTimes(1);
		expect(
			mockStore["consent-versions"].actions.fetchConsentVersions.mock
				.calls[0][1].schoolId
		).toBe(SchoolsModule.getSchool.id);
	});

	it("should load skeleton while loading", () => {
		const mockStore = generateMockStore({ loading: true });
		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBe(true);
		expect(wrapper.find(".v-expansion-panels").exists()).toBe(false);
		expect(wrapper.find(".v-list-group").exists()).toBe(false);
	});

	it("should check behaviour with 0 policies", () => {
		const mockStore = generateMockStore({});
		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBe(false);
		expect(wrapper.find(".v-expansion-panels").exists()).toBe(false);
		expect(wrapper.find(".v-list-group").exists()).toBe(false);
	});

	it("should check behaviour with 1 policy", () => {
		const mockStore = generateMockStore({
			consentVersions: [
				{
					consentText: "This is an explanatory text",
					consentTypes: ["privacy"],
					publishedAt: "2020-01-01T00:00:00.000Z",
					title: "Title of this update of the privacy documents",
					versionNumber: "prv-1",
					_id: "5e2e96015f1e4f83f86e3560",
					// consentDataId: "5e2e96015f1e4f83f86e3560",
				},
			],
		});

		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBe(false);
		expect(wrapper.find(".v-expansion-panels").exists()).toBe(true);
		expect(wrapper.find(".v-list-group").exists()).toBe(false);
	});

	it("should check behaviour with more than 1 policies", () => {
		const mockStore = generateMockStore({
			consentVersions: [
				{
					consentText: "This is an explanatory text",
					consentTypes: ["privacy"],
					publishedAt: "2020-01-01T00:00:00.000Z",
					title: "Title of this update of the privacy documents",
					versionNumber: "prv-1",
					_id: "5e2e96015f1e4f83f86e3561",
					// consentDataId: "5e2e96015f1e4f83f86e3560",
				},
				{
					consentText: "This is a secondary explanatory text",
					consentTypes: ["privacy"],
					publishedAt: "2020-01-02T00:00:00.000Z",
					title: "Title of this second update of the privacy documents",
					versionNumber: "prv-2",
					_id: "5e2e96015f1e4f83f86e3562",
					// consentDataId: "5e2e96015f1e4f83f86e3560",
				},
				{
					consentText: "This is a third explanatory text",
					consentTypes: ["privacy"],
					publishedAt: "2020-01-03T00:00:00.000Z",
					title: "Title of this third update of the privacy documents",
					versionNumber: "prv-3",
					_id: "5e2e96015f1e4f83f86e3563",
					// consentDataId: "5e2e96015f1e4f83f86e3560",
				},
			],
		});

		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBe(false);
		expect(wrapper.find(".v-expansion-panels").exists()).toBe(true);
		expect(wrapper.find(".v-list-group").exists()).toBe(true);
	});

	it("clicking the button should turn addSchoolPolicyDialogIsOpen to true", () => {
		const mockStore = generateMockStore({
			consentVersions: [
				{
					consentText: "This is an explanatory text",
					consentTypes: ["privacy"],
					publishedAt: "2020-01-01T00:00:00.000Z",
					title: "Title of this update of the privacy documents",
					versionNumber: "prv-1",
					_id: "5e2e96015f1e4f83f86e3561",
					// consentDataId: "5e2e96015f1e4f83f86e3560",
				},
			],
		});

		// This removes/suppreses a warning about not being able to locate Vuetify's target [data-app].
		document.body.setAttribute("data-app", true);

		const wrapper = mount(SchoolPolicies, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.vm.$data.addSchoolPolicyDialogIsOpen).toBe(false);
		const button = wrapper.find(".my-8");
		button.trigger("click");
		expect(wrapper.vm.$data.addSchoolPolicyDialogIsOpen).toBe(true);
	});
});
