import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { mount } from "@vue/test-utils";

type Props = {
	url?: string;
	title?: string;
	imageUrl?: string;
	isEditMode?: boolean;
};

describe("LinkContentElementDisplay", () => {
	const setup = (options: { props: Props; isListBoard?: boolean; windowWidth?: number }) => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: options.windowWidth ?? 1280,
		});

		const wrapper = mount(LinkContentElementDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_IS_LIST_LAYOUT as symbol]: options.isListBoard ?? false,
				},
			},
			props: {
				url: "",
				title: "",
				isEditMode: false,
				...options.props,
			},
		});
		return { wrapper };
	};

	it("should display the hostname", async () => {
		const { wrapper } = setup({
			props: { url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus" },
		});

		const hostname = "www.zdf.de";
		expect(wrapper.text()).toEqual(hostname);
	});

	it("should display a title", async () => {
		const title = "Die Sendung mit der Maus";
		const { wrapper } = setup({
			props: {
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				title,
			},
		});

		expect(wrapper.html()).toEqual(expect.stringContaining(title));
	});

	it("should display the image when image url is given", async () => {
		const imageUrl = "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg";
		const { wrapper } = setup({
			props: {
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				imageUrl,
			},
		});

		const image = wrapper.find("img");

		expect(image.attributes("src")).toEqual(imageUrl);
		expect(image.attributes("alt")).toEqual("");
	});

	it("should not display the image when image url is not given", async () => {
		const { wrapper } = setup({
			props: {
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
			},
		});

		const image = wrapper.find("img");

		expect(image.exists()).toBe(false);
	});

	describe("when board is a list board", () => {
		it.each`
			screenSize  | px
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`("content should have row style for $screenSize display sizes when image url is given", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
				},
				isListBoard: true,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-row");
		});

		it("content should have column style when display size is smaller than 600px", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
				},
				isListBoard: true,
				windowWidth: 599,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});

		it("content should have column style when no imageUrl is given", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				},
				isListBoard: true,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});

	describe("when board is not a list board", () => {
		it.each`
			screenSize  | px
			${"xs"}     | ${590}
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`(
			"content should have column style for $screenSize display sizes when image url is given",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					props: {
						url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
						imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
					},
					isListBoard: false,
					windowWidth,
				});

				expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
			}
		);

		it("content should have column style when no imageUrl is given", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				},
				isListBoard: false,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});
});
