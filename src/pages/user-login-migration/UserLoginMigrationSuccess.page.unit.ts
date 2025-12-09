import UserLoginMigrationSuccessPage from "./UserLoginMigrationSuccess.page.vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { SYSTEMS_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mocked } from "vitest";

describe("UserLoginMigrationSuccess", () => {
	let systemsModule: Mocked<SystemsModule>;

	const setup = (props: { targetSystem: string }) => {
		const systemsMock: System[] = [
			{
				id: "sourceSystemId",
				name: "sourceSystem",
			},
			{
				id: "targetSystemId",
				name: "targetSystem",
			},
		];

		systemsModule = createModuleMocks(SystemsModule, {
			getSystems: systemsMock,
		});

		const wrapper = shallowMount(UserLoginMigrationSuccessPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SYSTEMS_MODULE_KEY.valueOf()]: systemsModule,
				},
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
					targetSystem: "targetSystemId",
				});

				const result: boolean = wrapper.findComponent(UserLoginMigrationSuccessPage).exists();

				expect(result).toEqual(true);
			});
		});

		describe("when the systems are loaded", () => {
			it("should show the description text", () => {
				const { wrapper } = setup({
					targetSystem: "targetSystemId",
				});

				const descriptionText = wrapper.get('[data-testid="text-description"]');

				expect(descriptionText.text()).toEqual(
					"pages.userMigration.success.description pages.userMigration.success.description.loginAgain"
				);
			});

			it("should show the 'back to login' button", () => {
				const { wrapper } = setup({
					targetSystem: "targetSystemId",
				});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual("pages.userMigration.success.login");
				expect(button.attributes().to).toEqual("/logout");
			});
		});
	});

	describe("Api", () => {
		describe("when mounting the component", () => {
			it("should fetch the systems", () => {
				setup({
					targetSystem: "targetSystemId",
				});

				expect(systemsModule.fetchSystems).toHaveBeenCalledWith();
			});
		});
	});
});
