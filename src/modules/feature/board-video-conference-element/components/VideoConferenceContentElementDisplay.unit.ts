import { mount, VueWrapper } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardFeatures } from "@data-board";
import { BoardContextType } from "@/types/board/BoardContext";

jest.mock("@data-board/BoardFeatures.composable");
jest.mocked(useBoardFeatures).mockImplementation(() => {
	return {
		isFeatureEnabled: jest.fn().mockReturnValue(true),
	};
});

const setupWrapper = ({
	propsData = {},
}: {
	propsData?: object;
} = {}) => {
	const wrapper = mount(VideoConferenceContentElementDisplay, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[BOARD_IS_LIST_LAYOUT as symbol]: false,
			},
		},
		props: {
			boardParentType: BoardContextType.Course,
			isEditMode: false,
			isRunning: false,
			isVideoConferenceEnabled: true,
			hasParticipationPermission: false,
			canStart: false,
			title: "",
			...propsData,
		},
	});

	return wrapper;
};

describe("VideoConferenceContentElementDisplay", () => {
	beforeEach(() => {
		setupStores({ envConfigModule: EnvConfigModule });
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Title", () => {
		it("should display a title", () => {
			const title = "video conference";
			const wrapper = setupWrapper({
				propsData: {
					isEditMode: false,
					isRunning: false,
					isVideoConferenceEnabled: true,
					hasParticipationPermission: true,
					canStart: true,
					title,
				},
			});

			const titleElement = wrapper.find(
				'[data-testid="content-element-title-slot"]'
			);
			expect(titleElement.text()).toEqual(title);
		});
	});

	describe("Alerts", () => {
		describe("when the feature is disabled", () => {
			describe("and the elements parent is a course", () => {
				it("should show 'not enabled for teacher' alert", () => {
					const wrapper = setupWrapper({
						propsData: {
							boardParentType: BoardContextType.Course,
							isRunning: false,
							isVideoConferenceEnabled: false,
							hasParticipationPermission: true,
							canStart: true,
							title: "video conference",
						},
					});

					const alert = wrapper.findComponent(
						'[data-testid="vc-info-box-no-feature"]'
					);
					const text = alert.find("span.my-auto");
					expect(text.text()).toEqual(
						"pages.videoConference.info.courseParent.notEnabledTeacher"
					);
				});
			});

			describe("and the elements parent is a room", () => {
				it("should show 'not enabled for teacher' alert", () => {
					const wrapper = setupWrapper({
						propsData: {
							boardParentType: BoardContextType.Room,
							isRunning: false,
							isVideoConferenceEnabled: false,
							hasParticipationPermission: true,
							canStart: true,
							title: "video conference",
						},
					});

					const alert = wrapper.findComponent(
						'[data-testid="vc-info-box-no-feature"]'
					);
					const text = alert.find("span.my-auto");
					expect(text.text()).toEqual(
						"pages.videoConference.info.roomParent.notEnabledTeacher"
					);
				});
			});
		});

		describe("and video conference is not running", () => {
			it("should show 'not started' alert for a participant", () => {
				const wrapper = setupWrapper({
					propsData: {
						isRunning: false,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: false,
						title: "video conference",
					},
				});

				const alert = wrapper.findComponent('[data-testid="vc-info-box"]');
				const text = alert.find("span.my-auto");
				expect(text.text()).toEqual("pages.videoConference.info.notStarted");
			});

			it("should show 'no permission' alert for a user with no participation permission", () => {
				const wrapper = setupWrapper({
					propsData: {
						isRunning: false,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: false,
						canStart: false,
						title: "video conference",
					},
				});

				const alert = wrapper.findComponent('[data-testid="vc-info-box"]');
				const text = alert.find("span.my-auto");
				expect(text.text()).toEqual("pages.videoConference.info.noPermission");
			});

			it("should not display any alert when the user is a teacher", () => {
				const wrapper = setupWrapper({
					propsData: {
						isRunning: false,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: true,
						title: "video conference",
					},
				});

				const alert = wrapper.find('[data-testid="vc-info-box-show"]');
				expect(alert.exists()).toEqual(false);
			});
		});

		describe("and video conference is running", () => {
			it("should show 'no permission' alert when user has no participation permission", () => {
				const wrapper = setupWrapper({
					propsData: {
						isRunning: true,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: false,
						canStart: false,
						title: "video conference",
					},
				});

				const alert = wrapper.findComponent(
					'[data-testid="vc-info-box-no-permission"]'
				);
				const text = alert.find("span.my-auto");
				expect(text.text()).toEqual("pages.videoConference.info.noPermission");
			});

			it("should display a pulsating dot when the user has permission", () => {
				const wrapper = setupWrapper({
					propsData: {
						isRunning: true,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: true,
						title: "video conference",
					},
				});

				const dot = wrapper.find('[data-testid="vc-pulsating-dot"]');
				expect(dot.exists()).toEqual(true);
			});
		});
	});

	describe("Events", () => {
		const triggerClick = async (wrapper: VueWrapper) => {
			const element = wrapper.find(
				'[data-testid="board-video-conference-element"]'
			);
			await element.trigger("click");
		};

		describe("and video conference is running", () => {
			it("should emit a click event when the user can join and the conference is running", async () => {
				const wrapper = setupWrapper({
					propsData: {
						isEditMode: false,
						isRunning: true,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: false,
						title: "video conference",
					},
				});

				await triggerClick(wrapper);
				expect(wrapper.emitted("click")).toBeDefined();
			});
		});

		describe("and video conference is not running", () => {
			it("should emit a refresh event when the user can join", async () => {
				const wrapper = setupWrapper({
					propsData: {
						isEditMode: false,
						isRunning: false,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: false,
						title: "video conference",
					},
				});

				await triggerClick(wrapper);
				expect(wrapper.emitted("refresh")).toBeDefined();
			});

			it("should emit a click event when the user is a teacher", async () => {
				const wrapper = setupWrapper({
					propsData: {
						isEditMode: false,
						isRunning: false,
						isVideoConferenceEnabled: true,
						hasParticipationPermission: true,
						canStart: true,
						title: "video conference",
					},
				});

				await triggerClick(wrapper);
				expect(wrapper.emitted("click")).toBeDefined();
			});
		});
	});
});
