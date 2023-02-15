import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import MigrationStartWarningCard from "@/components/administration/MigrationStartWarningCard.vue";

describe("MigrationStartWarningCard", () => {
	let wrapper: Wrapper<any>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(MigrationStartWarningCard, {
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
				wrapper.findComponent(MigrationStartWarningCard).exists()
			).toBeTruthy();
		});
	});

	describe("when component is rendered", () => {
		it("should have 2 buttons", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationStartWarningCard);
			const cardButtonAgree = cardComponent.find(".agree-btn-start");
			const cardButtonDisagree = cardComponent.find(".disagree-btn-start");

			expect(cardButtonAgree.exists()).toBe(true);
			expect(cardButtonDisagree.exists()).toBe(true);
		});

		it("should have the right text elements ", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationStartWarningCard);

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
			const cardComponent = wrapper.findComponent(MigrationStartWarningCard);
			const cardButtonAgree = cardComponent.find(".agree-btn-start");
			await cardButtonAgree.vm.$emit("click");

			expect(wrapper.emitted("start")).toHaveLength(1);
			expect(wrapper.emitted("set")).toHaveLength(1);
		});
	});

	describe("when disagree-button is clicked", () => {
		it("should emit 1 event", async () => {
			setup();
			const cardComponent = wrapper.findComponent(MigrationStartWarningCard);
			const cardButtonDisagree = cardComponent.find(".disagree-btn-start");
			await cardButtonDisagree.vm.$emit("click");

			expect(wrapper.emitted("start")).toHaveLength(1);
		});
	});
});
