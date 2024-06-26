import { shallowMount } from "@vue/test-utils";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { createMock } from "@golevelup/ts-jest";
import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";
import DrawingContentElement from "./DrawingContentElement.vue";
import NotifierModule from "@/store/notifier";
import EnvConfigModule from "@/store/env-config";
import { ConfigResponse } from "@/serverApi/v3/api";
import InnerContent from "./InnerContent.vue";
import AuthModule from "@/store/auth";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

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
	getEnv: createMock<ConfigResponse>({
		FEATURE_TLDRAW_ENABLED: true,
	}),
});

describe("DrawingContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: DrawingElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: ["teacher"],
		});

		const wrapper = shallowMount(DrawingContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			propsData: props,
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("renders correctly", () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
			});
			expect(wrapper.findComponent(InnerContent).exists()).toBe(true);
		});

		describe("when arrow key up is pressed", () => {
			describe("when component is in edit-mode", () => {
				it('should emit "move-keyboard:edit"', async () => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
					});

					wrapper.findComponent(DrawingContentElement).vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowUp",
							keyCode: 38,
						})
					);

					expect(wrapper.emitted("move-keyboard:edit")).toBeDefined();
				});

				it("should hide the element", () => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
					});

					expect(
						wrapper.findComponent(DrawingContentElement).isVisible()
					).toEqual(true);
				});
			});
		});
	});
});
