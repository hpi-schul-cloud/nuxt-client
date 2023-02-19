import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import MigrationEndWarningCard from "./MigrationEndWarningCard.vue";
import Vue from "vue";

describe("MigrationEndWarningCard", () => {
	let wrapper: Wrapper<any>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(MigrationEndWarningCard as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
				mocks: {
					$t: (key: string): string => key,
				},
			}),
		});
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();

			expect(
				wrapper.findComponent(MigrationEndWarningCard).exists()
			).toBeTruthy();
		});
	});

	describe("when component is rendered", () => {
		it("should have 2 buttons", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationEndWarningCard);
			const cardButtonAgree = cardComponent.find(".agree-btn-end");
			const cardButtonDisagree = cardComponent.find(".disagree-btn-end");

			expect(cardButtonAgree.exists()).toBe(true);
			expect(cardButtonDisagree.exists()).toBe(true);
		});

		it("should have the right text elements ", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationEndWarningCard);

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

	describe("when agree-button is clicked", () => {
		it("should emit 2 events", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationEndWarningCard);
			const cardButtonAgree = cardComponent.find(".agree-btn-end");
			await cardButtonAgree.vm.$emit("click");

			expect(wrapper.emitted("end")).toHaveLength(1);
			expect(wrapper.emitted("set")).toHaveLength(1);
		});
	});

	describe("when disagree-button is clicked", () => {
		it("should emit 1 event", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationEndWarningCard);
			const cardButtonDisagree = cardComponent.find(".disagree-btn-end");
			await cardButtonDisagree.vm.$emit("click");

			expect(wrapper.emitted("end")).toHaveLength(1);
		});
	});
});
