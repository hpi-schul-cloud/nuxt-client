import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("RoomVideoConferenceCard", () => {
	const getWrapper = (propsData: {
		isRunning: boolean;
		hasPermission: boolean;
		canStart: boolean;
		isRefreshing: boolean;
		isVideoConferenceEnabled: boolean;
	}) => {
		const wrapper = mount(RoomVideoConferenceCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				...propsData,
			},
		});

		return wrapper;
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("Title", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				canStart: true,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
			});

			return {
				wrapper,
			};
		};

		it("should display a title", () => {
			const { wrapper } = setup();

			const text = wrapper.find("h2");

			expect(text.text()).toEqual("pages.videoConference.title");
		});
	});

	describe("when the video conference is not running and user is not a teacher", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				canStart: false,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
			});

			return {
				wrapper,
			};
		};

		it("should display a logo", () => {
			const { wrapper } = setup();

			const logo = wrapper.findComponent('[data-testId="vc-card-logo"]');

			expect(logo.exists()).toEqual(true);
		});

		it("should display a description text", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent('[data-testId="vc-info-box"]');

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual("pages.videoConference.info.notStarted");
		});

		it("should display a refresh button", () => {
			const { wrapper } = setup();

			const button = wrapper.find('[data-testId="refresh-btn"]');

			expect(button.exists()).toEqual(true);
		});
	});

	describe("when the video conference is not running and user is a teacher", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				canStart: true,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
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

		it("should not display a description text", () => {
			const { wrapper } = setup();

			const alert = wrapper.find('[data-testId="vc-info-box-show"]');
			const text = alert.find("span.my-auto");

			expect(text.isVisible()).toBeFalsy();
		});

		it("should not display a refresh button", () => {
			const { wrapper } = setup();

			const button = wrapper.find('[data-testId="refresh-btn"]');

			expect(button.isVisible()).toBeFalsy();
		});

		it("should not display alert", () => {
			const { wrapper } = setup();

			const alert = wrapper.find('[data-testId="vc-info-box-show"]');

			expect(alert.isVisible()).toBeFalsy();
		});
	});

	describe("when the video conference is running", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: true,
				hasPermission: true,
				canStart: true,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
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
				canStart: false,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
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

			const alert = wrapper.find('[data-testId="vc-info-box"]');

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual("pages.videoConference.info.noPermission");
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
				canStart: false,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
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
				canStart: false,
				isRefreshing: false,
				isVideoConferenceEnabled: true,
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

	describe("when the video conference feature is disabled", () => {
		describe("when the user is a teacher", () => {
			const setup = () => {
				const wrapper = getWrapper({
					isRunning: false,
					hasPermission: true,
					canStart: true,
					isRefreshing: false,
					isVideoConferenceEnabled: false,
				});
				return { wrapper };
			};

			it("should show the footer info box", () => {
				const { wrapper } = setup();
				expect(wrapper.find('[data-testId="vc-info-box-show"]').isVisible()).toBe(true);
			});

			it("should display the teacher disabled message", () => {
				const { wrapper } = setup();
				const text = wrapper.find('[data-testId="vc-info-box"] span.my-auto');
				expect(text.text()).toEqual("pages.courseRooms.tools.videoConference.notEnabled.teacher");
			});

			it("should not display the refresh button", () => {
				const { wrapper } = setup();
				expect(wrapper.find('[data-testId="refresh-btn"]').exists()).toBe(false);
			});

			it("should not emit a click event when the card is clicked", async () => {
				const { wrapper } = setup();
				await wrapper.find('[data-testId="vc-card"]').trigger("click");
				expect(wrapper.emitted("click")).toBeUndefined();
			});
		});

		describe("when the user is a student", () => {
			const setup = () => {
				const wrapper = getWrapper({
					isRunning: false,
					hasPermission: true,
					canStart: false,
					isRefreshing: false,
					isVideoConferenceEnabled: false,
				});
				return { wrapper };
			};

			it("should display the participant disabled message", () => {
				const { wrapper } = setup();
				const text = wrapper.find('[data-testId="vc-info-box"] span.my-auto');
				expect(text.text()).toEqual("pages.courseRooms.tools.videoConference.notEnabled.participant");
			});

			it("should not display the refresh button", () => {
				const { wrapper } = setup();
				expect(wrapper.find('[data-testId="refresh-btn"]').exists()).toBe(false);
			});

			it("should not emit a click event when the card is clicked", async () => {
				const { wrapper } = setup();
				await wrapper.find('[data-testId="vc-card"]').trigger("click");
				expect(wrapper.emitted("click")).toBeUndefined();
			});
		});
	});

	describe("when refreshing", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isRunning: false,
				hasPermission: true,
				canStart: false,
				isRefreshing: true,
				isVideoConferenceEnabled: true,
			});

			return {
				wrapper,
			};
		};

		it("should disable the refresh button", () => {
			const { wrapper } = setup();

			const button = wrapper.findComponent('[data-testId="refresh-btn"]');

			expect(button.attributes()).toHaveProperty("disabled");
		});
	});
});
