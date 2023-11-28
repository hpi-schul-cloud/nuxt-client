import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";
import DrawingContentElement from "./DrawingContentElement.vue";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import NotifierModule from "@/store/notifier";
import EnvConfigModule from "@/store/env-config";
import { Envs } from "@/store/types/env-config";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

const DRAWING_ELEMENT: DrawingElementResponse = {
	id: "test-id",
	type: ContentElementType.Drawing,
	content: {
		description: "DrawingDescription",
	},
	timestamps: {
		createdAt: new Date().toISOString(),
		lastUpdatedAt: new Date().toISOString(),
	},
};

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<Envs>({
		FEATURE_TLDRAW_ENABLED: true,
	}),
});

describe("DrawingContentElement", () => {
	let wrapper: Wrapper<Vue>;
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: DrawingElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(DrawingContentElement as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
			},
		});
	};

	describe("when component is mounted", () => {
		it("renders display with correct props in view mode", () => {
			setup({ element: DRAWING_ELEMENT, isEditMode: false });
			expect(wrapper.findComponent(DrawingContentElementDisplay).exists()).toBe(
				true
			);
		});

		it("renders edit with correct props in edit mode", () => {
			setup({ element: DRAWING_ELEMENT, isEditMode: true });
			expect(wrapper.findComponent(DrawingContentElementEdit).exists()).toBe(
				true
			);
		});

		describe("when arrow key up is pressed", () => {
			describe("when component is in edit-mode", () => {
				beforeEach(() => {
					setup({ element: DRAWING_ELEMENT, isEditMode: true });
				});

				it('should NOT emit "move-keyboard:edit"', async () => {
					wrapper.findComponent(DrawingContentElement).vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowUp",
							keyCode: 38,
						})
					);

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				});

				it("should hide the element", () => {
					expect(
						wrapper.findComponent(DrawingContentElement).isVisible()
					).toEqual(true);
				});
			});
		});
	});
});
