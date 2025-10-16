import H5pPlayerPage from "./H5PPlayer.page.vue";
import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { axiosErrorFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { ComponentProps } from "vue-component-type-helpers";

vi.mock("vue-router", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PPlayerPage", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const getWrapper = (
		props: ComponentProps<typeof H5pPlayerPage> = {
			parentType: H5PContentParentType.LESSONS,
			contentId: "contentId",
		}
	) => {
		const wrapper = mount(H5pPlayerPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					H5PPlayerComponent: true,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	describe("H5P Player", () => {
		describe("when the player has a loading error", () => {
			it("should set an application error", async () => {
				const errorCode = HttpStatusCode.BadRequest;
				const axiosError = axiosErrorFactory.withStatusCode(errorCode).build();

				const { wrapper } = getWrapper();

				const h5pEditor = wrapper.getComponent(H5PPlayerComponent);
				h5pEditor.vm.$emit("load-error", axiosError);

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(errorCode);
			});
		});
	});
});
