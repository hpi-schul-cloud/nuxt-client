import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import MigrationWarningCard from "./MigrationWarningCard.vue";

describe("MigrationWarningCard", () => {
	let wrapper: Wrapper<Vue<Record<string, typeof MigrationWarningCard>>>;

	const setup = (value = "start") => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(MigrationWarningCard as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
				mocks: {
					$t: (key: string): string => key,
				},
			}),
			provide: {
				[ENV_CONFIG_MODULE_KEY.valueOf()]: {
					getMigrationEndGracePeriod: () => 86400000,
				},
			},
			propsData: {
				value,
			},
		});
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();

			expect(wrapper.findComponent(MigrationWarningCard).exists()).toBeTruthy();
		});
	});

	describe("when value is start", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", async () => {
				setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=disagree-btn]"
				);

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", async () => {
				setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);

				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.startWarningCard.title"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.startWarningCard.text"
				);
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
				setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
				await cardButtonAgree.vm.$emit("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				setup();
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=agree-btn]"
				);
				await cardButtonDisagree.vm.$emit("click");

				expect(wrapper.emitted("start")).toHaveLength(1);
			});
		});
	});

	describe("when value is end", () => {
		describe("when component is rendered", () => {
			it("should have 2 buttons", async () => {
				setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);

				expect(cardButtonAgree.exists()).toBe(true);
				expect(cardButtonDisagree.exists()).toBe(true);
			});

			it("should have the right text elements ", async () => {
				setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);

				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.title"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.text"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.agree"
				);
				expect(cardComponent.text()).toContain(
					"components.administration.adminMigrationSection.endWarningCard.disagree"
				);
			});
		});

		describe("confirmation checkbox is rendered", () => {
			it("should enable agree-button when is checked", async () => {
				setup("end");

				const agreeButton = wrapper.find("[data-testid=agree-btn]");
				expect(agreeButton.attributes("disabled")).toBeTruthy();

				await wrapper
					.find("[data-testid=migration-confirmation-checkbox]")
					.setChecked(true);

				expect(agreeButton.attributes("disabled")).toBeFalsy();
			});
		});

		describe("when agree-button is clicked", () => {
			it("should emit 2 events", async () => {
				setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
				await cardButtonAgree.vm.$emit("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
				expect(wrapper.emitted("set")).toHaveLength(1);
			});
		});

		describe("when disagree-button is clicked", () => {
			it("should emit 1 event", async () => {
				setup("end");
				const cardComponent = wrapper.findComponent(MigrationWarningCard);
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);
				await cardButtonDisagree.vm.$emit("click");

				expect(wrapper.emitted("end")).toHaveLength(1);
			});
		});
	});
});
