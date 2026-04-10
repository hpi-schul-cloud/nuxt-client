import MediaBoardDeletedElement from "./MediaBoardExternalToolDeletedElement.vue";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";
import { deletedElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { VBtn } from "vuetify/lib/components/index";

describe("MediaBoardDeletedElement", () => {
	const getWrapper = (props: ComponentProps<typeof MediaBoardDeletedElement>, stubThreeDotMenu = true) => {
		const wrapper = mount(MediaBoardDeletedElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			stubs: {
				MediaBoardExternalToolElementMenu: stubThreeDotMenu,
			},
		});

		return {
			wrapper,
		};
	};

	describe("three dot menu", () => {
		describe("when clicking on the the three dot menu", () => {
			const setupOverlayDiv = () => {
				const overlayDiv = document.createElement("div");
				overlayDiv.className = "v-overlay-container";
				document.body.append();
			};

			const setup = () => {
				const deletedElement = deletedElementResponseFactory.build();

				const { wrapper } = getWrapper(
					{
						element: deletedElement,
					},
					false
				);

				setupOverlayDiv();

				return {
					wrapper,
				};
			};

			afterEach(() => {
				document.body.innerHTML = "";
			});

			it("should show the delete action", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.getComponent(MediaBoardExternalToolElementMenu).getComponent(VBtn);
				await menuBtn.trigger("click");

				const deleteAction = wrapper.findComponent(KebabMenuAction);

				expect(deleteAction.exists()).toEqual(true);
			});
		});

		describe("when deleting the element from the menu", () => {
			const setup = () => {
				const deletedElement = deletedElementResponseFactory.build();

				const { wrapper } = getWrapper({
					element: deletedElement,
				});

				return {
					wrapper,
					deletedElement,
				};
			};

			it("should emit a delete event", async () => {
				const { wrapper, deletedElement } = setup();

				const menu = wrapper.getComponent(MediaBoardExternalToolElementMenu);
				menu.vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toEqual([[deletedElement.id]]);
			});
		});
	});
});
