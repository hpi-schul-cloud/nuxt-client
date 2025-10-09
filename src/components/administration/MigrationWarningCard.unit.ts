import MigrationWarningCard from "./MigrationWarningCard.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

describe("MigrationWarningCard", () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});

	const setup = (value = "start") => {
		document.body.setAttribute("data-app", "true");
		const wrapper = mount(MigrationWarningCard, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				value,
			},
		});

		return { wrapper };
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBeTruthy();
		});
	});

	describe("when value is start", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", () => {
				const { wrapper } = setup();
				const cardButtonAgree = wrapper.find("[data-testId=agree-btn]");
				const cardButtonDisagree = wrapper.find("[data-testId=disagree-btn]");

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", () => {
				const { wrapper } = setup();

				const infoText = wrapper.find('[data-testid="migration-warning-card-info-text"');

				expect(wrapper.html()).toContain("components.administration.adminMigrationSection.startWarningCard.title");
				expect(infoText.text()).toContain("components.administration.adminMigrationSection.startWarningCard.text");
				expect(wrapper.text()).toContain("components.administration.adminMigrationSection.startWarningCard.agree");
				expect(wrapper.text()).toContain("components.administration.adminMigrationSection.startWarningCard.disagree");
			});
		});

		describe("when agree-button is clicked", () => {
			it("should emit 2 events", async () => {
				const { wrapper } = setup();
				const cardButtonAgree = wrapper.find("[data-testId=agree-btn]");
				await cardButtonAgree.trigger("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				const { wrapper } = setup();
				const cardButtonDisagree = wrapper.find("[data-testId=agree-btn]");
				await cardButtonDisagree.trigger("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
			});
		});
	});

	describe("when value is end", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", () => {
				const { wrapper } = setup("end");
				const cardButtonAgree = wrapper.find("[data-testid=agree-btn]");
				const cardButtonDisagree = wrapper.find("[data-testid=disagree-btn]");

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", () => {
				const { wrapper } = setup("end");

				const infoText = wrapper.find('[data-testid="migration-warning-card-info-text"');

				expect(wrapper.text()).toContain("components.administration.adminMigrationSection.endWarningCard.title");
				expect(infoText.text()).toContain("components.administration.adminMigrationSection.endWarningCard.text");
				expect(wrapper.text()).toContain("components.administration.adminMigrationSection.endWarningCard.agree");
				expect(wrapper.text()).toContain("components.administration.adminMigrationSection.endWarningCard.disagree");
			});
		});

		describe("confirmation checkbox is rendered", () => {
			it("should enable agree-button when is checked", async () => {
				const { wrapper } = setup("end");

				const buttons = wrapper.findAllComponents({ name: "v-btn" });

				expect(buttons[1].props("disabled")).toBeTruthy();

				const checkbox = wrapper.findComponent({ name: "v-checkbox" });

				await checkbox.setValue(true);

				expect(buttons[1].props("disabled")).toBeFalsy();
			});
		});

		describe("when agree-button is clicked", () => {
			it("should emit 2 events", async () => {
				const { wrapper } = setup("end");

				// Checkbox needs to be checked before agree-button can be clicked
				const checkbox = wrapper.findComponent({ name: "v-checkbox" });
				await checkbox.setValue(true);

				const cardButtonAgree = wrapper.find("[data-testid=agree-btn]");
				await cardButtonAgree.trigger("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				const { wrapper } = setup("end");

				const cardButtonDisagree = wrapper.find("[data-testid=disagree-btn]");
				await cardButtonDisagree.trigger("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
			});
		});
	});
});
