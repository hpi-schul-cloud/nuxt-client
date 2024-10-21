import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiClose } from "@icons/material";
import { mount, VueWrapper } from "@vue/test-utils";
import { DefineComponent, defineComponent, nextTick } from "vue";
import { VBtn } from "vuetify/lib/components/index.mjs";
import SpeedDialMenu from "./SpeedDialMenu.vue";
import SpeedDialMenuAction from "./SpeedDialMenuAction.vue";

const componentWithFlatSlots = defineComponent({
	components: {
		SpeedDialMenu,
		SpeedDialMenuAction,
	},
	template: `
  <template>
    <SpeedDialMenu :icon="mdiClose">
      DefaultSlotLabel
      <template #actions>
        <SpeedDialMenuAction :icon="mdiClose" :href="'example.com'">Action1</SpeedDialMenuAction>
        <SpeedDialMenuAction :icon="mdiClose" :to="'example.com'">Action2</SpeedDialMenuAction>
        <SpeedDialMenuAction :icon="mdiClose">Action3</SpeedDialMenuAction>
      </template>
    </SpeedDialMenu>
    <button id="clickOutside">Test</button>
  </template>
  `,
	setup() {
		return {
			mdiClose,
		};
	},
});

const componentWithIteratedSlots = defineComponent({
	components: {
		SpeedDialMenu,
		SpeedDialMenuAction,
	},
	template: `
  <template>
    <SpeedDialMenu :icon="mdiClose">
      DefaultSlotLabel
      <template #actions>
        <SpeedDialMenuAction v-for="(action, index) in actions" 
         :key="index" 
         :icon="action.icon"
         :href="action.href"
        > {{ action.label }}
        </SpeedDialMenuAction>
      </template>
    </SpeedDialMenu>
    <button id="clickOutside">Test</button>
  </template>
  `,
	setup() {
		const actions = [
			{ label: "Action1", icon: mdiClose, href: "example.com" },
			{ label: "Action2", icon: mdiClose, to: "example.com" },
			{ label: "Action3", icon: mdiClose },
		];

		return {
			actions,
			mdiClose,
		};
	},
});

describe("SpeedDialMenu", () => {
	const setup = ({
		component,
	}: {
		component: DefineComponent<any, any, any>;
	}) => {
		const slot = "TestSlot";
		const wrapper = mount(component, {
			global: {
				plugins: [createTestingVuetify()],
			},
		});

		return {
			wrapper,
			slot,
		};
	};

	const toggleMenu = async (wrapper: VueWrapper) => {
		const menu = await wrapper.findComponent(SpeedDialMenu);
		const menuButton = await menu.findComponent(VBtn);
		await menuButton.trigger("click");
		await nextTick();
	};

	it.each([
		{ type: "hardcoded Slots", component: componentWithFlatSlots },
		{ type: "iterated Slots", component: componentWithIteratedSlots },
	])("should render with $type", async ({ component }) => {
		const { wrapper } = setup({ component });

		const result = await wrapper.findComponent(SpeedDialMenu);
		expect(result).toBeTruthy();
	});

	it.each([
		{ type: "hardcoded Slots", component: componentWithFlatSlots },
		{ type: "iterated Slots", component: componentWithIteratedSlots },
	])(
		"should open and close menu on click with $type",
		async ({ component }) => {
			jest.useFakeTimers();
			const { wrapper } = setup({ component });

			// --- Open
			await toggleMenu(wrapper);

			const actionsAfterOpen =
				await wrapper.findAllComponents(SpeedDialMenuAction);
			expect(actionsAfterOpen).toHaveLength(3);

			// --- Close
			await toggleMenu(wrapper);

			const actionsAfterClose =
				await wrapper.findAllComponents(SpeedDialMenuAction);
			expect(actionsAfterClose).toHaveLength(0);
		}
	);

	it.each([
		{ type: "hardcoded Slots", component: componentWithFlatSlots },
		{ type: "iterated Slots", component: componentWithIteratedSlots },
	])(
		"should provide incremental index to actions with $type",
		async ({ component }) => {
			jest.useFakeTimers();
			const { wrapper } = setup({ component });

			// --- Open
			await toggleMenu(wrapper);

			const actionsAfterOpen =
				await wrapper.findAllComponents(SpeedDialMenuAction);

			actionsAfterOpen.forEach((action, index) => {
				expect(action.props("speedDialIndex")).toEqual(index);
			});
		}
	);

	it.each([
		{ type: "hardcoded Slots", component: componentWithFlatSlots },
		{ type: "iterated Slots", component: componentWithIteratedSlots },
	])(
		"should render labels in default slots for menu-button with $type",
		async ({ component }) => {
			jest.useFakeTimers();
			const { wrapper } = setup({ component });

			const menu = await wrapper.findComponent(SpeedDialMenu);
			const menuButton = await menu.findComponent(VBtn);

			expect(menuButton.text()).toEqual("DefaultSlotLabel");
		}
	);

	describe("when component has no actions", () => {
		it("should emit 'fab:clicked' after click the fab button", async () => {
			const wrapper = mount(SpeedDialMenu, {
				global: { plugins: [createTestingVuetify()] },
			});

			wrapper.setProps({ icon: mdiClose });

			const button = wrapper.findComponent({ name: "v-btn" });
			await button.trigger("click");
			expect(wrapper.emitted("fab:clicked")).toHaveLength(1);
		});
	});
});
