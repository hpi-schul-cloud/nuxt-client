import { mount, VueWrapper } from "@vue/test-utils";
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
		it("should display a title", () => {
			const title = "video conference";
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title,
			});

			const titleElement = wrapper.find(".content-element-title");
			expect(titleElement.text()).toEqual(title);
		});
	});

	describe("Alerts", () => {
		const setup = (propsData: {
			isRunning: boolean;
			hasParticipationPermission: boolean;
			canStart: boolean;
		}) => {
			const wrapper = getWrapper({
				isEditMode: false,
				title: "video conference",
				...propsData,
			});

			return { wrapper };
		};

		it("should show 'not enabled for teacher' alert when feature is disabled", () => {
			const envs = envsFactory.build({
				FEATURE_VIDEOCONFERENCE_ENABLED: false,
			});
			envConfigModule.setEnvs(envs);

			const { wrapper } = setup({
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
			});

			const alert = wrapper.findComponent(
				'[data-testid="vc-info-box-no-feature"]'
			);
			const text = alert.find("span.my-auto");
			expect(text.text()).toEqual(
				"pages.videoConference.info.notEnabledTeacher"
			);
		});

		it("should show 'not started' alert for a participant when the video conference is not running", () => {
			const { wrapper } = setup({
				isRunning: false,
				hasParticipationPermission: true,
				canStart: false,
			});

			const alert = wrapper.findComponent('[data-testid="vc-info-box"]');
			const text = alert.find("span.my-auto");
			expect(text.text()).toEqual("pages.videoConference.info.notStarted");
		});

		it("should show 'no permission' alert for a user with no participation permission", () => {
			const { wrapper } = setup({
				isRunning: false,
				hasParticipationPermission: false,
				canStart: false,
			});

			const alert = wrapper.findComponent('[data-testid="vc-info-box"]');
			const text = alert.find("span.my-auto");
			expect(text.text()).toEqual("pages.videoConference.info.noPermission");
		});

		it("should not display any alert when the conference is not running and the user is a teacher", () => {
			const { wrapper } = setup({
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
			});

			const alert = wrapper.find('[data-testid="vc-info-box-show"]');
			expect(alert.exists()).toEqual(false);
		});

		it("should show 'no permission' alert when the conference is running and user has no participation permission", () => {
			const { wrapper } = setup({
				isRunning: true,
				hasParticipationPermission: false,
				canStart: false,
			});

			const alert = wrapper.findComponent(
				'[data-testid="vc-info-box-no-permission"]'
			);
			const text = alert.find("span.my-auto");
			expect(text.text()).toEqual("pages.videoConference.info.noPermission");
		});

		it("should display a pulsating dot when the conference is running and the user has permission", () => {
			const { wrapper } = setup({
				isRunning: true,
				hasParticipationPermission: true,
				canStart: true,
			});

			const dot = wrapper.find(".pulsating-dot");
			expect(dot.exists()).toEqual(true);
		});
	});

	describe("Events", () => {
		const triggerClick = async (wrapper: VueWrapper) => {
			const element = wrapper.find(
				'[data-testid="board-video-conference-element"]'
			);
			await element.trigger("click");
		};

		it("should emit a click event when the user can join and the conference is running", async () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: true,
				hasParticipationPermission: true,
				canStart: false,
				title: "video conference",
			});

			await triggerClick(wrapper);
			expect(wrapper.emitted("click")).toBeDefined();
		});

		it("should emit a refresh event when the user can join but the conference is not running", async () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: false,
				title: "video conference",
			});

			await triggerClick(wrapper);
			expect(wrapper.emitted("refresh")).toBeDefined();
		});

		it("should emit a click event when the user is a teacher and the conference is not running", async () => {
			const wrapper = getWrapper({
				isEditMode: false,
				isRunning: false,
				hasParticipationPermission: true,
				canStart: true,
				title: "video conference",
			});

			await triggerClick(wrapper);
			expect(wrapper.emitted("click")).toBeDefined();
		});
	});
});
