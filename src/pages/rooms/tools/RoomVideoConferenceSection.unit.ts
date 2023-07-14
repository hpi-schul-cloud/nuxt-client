import AuthModule from "@/store/auth";
import { VideoConferenceState } from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	AUTH_MODULE,
	I18N_KEY,
	ROOM_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import { VideoConferenceScope } from "@/serverApi/v3";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";
import RoomModule from "@/store/room";

describe("RoomVideoConferenceSection", () => {
	const getWrapper = (
		props: { roomId: string },
		userPermissions: ("join_meeting" | "start_meeting")[],
		isExpert: boolean,
		videoConferenceModuleGetter?: Partial<VideoConferenceModule>
	) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: userPermissions,
			getUserRoles: isExpert ? ["expert"] : [],
		});

		const videoConferenceModule = createModuleMocks(VideoConferenceModule, {
			getVideoConferenceInfo: {
				state: VideoConferenceState.NOT_STARTED,
				options: {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: false,
					everybodyJoinsAsModerator: false,
				},
			},
			getLoading: false,
			...videoConferenceModuleGetter,
		});

		const roomModule = createModuleMocks(RoomModule, {
			getRoomData: {
				roomId: "roomId",
				title: "roomName",
				displayColor: "displayColor",
				elements: [],
			},
		});

		const wrapper: Wrapper<Vue> = shallowMount(
			RoomVideoConferenceSection as MountOptions<Vue>,
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
					[AUTH_MODULE.valueOf()]: authModule,
					[VIDEO_CONFERENCE_MODULE_KEY.valueOf()]: videoConferenceModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
				},
			}
		);

		return {
			wrapper,
			authModule,
			videoConferenceModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the video conference is not running", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to not running", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("isRunning")).toEqual(false);
		});
	});

	describe("when the video conference is running", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to running", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("isRunning")).toEqual(true);
		});
	});

	describe("when the video conference is loading", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to refreshing", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("isRefreshing")).toEqual(true);
		});
	});

	describe("when the user is an expert and the waiting room is not active", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				true,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to not have permission", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("hasPermission")).toEqual(false);
		});
	});

	describe("when the user is an expert and the waiting room is active", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				true,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: true,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to have permission", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("hasPermission")).toEqual(true);
		});
	});

	describe("when the user has the join permission", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["join_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to have permission", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("hasPermission")).toEqual(true);
		});
	});

	describe("when the user has the start permission", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				["start_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to have permission", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("hasPermission")).toEqual(true);
		});
	});

	describe("when the user does not have the permissions", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
			};
		};

		it("should set the video conference card to have permission", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			expect(card.props("hasPermission")).toEqual(false);
		});
	});

	describe("when the video conference card requests a refresh", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId: "roomId",
				},
				[],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
				videoConferenceModule,
			};
		};

		it("should call fetchVideoConferenceInfo", async () => {
			const { wrapper, videoConferenceModule } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			await card.vm.$emit("refresh");

			expect(
				videoConferenceModule.fetchVideoConferenceInfo
			).toHaveBeenCalledWith({
				scope: VideoConferenceScope.Course,
				scopeId: "roomId",
			});
		});
	});

	describe("when the video conference card requests a click", () => {
		describe("when the video conference is running", () => {
			const setup = () => {
				const { wrapper, videoConferenceModule } = getWrapper(
					{
						roomId: "roomId",
					},
					["join_meeting"],
					false,
					{
						getVideoConferenceInfo: {
							state: VideoConferenceState.RUNNING,
							options: {
								everyAttendeeJoinsMuted: false,
								moderatorMustApproveJoinRequests: false,
								everybodyJoinsAsModerator: false,
							},
						},
						getLoading: true,
					}
				);

				return {
					wrapper,
					videoConferenceModule,
				};
			};

			it("should call joinVideoConference", async () => {
				const { wrapper, videoConferenceModule } = setup();

				const card = wrapper.findComponent({
					name: "room-video-conference-card",
				});

				await card.vm.$emit("click");

				expect(videoConferenceModule.joinVideoConference).toHaveBeenCalledWith({
					scope: VideoConferenceScope.Course,
					scopeId: "roomId",
				});
			});
		});

		describe("when the video conference is not running", () => {
			const setup = () => {
				const { wrapper, videoConferenceModule } = getWrapper(
					{
						roomId: "roomId",
					},
					["start_meeting"],
					false,
					{
						getVideoConferenceInfo: {
							state: VideoConferenceState.NOT_STARTED,
							options: {
								everyAttendeeJoinsMuted: false,
								moderatorMustApproveJoinRequests: false,
								everybodyJoinsAsModerator: false,
							},
						},
						getLoading: true,
					}
				);

				return {
					wrapper,
					videoConferenceModule,
				};
			};

			it("should open the videoconference configuration dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					name: "room-video-conference-card",
				});

				await card.vm.$emit("click");

				const configurationDialog = wrapper.find(
					'[data-testid="videoconference-config-dialog"]'
				);

				expect(
					configurationDialog.element.childNodes.length
				).toBeGreaterThanOrEqual(1);
			});
		});
	});

	// TODO: trigger switches

	describe("when open videoconference configuration dialog", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId: "roomId",
				},
				["start_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: true,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			const params = {
				scope: VideoConferenceScope.Course,
				scopeId: "roomId",
			};

			return {
				wrapper,
				videoConferenceModule,
				params,
			};
		};

		it("should set the roomname in dialog title", async () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			await card.vm.$emit("click");

			const configurationDialog = wrapper.find(
				'[data-testid="videoconference-config-dialog"]'
			);

			expect(configurationDialog.vm.$attrs.title).toBe("roomId");
		});
	});

	describe("when clicking on create button of videoconference configuration dialog", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId: "roomId",
				},
				["start_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: true,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			const params = {
				scope: VideoConferenceScope.Course,
				scopeId: "roomId",
			};

			return {
				wrapper,
				videoConferenceModule,
				params,
			};
		};

		it("should call start and join videoconference function of store", async () => {
			const { wrapper, videoConferenceModule, params } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});
			await card.vm.$emit("click");

			const configurationDialog = wrapper.find(
				'[data-testId="videoconference-config-dialog"]'
			);

			const createBtn = wrapper.find('[data-testId="dialog-create"]');
			await createBtn.vm.$emit("click");

			expect(videoConferenceModule.startVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
				videoConferenceOptions:
					videoConferenceModule.getVideoConferenceInfo.options,
			});
			expect(videoConferenceModule.joinVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
			});

			// TODO: check if dialog still exits
		});
	});

	describe("when clicking on cancel button of videoconference configuration dialog", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId: "roomId",
				},
				["start_meeting"],
				false,
				{
					getVideoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
					getLoading: true,
				}
			);

			return {
				wrapper,
				videoConferenceModule,
			};
		};

		it("should close the videoconference configuration dialog", async () => {
			const { wrapper, videoConferenceModule } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});
			await card.vm.$emit("click");

			const configurationDialog = wrapper.find(
				'[data-testid="videoconference-config-dialog"]'
			);

			const cancelBtn = configurationDialog.find(
				'[data-testid="dialog-cancel"]'
			);
			await cancelBtn.vm.$emit("click");
			console.log(wrapper.html);

			expect(videoConferenceModule.startVideoConference).not.toHaveBeenCalled();
			expect(videoConferenceModule.joinVideoConference).not.toHaveBeenCalled();
			// TODO: check if dialog still exits
		});
	});
});
