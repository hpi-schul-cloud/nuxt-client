import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { mount } from "@vue/test-utils";

type Props = {
	url?: string;
	title?: string;
	imageUrl?: string;
	isEditMode?: boolean;
	isDetailView?: boolean;
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

	it("should embed the preview only with an img element", async () => {
		const imageUrl = "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg";
		const { wrapper } = setup({
			props: {
				url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				imageUrl,
			},
		});

		const images = wrapper.findAll("img");
		const image = wrapper.get("[data-testid=link-preview-image]");

		expect(images).toHaveLength(1);
		expect(image.element.tagName).toBe("IMG");
		expect(image.attributes("src")).toEqual(imageUrl);
		expect(image.attributes("alt")).toEqual("");
		expect(wrapper.find("object").exists()).toBe(false);
		expect(wrapper.find("embed").exists()).toBe(false);
		expect(wrapper.find("iframe").exists()).toBe(false);
		expect(wrapper.findAll(`[src="${imageUrl}"]`)).toHaveLength(1);
		expect(wrapper.find(`[src="${imageUrl}"]`).element.tagName).toBe("IMG");
		expect(wrapper.find(`a[href="${imageUrl}"]`).exists()).toBe(false);
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
		`("should have row style for $screenSize display sizes when image url is given", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
				},
				isListBoard: true,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-row");
			expect(wrapper.get("[data-testid=link-preview-image]").classes()).toContain("link-preview-image--cover");
		});

		it("should have column style when display size is smaller than 600px", () => {
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

		it("should have column style when no imageUrl is given", () => {
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
		`("should have column style for $screenSize display sizes when image url is given", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
				},
				isListBoard: false,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});

		it("should have column style when no imageUrl is given", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
				},
				isListBoard: false,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});

	describe("when detail view is enabled", () => {
		it.each`
			screenSize  | px
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`("should have row style for $screenSize display sizes when image url is given", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
					isDetailView: true,
				},
				isListBoard: false,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-row");
			expect(wrapper.get("[data-testid=link-preview-image]").classes()).toContain("link-preview-image--cover");
		});

		it("should have column style when display size is smaller than 600px", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					imageUrl: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus.jpg",
					isDetailView: true,
				},
				isListBoard: false,
				windowWidth: 599,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});

		it("should have column style when no imageUrl is given", () => {
			const { wrapper } = setup({
				props: {
					url: "https://www.zdf.de/die-maus/2023-12-06-der-nikolaus",
					isDetailView: true,
				},
				isListBoard: false,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});
});
