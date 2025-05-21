import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import ApplicationErrorModule from "@/store/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";
import { apiResponseErrorFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import H5pPlayerPage from "./H5PPlayer.page.vue";

jest.mock("vue-router", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PPlayerPage", () => {
	const getWrapper = (
		props: ComponentProps<typeof H5pPlayerPage> = {
			parentType: H5PContentParentType.LESSONS,
			contentId: "contentId",
		}
	) => {
		const applicationErrorModule = createModuleMocks(ApplicationErrorModule);

		const wrapper = mount(H5pPlayerPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModule,
				},
				stubs: {
					H5PPlayerComponent: true,
				},
			},
			props,
		});

		return {
			wrapper,
			applicationErrorModule,
		};
	};

	describe("Back menu", () => {
		describe("when clicking the back button", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				jest.spyOn(window, "close").mockImplementation(() => createMock());

				return {
					wrapper,
				};
			};

			it("should close the window", async () => {
				const { wrapper } = setup();

				const backButton = wrapper.get('[data-testid="player-back-button"]');
				await backButton.trigger("click");

				expect(window.close).toHaveBeenCalled();
			});
		});
	});

	describe("H5P Player", () => {
		describe("when the player has a loading error", () => {
			const setup = () => {
				const { wrapper, applicationErrorModule } = getWrapper();

				const error = apiResponseErrorFactory.build({
					code: HttpStatusCode.BadRequest,
				});

				return {
					wrapper,
					applicationErrorModule,
					error,
				};
			};

			it("should set an application error", async () => {
				const { wrapper, applicationErrorModule, error } = setup();

				const h5pEditor = wrapper.getComponent(H5PPlayerComponent);
				h5pEditor.vm.$emit("load-error", error);
				await nextTick();

				expect(applicationErrorModule.setError).toHaveBeenCalledWith(
					createApplicationError(error.code)
				);
			});
		});
	});
});
