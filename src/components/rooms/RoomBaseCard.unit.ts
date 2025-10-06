import RoomBaseCard from "./RoomBaseCard.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("RoomBaseCard", () => {
	const getWrapper = (propsData: { logoUrl?: string; openInNewTab?: boolean }) => {
		const title = "Test Card Title";
		const testId = "test-card";

		const wrapper = mount(RoomBaseCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				...propsData,
				title,
				testId,
			},
		});

		return {
			wrapper,
			title,
			testId,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when a logoUrl is provided", () => {
		const setup = () => {
			const { wrapper, testId } = getWrapper({
				logoUrl: "logoUrl",
			});

			return {
				wrapper,
				testId,
			};
		};

		it("should display a logo", async () => {
			const { wrapper, testId } = setup();

			const logo = wrapper.find(`[data-testid="${testId}-logo"]`);

			expect(logo.exists()).toEqual(true);
		});
	});

	describe("when no logoUrl is provided", () => {
		const setup = () => {
			const { wrapper, testId } = getWrapper({
				logoUrl: "logoUrl",
			});

			return {
				wrapper,
				testId,
			};
		};

		it("should not display a logo", async () => {
			const { wrapper, testId } = setup();

			const logo = wrapper.find(`[data-testid="${testId}-logo"]`);

			expect(logo.exists()).toEqual(true);
		});
	});

	describe("when a title is provided", () => {
		const setup = () => {
			const { wrapper, title } = getWrapper({});

			return {
				wrapper,
				title,
			};
		};

		it("should display a title", async () => {
			const { wrapper, title } = setup();

			const titleTag = wrapper.find("h2");

			expect(titleTag.text()).toEqual(title);
		});
	});

	describe("when openInNewTab is provided", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ openInNewTab: true });

			return {
				wrapper,
			};
		};

		it("should display an icon", async () => {
			const { wrapper } = setup();

			const icon = wrapper.find('[data-testId="card-new-tab-icon"]');

			expect(icon.exists()).toEqual(true);
		});
	});

	describe("when openInNewTab is not provided", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ openInNewTab: false });

			return {
				wrapper,
			};
		};

		it("should not display an icon", async () => {
			const { wrapper } = setup();

			const icon = wrapper.find('[data-testId="card-new-tab-icon"]');

			expect(icon.exists()).toEqual(false);
		});
	});

	describe("when the user clicks the card", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ openInNewTab: false });

			return {
				wrapper,
			};
		};

		it("should emit the click event", async () => {
			const { wrapper } = setup();

			await wrapper.trigger("click");

			expect(wrapper.emitted("click")).toBeDefined();
		});
	});
});
