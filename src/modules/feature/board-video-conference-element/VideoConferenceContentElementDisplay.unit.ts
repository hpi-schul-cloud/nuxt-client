import { mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { createMock } from "@golevelup/ts-jest";
import { ConfigResponse } from "@/serverApi/v3";
import setupStores from "@@/tests/test-utils/setupStores";
import { envsFactory } from "@@/tests/test-utils";

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_VIDEOCONFERENCE_ENABLED: true,
	}),
});

describe("VideoConferenceContentElementDisplay", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
		const envs = envsFactory.build({
			FEATURE_VIDEOCONFERENCE_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);
	});
	const getWrapper = (propsData: {
		isEditMode: boolean;
		isRunning: boolean;
		hasParticipationPermission: boolean;
		canStart: boolean;
		title: string;
	}) => {
		const wrapper = mount(VideoConferenceContentElementDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_IS_LIST_LAYOUT as symbol]: false,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
				},
			},
			props: {
				...propsData,
			},
		});

		return wrapper;
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Title", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a title", () => {
			const title = "video conference";
			const { wrapper } = setup();

			const titleElement = wrapper.find(".content-element-title");

			expect(titleElement.text()).toEqual(title);
		});
	});

	describe("when the video conference is not running and the user is a teacher and the feature is deactivated", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a description text", () => {
			const envs = envsFactory.build({
				FEATURE_VIDEOCONFERENCE_ENABLED: false,
			});
			envConfigModule.setEnvs(envs);
			const { wrapper } = setup();

			const alert = wrapper.findComponent(
				'[data-testId="vc-info-box-no-feature"]'
			);

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual(
				"pages.videoConference.info.notEnabledTeacher"
			);
		});
	});

	describe("when the video conference is not running and user is not a teacher but a participant", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: false,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a description text", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent('[data-testId="vc-info-box"]');

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual("pages.videoConference.info.notStarted");
		});
	});

	describe("when the video conference is not running and user is not a teacher and not a participant", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: false,
				canStart: false,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a description text", () => {
			const { wrapper } = setup();

			const alert = wrapper.findComponent('[data-testId="vc-info-box"]');

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual("pages.videoConference.info.noPermission");
		});
	});

	describe("when the video conference is not running and user is a teacher", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should not display alert", () => {
			const { wrapper } = setup();

			const alert = wrapper.find('[data-testId="vc-info-box-show"]');

			expect(alert.exists()).toEqual(false);
		});
	});

	describe("when the video conference is running", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: true,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a pulsating dot", () => {
			const { wrapper } = setup();

			const dot = wrapper.find(".pulsating-dot");

			expect(dot.exists()).toEqual(true);
		});
	});

	describe("when the user does not have the permission to join the video conference", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: true,
				hasParticipationPermission: false,
				canStart: false,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should display a description text", () => {
			const { wrapper } = setup();

			const alert = wrapper.find('[data-testId="vc-info-box-no-permission"]');

			const text = alert.find("span.my-auto");

			expect(text.text()).toEqual("pages.videoConference.info.noPermission");
		});
	});

	describe("when the user does have the permission to join the video conference", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: true,
				hasParticipationPermission: true,
				canStart: false,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should emit a click event", async () => {
			const { wrapper } = setup();

			const element = wrapper.find(
				'[data-testId="board-video-conference-element"]'
			);

			await element.trigger("click");

			expect(wrapper.emitted("click")).toBeDefined();
		});
	});

	describe("when clicking on the element and video conference is not running, with participation permission but not teacher", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: false,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should emit a refresh event", async () => {
			const { wrapper } = setup();

			const element = wrapper.find(
				'[data-testId="board-video-conference-element"]'
			);

			await element.trigger("click");

			expect(wrapper.emitted("refresh")).toBeDefined();
		});
	});

	describe("when clicking on the element and video conference is not running as a teacher", () => {
		const setup = () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			return {
				wrapper,
			};
		};

		it("should emit a click event", async () => {
			const { wrapper } = setup();

			const element = wrapper.find(
				'[data-testId="board-video-conference-element"]'
			);

			await element.trigger("click");

			expect(wrapper.emitted("click")).toBeDefined();
		});
	});
});
