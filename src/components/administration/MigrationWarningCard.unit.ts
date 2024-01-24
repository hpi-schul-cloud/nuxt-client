import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { mount } from "@vue/test-utils";
import MigrationWarningCard from "./MigrationWarningCard.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick } from "vue";

describe("MigrationWarningCard", () => {
	const setup = (value = "start") => {
		document.body.setAttribute("data-app", "true");
		const wrapper = mount(MigrationWarningCard, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: {
						getMigrationEndGracePeriod: () => 86400000,
					},
				},
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

			expect(wrapper.findComponent(MigrationWarningCard).exists()).toBeTruthy();
		});
	});

	describe("when value is start", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", async () => {
				const { wrapper } = setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=disagree-btn]"
				);

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", async () => {
				const { wrapper } = setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);

				await nextTick();

				expect(cardComponent.html()).toContain(
					"components.administration.adminMigrationSection.startWarningCard.title"
				);
				// TODO: fix this test
				// expect(cardComponent.text()).toContain(
				// 	"components.administration.adminMigrationSection.startWarningCard.text"
				// );
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.startWarningCard.agree"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.startWarningCard.disagree"
				);
			});
		});

		describe("when agree-button is clicked", () => {
			it("should emit 2 events", async () => {
				const { wrapper } = setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
				await cardButtonAgree.trigger("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				const { wrapper } = setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=agree-btn]"
				);
				await cardButtonDisagree.trigger("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
			});
		});
	});

	describe("when value is end", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", async () => {
				const { wrapper } = setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", async () => {
				const { wrapper } = setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);

				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.title"
				);

				// TODO: fix this test
				// expect(cardComponent.text()).toContain(
				// 	"components.administration.adminMigrationSection.endWarningCard.text"
				// );
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.agree"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.disagree"
				);
			});
		});

		describe("confirmation checkbox is rendered", () => {
			// TODO: fix this test
			it.skip("should enable agree-button when is checked", async () => {
				const { wrapper } = setup("end");

				const agreeButton = wrapper.find("[data-testid=agree-btn]");
				expect(agreeButton.attributes("disabled")).toBeTruthy();

				await wrapper
					.find("[data-testid=migration-confirmation-checkbox]")
					.trigger("click");

				expect(agreeButton.attributes("disabled")).toBeFalsy();
			});
		});

		describe("when agree-button is clicked", () => {
			it("should emit 2 events", async () => {
				const { wrapper } = setup("end");

				const buttons = wrapper.findAllComponents({ name: "VBtn" });

				await buttons[1].vm.$emit("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				const { wrapper } = setup("end");

				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);
				await cardButtonDisagree.trigger("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
			});
		});
	});
});
