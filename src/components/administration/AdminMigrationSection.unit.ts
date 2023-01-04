import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import SchoolsModule from "@/store/schools";
import VueI18n from "vue-i18n";

describe("AdminMigrationSection", () => {
	let schoolsModule: jest.Mocked<SchoolsModule>;

	const setup = (schoolGetters: Partial<SchoolsModule> = {}) => {
		document.body.setAttribute("data-app", "true");
		schoolsModule = createModuleMocks(SchoolsModule, {
			getOauthMigrationAvailable: false,
			getOauthMigration: false,
			...schoolGetters,
		}) as jest.Mocked<SchoolsModule>;

		const wrapper: Wrapper<any> = shallowMount(AdminMigrationSection, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("schoolsModule", schoolsModule);
			},
		});

		return {
			wrapper,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(AdminMigrationSection).exists()).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when schoolsModule injection fails", () => {
			try {
				shallowMount(AdminMigrationSection, {
					setup() {
						provide("i18n", VueI18n);
					},
				});
			} catch (e) {
				expect(
					(e as Error).message.includes('Injection "schoolsModule" not found')
				).toBeTruthy();
			}
		});

		it("should throw an error when i18n injection fails", () => {
			try {
				shallowMount(AdminMigrationSection, {
					setup() {
						provide("schoolsModule", SchoolsModule);
					},
				});
			} catch (e) {
				expect(
					(e as Error).message.includes('Injection "i18n" not found')
				).toBeTruthy();
			}
		});
	});

	describe("t", () => {
		it("should return translation", () => {
			const { wrapper } = setup({});
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", () => {
			const { wrapper } = setup({});
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
		});
	});

	describe("Switch Button", () => {
		it("should be enabled when migration is available", () => {
			const { wrapper } = setup({
				getOauthMigrationAvailable: true,
			});
			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not available", () => {
			const { wrapper } = setup();

			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.props("disabled")).toBeTruthy();
		});

		it("should set school oauth migration, when click have been triggered", () => {
			const { wrapper } = setup({
				getOauthMigrationAvailable: true,
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", true);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith(true);
		});

		it("should set school oauth migration, when click have been triggered again", () => {
			const { wrapper } = setup({
				getOauthMigrationAvailable: true,
				getOauthMigration: true,
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", false);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith(false);
		});
	});

	describe("Info Text", () => {
		it("should display the info text", () => {
			const { wrapper } = setup({
				getOauthMigrationAvailable: true,
			});

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.infoText"
			);
		});
	});
});
