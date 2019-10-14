import { mount } from "@vue/test-utils";
import BaseModalFooter from "./BaseModalFooter";

const modalFooter = {
	data: () => ({ active: false }),
	template: `
		<base-modal-footer class="footer-container" style="background-color: var(--color-tertiary)">
				<template v-slot:icons>

							<base-button class="button-icon" design="icon">
								<base-icon source="material" icon="delete_outline"/>
							</base-button>

							<base-button class="button-icon" design="icon">
								<base-icon source="material" icon="file_copy"/>
							</base-button>

							<base-button class="button-icon" design="icon">
								<base-icon source="material" icon="share"/>
							</base-button>

							<base-button class="button-icon" design="icon">
								<base-icon source="material" icon="info"/>
							</base-button>

						</template>
							<template v-slot:buttons>
								<base-button class="button-medium" @click="active = false">
									Abbrechen
								</base-button>
								<base-button class="button-medium" design="outline" @click="active = false"> Übernehmen</base-button>
			 			</template>
			</base-modal-footer>

	`,
	components: { BaseModalFooter },
};

describe("@components/BaseModalFooter", () => {
	it(...isValidComponent(BaseModalFooter));
});

it("contains 4 buttons with icons", () => {
	const wrapper = mount(modalFooter);
	expect(wrapper.find(".button-icon").exists()).toBe(true);

	expect(wrapper.findAll(".button-icon")).toHaveLength(4);
});

it("contains 2 other buttons", () => {
	const wrapper = mount(modalFooter);
	expect(wrapper.find(".button-medium").exists()).toBe(true);

	expect(wrapper.findAll(".button-medium")).toHaveLength(2);
});
