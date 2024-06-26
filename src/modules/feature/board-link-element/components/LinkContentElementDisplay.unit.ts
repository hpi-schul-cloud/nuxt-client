import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import { mount } from "@vue/test-utils";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";

type Props = {
	url?: string;
	title?: string;
	imageUrl?: string;
	isEditMode?: boolean;
};

describe("LinkContentElementDisplay", () => {
	const setup = (props: Props) => {
		const wrapper = mount(LinkContentElementDisplay, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				url: "",
				title: "",
				isEditMode: false,
				...props,
			},
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
