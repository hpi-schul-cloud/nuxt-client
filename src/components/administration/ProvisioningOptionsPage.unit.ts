// TODO N21-1479 test ProvisioningOptionsPage

import { createMock } from "@golevelup/ts-jest";
import VueRouter from "vue-router";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import ProvisioningOptionsPage from "./ProvisioningOptionsPage.vue";
import Vue from "vue";
import createComponentMocks from "../../../tests/test-utils/componentMocks";
import { I18N_KEY } from "../../utils/inject";
import { i18nMock } from "../../../tests/test-utils";

const $router = createMock<VueRouter>();

describe("ProvisioningOptionsPage", () => {
	const getWrapper = (
		/* getters: Partial<ProvisioningOptions> = {
			class: true,
			course: false,
			others: false,
		}, */
		propsData: { systemId: string } = { systemId: "systemId" }
	) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			ProvisioningOptionsPage as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: { [I18N_KEY.valueOf()]: i18nMock },
				mocks: { $router },
				propsData,
			}
		);

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});
}); // TODO N21-1479 test page
