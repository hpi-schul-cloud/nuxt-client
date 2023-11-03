import LinkContentElementDisplayVue from "./LinkContentElementDisplay.vue";
import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

const VALID_URL = "https://www.abc.de/my-article";

const INVALID_URL = "my-article";

type Props = {
	url: string;
	title: string;
	imageUrl?: string;
	isLoading: boolean;
	isEditMode: boolean;
};

describe("LinkContentElementDisplay", () => {
	const setup = (props: Props) => {
		const wrapper = mount(LinkContentElementDisplayVue as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
			propsData: { ...props },
		});

		return { wrapper };
	};

	describe("when valid url was given", () => {
		it("should sanitize urls", async () => {
			const VALID_UNSANITIZED_URL =
				"&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;";
			const { wrapper } = setup({
				url: VALID_UNSANITIZED_URL,
				title: "",
				isLoading: false,
				isEditMode: false,
			});

			const expectedUrl = "https://example.com";
			expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
		});

		it("should sanitize javascript-urls", async () => {
			const INVALID_UNSANITIZED_URL = "javascript:alert(document.domain)";
			const { wrapper } = setup({
				url: INVALID_UNSANITIZED_URL,
				title: "",
				isLoading: false,
				isEditMode: false,
			});

			const expectedUrl = "about:blank";
			expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
		});

		it("should display the hostname ", async () => {
			const INVALID_UNSANITIZED_URL = "https://de.wikipedia.org/dachs";
			const { wrapper } = setup({
				url: INVALID_UNSANITIZED_URL,
				title: "",
				isLoading: false,
				isEditMode: false,
			});

			const expectedUrl = "de.wikipedia.org";
			expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
		});
	});
});
