import RegistrationExternalMembersPage from "./RegistrationExternalMembers.page.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Registration } from "@feature-room";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

describe("RegistrationExternalMembersPage.vue", () => {
	const setup = () => {
		const wrapper = mount(RegistrationExternalMembersPage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { Registration: true },
			},
		});

		return { wrapper };
	};

	it("should be rendered", () => {
		const { wrapper } = setup();
		expect(wrapper).toBeDefined();
		expect(wrapper.text()).toContain("pages.registrationExternalMembers.steps.registration.title");
		expect(wrapper.findComponent(Registration).exists()).toBe(true);
	});

	it("should focus the title on mount", () => {
		const { wrapper } = setup();
		const title = wrapper.find({ ref: "registrationTitle" });

		expect(document.activeElement).toBe(title.element);
	});
});
