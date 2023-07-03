import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { I18N_KEY } from "@/utils/inject";

describe("RoomVideoConferenceCard", () => {
	const getWrapper = (props: {
		isRunning: boolean;
		hasPermission: boolean;
		isRefreshing: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			RoomVideoConferenceCard as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					...props,
				},
				provide: {
					[I18N_KEY.valueOf()]: {
						tc: (key: string): string => key,
					},
				},
			}
		);

		return wrapper;
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the video conference is not running", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				isRefreshing: false,
			});

			return {
				wrapper,
			};
		};

		it("should display a logo", () => {
			const { wrapper } = setup();

			const logo = wrapper.find('[data-testId="vc-card-logo"]');

			expect(logo.exists()).toEqual(true);
		});

		it("should display a description text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("span");

			expect(text.text()).toEqual("pages.videoConference.title.notStarted");
		});

		it("should display a refresh button", () => {
			const { wrapper } = setup();

			const button = wrapper.find('[data-testId="refresh-btn"]');

			expect(button.exists()).toEqual(true);
		});
	});

	describe("when the video conference is running", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: true,
				hasPermission: true,
				isRefreshing: false,
			});

			return {
				wrapper,
			};
		};

		it("should display a logo", () => {
			const { wrapper } = setup();

			const logo = wrapper.find('[data-testId="vc-card-logo"]');

			expect(logo.exists()).toEqual(true);
		});

		it("should display a title", () => {
			const { wrapper } = setup();

			const text = wrapper.find("h5");

			expect(text.text()).toEqual("pages.videoConference.title.running");
		});

		it("should display a pulsating dot", () => {
			const { wrapper } = setup();

			const dot = wrapper.find(".pulsating-dot");

			expect(dot.exists()).toEqual(true);
		});
	});

	describe("when the user does not have the permission to join the video conference", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: true,
				hasPermission: false,
				isRefreshing: false,
			});

			return {
				wrapper,
			};
		};

		it("should display a logo", () => {
			const { wrapper } = setup();

			const logo = wrapper.find('[data-testId="vc-card-logo"]');

			expect(logo.exists()).toEqual(true);
		});

		it("should display a description text", () => {
			const { wrapper } = setup();

			const text = wrapper.find("span");

			expect(text.text()).toEqual("pages.videoConference.title.noPermission");
		});

		it("should display a refresh button", () => {
			const { wrapper } = setup();

			const button = wrapper.find('[data-testId="refresh-btn"]');

			expect(button.exists()).toEqual(true);
		});
	});

	describe("when clicking the refresh button", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				isRefreshing: false,
			});

			return {
				wrapper,
			};
		};

		it("should emit a refresh event", async () => {
			const { wrapper } = setup();

			const button = wrapper.find('[data-testId="refresh-btn"]');

			await button.trigger("click");

			expect(wrapper.emitted("refresh")).toBeDefined();
		});
	});

	describe("when clicking on the card", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: true,
				hasPermission: true,
				isRefreshing: false,
			});

			return {
				wrapper,
			};
		};

		it("should emit a click event", async () => {
			const { wrapper } = setup();

			const card = wrapper.find('[data-testId="vc-card"]');

			await card.trigger("click");

			expect(wrapper.emitted("click")).toBeDefined();
		});
	});

	describe("when refreshing", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				isRefreshing: true,
			});

			return {
				wrapper,
			};
		};

		it("should display a spinning icon", async () => {
			const { wrapper } = setup();

			const spinner = wrapper.find(".spin");

			expect(spinner.exists()).toEqual(true);
		});
	});
});
