import Vue from "vue";
import { MountOptions, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import HelpDropdown from "./HelpDropdown.vue";

const menuItems = [
	{
		label: "Test",
		icon: "question-circle",
		action: "/test",
		target: "_self",
	},
];

describe("@/components/legacy/HelpDropdown", () => {
	it("shows a list of menu items", () => {
		const wrapper = mount(HelpDropdown as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
			data() {
				return {
					menuItems,
				};
			},
		});

		expect(wrapper.findAll(".link")).toHaveLength(1);
	});
});
