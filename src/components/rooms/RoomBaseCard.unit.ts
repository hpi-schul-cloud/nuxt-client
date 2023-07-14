import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import RoomBaseCard from "./RoomBaseCard.vue";

describe("RoomBaseCard", () => {
	const getWrapper = (props: { logoUrl?: string; openInNewTab?: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const title = "Test Card Title";
		const testId = "test-card";

		const wrapper: Wrapper<Vue> = mount(RoomBaseCard as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				...props,
				title,
				testId,
			},
			provide: {
				[I18N_KEY.valueOf()]: {
					tc: (key: string): string => key,
				},
			},
		});

		return {
			wrapper,
			title,
			testId,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
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

		it("should not display a title", async () => {
			const { wrapper, title } = setup();

			const titleTag = wrapper.find("h5");

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
