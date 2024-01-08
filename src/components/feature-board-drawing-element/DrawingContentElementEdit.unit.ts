import { AUTH_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("DrawingContentElementEdit", () => {
	const propsData = {
		lastUpdatedAt: "03.12 15:56",
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = (role: "teacher" | "student" = "teacher") => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [role],
		});

		const wrapper = shallowMount(
			DrawingContentElementEdit as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			}
		);

		return {
			wrapper,
			...propsData,
		};
	};

	it("should be found in the DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should display an icon", () => {
		const { wrapper } = setup();
		const drawingIcon = wrapper.find("v-icon-stub");
		expect(drawingIcon.exists()).toBe(true);
	});
});
