import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import SchoolsModule from "@/store/schools";
import EnvConfigModule from "@/store/env-config";

describe("AdminMigrationSection", () => {
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;

	const setup = (schoolGetters: Partial<SchoolsModule> = {}) => {
		document.body.setAttribute("data-app", "true");
		schoolsModule = createModuleMocks(SchoolsModule, {
			getOauthMigration: {
				enableMigrationStart: false,
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
			},
			...schoolGetters,
		}) as jest.Mocked<SchoolsModule>;

		envConfigModule = createModuleMocks(EnvConfigModule);

		const wrapper: Wrapper<any> = mount(AdminMigrationSection, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
				schoolsModule,
				envConfigModule,
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
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

			try {
				shallowMount(AdminMigrationSection, {
					provide: {
						i18n: { t: (key: string) => key },
					},
				});
				// eslint-disable-next-line no-empty
			} catch (e) {}

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				expect.stringMatching(
					/\[Vue warn]: Error in setup: "Error: Injection of dependencies failed"/
				)
			);

			consoleErrorSpy.mockRestore();
		});

		it("should throw an error when i18n injection fails", () => {
			expect(() => {
				shallowMount(AdminMigrationSection, {
					provide: {
						schoolsModule,
					},
				});
			}).toThrow();
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

	describe("Info Text", () => {
		it("should display the info text for migration when it is not started", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.infoText"
			);
		});

		it("should display the info text activeMigration when the admin activated the migration", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.migrationActive"
			);
		});
	});

	describe("Mandatory Switch", () => {
		it("should be enabled when migration is available", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not available", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeTruthy();
		});

		it("should set school oauth migration to mandatory, when click have been triggered", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", true);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: true,
				oauthMigrationFinished: false,
			});
		});

		it("should set school oauth migration to optional, when click has been triggered again", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: true,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", false);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: false,
			});
		});
	});

	describe("Migration start button", () => {
		it("should be enabled when migration is enabled", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not enabled", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeTruthy();
		});

		it("should be disabled when grace period is expired", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: new Date(2023, 1, 1).toString(),
					oauthMigrationFinalFinish: new Date(2023, 1, 2).toString(),
				},
			});
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 3));

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeTruthy();
		});

		it("should not render migration start button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.vm.$emit("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration end button", () => {
		it("should exist and be enabled when migration has started", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-end")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEndButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should should not render migration end button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.vm.$emit("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration warning card", () => {
		describe("when migration start button is clicked", () => {
			it("should be rendered", async () => {
				const { wrapper } = setup({
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				});
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});
		});
	});

	describe("when agree button of card is clicked", () => {
		it("should not render the card and start migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
			await cardButtonAgree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: false,
			});
		});
	});

	describe("when disagree button of card is clicked", () => {
		it("should not render the card and not start migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonDisagree = cardComponent.find(
				"[data-testId=disagree-btn]"
			);
			await cardButtonDisagree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.getOauthMigration).toStrictEqual({
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
				enableMigrationStart: true,
			});
		});
	});

	describe("when migration end button is clicked", () => {
		it("should be rendered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });

			expect(cardComponent.exists()).toBe(true);
		});
	});

	describe("when agree button of card is clicked", () => {
		it("should not render the card and complete migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
			await cardButtonAgree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: true,
			});
		});
	});

	describe("when disagree button of card is clicked", () => {
		it("should not render the card and not complete migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonDisagree = cardComponent.find(
				"[data-testid=disagree-btn]"
			);
			await cardButtonDisagree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.getOauthMigration).toStrictEqual({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
				enableMigrationStart: true,
			});
		});
	});

	describe("when checkbox is unchecked", () => {
		it("should let agree-button be disabled", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");

			expect(cardButtonAgree.props("disabled")).toBeTruthy();
		});
	});

	describe("when checkbox is checked", () => {
		it("should make agree-button be enabled", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const checkBoxComponent = cardComponent.find(
				"[data-testid=migration-confirmation-checkbox]"
			);
			await checkBoxComponent.setChecked();

			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");

			expect(cardButtonAgree.props("disabled")).toBeFalsy();
		});
	});

	describe("Date paragraph", () => {
		it("should exist when migration has been completed", async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 2));
			const date: string = new Date(2023, 1, 1).toDateString();
			const laterDate: string = new Date(2023, 1, 3).toDateString();
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: date,
					oauthMigrationFinalFinish: laterDate,
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(true);
			expect(paragraph.text()).toEqual(
				`components.administration.adminMigrationSection.oauthMigrationFinished.text`
			);
		});

		it("should show finalFinish text when migration grace period has expired", async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 4));
			const date: string = new Date(2023, 1, 1).toDateString();
			const laterDate: string = new Date(2023, 1, 3).toDateString();
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: date,
					oauthMigrationFinalFinish: laterDate,
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(true);
			expect(paragraph.text()).toEqual(
				`components.administration.adminMigrationSection.oauthMigrationFinished.textComplete`
			);
		});

		it("should not exist when migration has not been completed", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(false);
		});
	});
});
