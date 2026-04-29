import UserLoginMigrationSuccessPage from "./UserLoginMigrationSuccess.page.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("UserLoginMigrationSuccess", () => {
	const setup = (props: { targetSystemId: string }) => {
		const wrapper = shallowMount(UserLoginMigrationSuccessPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	describe("Rendering", () => {
		describe("when all mandatory props are defined", () => {
			it("should render the component", () => {
				const { wrapper } = setup({
					targetSystemId: "targetSystemId",
				});

				const result: boolean = wrapper.findComponent(UserLoginMigrationSuccessPage).exists();

				expect(result).toEqual(true);
			});
		});

		describe("when the systems are loaded", () => {
			it("should show the description text", () => {
				const { wrapper } = setup({
					targetSystemId: "targetSystemId",
				});

				const descriptionText = wrapper.get('[data-testid="text-description"]');

				expect(descriptionText.text()).toEqual(
					"pages.userMigration.success.description pages.userMigration.success.description.loginAgain"
				);
			});

			it("should show the 'back to login' button", () => {
				const { wrapper } = setup({
					targetSystemId: "targetSystemId",
				});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual("pages.userMigration.success.login");
				expect(button.attributes().to).toEqual("/logout");
			});
		});
	});
});
