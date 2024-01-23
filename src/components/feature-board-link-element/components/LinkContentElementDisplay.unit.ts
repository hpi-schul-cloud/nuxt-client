import LinkContentElementDisplayVue from "./LinkContentElementDisplay.vue";
import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

type Props = {
	url?: string;
	title?: string;
	imageUrl?: string;
	isLoading?: boolean;
	isEditMode?: boolean;
};

describe("LinkContentElementDisplay", () => {
	const setup = (props: Props) => {
		const wrapper = mount(LinkContentElementDisplayVue as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
			propsData: { title: "", isLoading: false, isEditMode: false, ...props },
		});

		return { wrapper };
	};

	describe("when valid url was given", () => {
		it("should display the hostname", async () => {
			const { wrapper } = setup({
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
			});

			const hostname = "www.zdf.de";
			expect(wrapper.text()).toEqual(hostname);
		});

		it("should display a title", async () => {
			const title = "Die Sendung mit der Maus";
			const { wrapper } = setup({
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				title,
			});

			expect(wrapper.html()).toEqual(expect.stringContaining(title));
		});
	});
});
