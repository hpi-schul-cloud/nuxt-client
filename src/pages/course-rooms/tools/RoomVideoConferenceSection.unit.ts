import { Permission, RoleName, VideoConferenceScope } from "@/serverApi/v3";
import CourseRoomDetailsModule from "@/store/course-room-details";
import { VideoConferenceState } from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	COURSE_ROOM_DETAILS_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { VDialog } from "vuetify/lib/components/index";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";
import RoomVideoConferenceCard from "@/components/rooms/RoomVideoConferenceCard.vue";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { nextTick } from "vue";
import { createTestAuthStore } from "@@/tests/test-utils";

describe("RoomVideoConferenceSection", () => {
	const mockUrl = "https://mock.com";

	const getWrapper = (
		props: { roomId: string },
		userPermissions: (Permission.JoinMeeting | Permission.StartMeeting)[],
		isExpert: boolean,
		videoConferenceModuleGetter?: Partial<VideoConferenceModule>
	) => {
		Object.defineProperty(window, "location", {
			value: {
				origin: mockUrl,
			},
			writable: true, // possibility to override
		});

		createTestAuthStore({
			me: {
				permissions: userPermissions,
				roles: isExpert ? [{ id: "expert", name: RoleName.Expert }] : [],
			},
			stubActions: false,
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

		const courseRoomDetailsModule = createModuleMocks(CourseRoomDetailsModule, {
			getRoomData: {
				roomId: props.roomId,
				title: "roomName",
				displayColor: "displayColor",
				elements: [],
				isArchived: false,
				isSynchronized: false,
			},
		});

		const wrapper = mount(RoomVideoConferenceSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[VIDEO_CONFERENCE_MODULE_KEY.valueOf()]: videoConferenceModule,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModule,
				},
				stubs: {
					VideoConferenceConfigurationDialog: true,
				},
			},
			props,
		});

		return {
			wrapper,
			videoConferenceModule,
			courseRoomDetailsModule,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the video conference is not running", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("isRunning")).toEqual(false);
		});
	});

	describe("when the video conference is running", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("isRunning")).toEqual(true);
		});
	});

	describe("when the video conference is loading", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("isRefreshing")).toEqual(true);
		});
	});

	describe("when the user is an expert and the waiting room is not active", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("hasPermission")).toEqual(false);
		});
	});

	describe("when the user is an expert and the waiting room is active", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("hasPermission")).toEqual(true);
		});
	});

	describe("when the user has the join permission", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.JoinMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			expect(card.props("hasPermission")).toEqual(true);
		});
	});

	describe("when the user has the start permission", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.StartMeeting],
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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

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

			const card = wrapper.findComponent(RoomVideoConferenceCard);

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

		it("should call fetchVideoConferenceInfo", () => {
			const { wrapper, videoConferenceModule } = setup();

			const card = wrapper.findComponent(RoomVideoConferenceCard);

			card.vm.$emit("refresh");

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
					[Permission.JoinMeeting],
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

				const card = wrapper.findComponent(RoomVideoConferenceCard);

				await card.trigger("click");

				expect(videoConferenceModule.joinVideoConference).toHaveBeenCalledWith({
					scope: VideoConferenceScope.Course,
					scopeId: "roomId",
				});
			});
		});

		describe("when the video conference is not running", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						roomId: "roomId",
					},
					[Permission.StartMeeting],
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

			it("should open the videoconference configuration dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent(RoomVideoConferenceCard);
				await card.trigger("click");

				const configurationDialog = wrapper.findComponent(
					VideoConferenceConfigurationDialog
				);

				expect(configurationDialog.props("isOpen")).toBe(true);
			});
		});
	});

	describe("when videoconference configuration dialog emits 'start-video-conference'", () => {
		const setup = () => {
			const roomId = "roomId";

			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId,
				},
				[Permission.StartMeeting],
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
				scopeId: roomId,
			};

			return {
				wrapper,
				videoConferenceModule,
				params,
				roomId,
			};
		};

		it("should call start with correct options", () => {
			const { wrapper, videoConferenceModule, params, roomId } = setup();

			const configurationDialog = wrapper.findComponent(
				VideoConferenceConfigurationDialog
			);
			configurationDialog.vm.$emit("start-video-conference");

			expect(videoConferenceModule.startVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
				videoConferenceOptions: {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: true,
					everybodyJoinsAsModerator: false,
				},
				logoutUrl: `${mockUrl}/rooms/${roomId}?tab=tools`,
			});
		});

		it("should call start and join videoconference function of store", async () => {
			const { wrapper, videoConferenceModule, params, roomId } = setup();

			const configurationDialog = wrapper.findComponent<typeof VDialog>(
				VideoConferenceConfigurationDialog
			);
			configurationDialog.vm.$emit("start-video-conference");
			await nextTick();

			const dialogContent = configurationDialog.findComponent({
				name: "VCard",
			});

			expect(dialogContent.exists()).toBe(false);
			expect(videoConferenceModule.startVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
				videoConferenceOptions:
					videoConferenceModule.getVideoConferenceInfo.options,
				logoutUrl: `${mockUrl}/rooms/${roomId}?tab=tools`,
			});
			expect(videoConferenceModule.joinVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
			});
		});
	});

	describe("when videoconference configuration dialog emits 'close'", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule } = getWrapper(
				{
					roomId: "roomId",
				},
				[Permission.StartMeeting],
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

			const configurationDialog = wrapper.findComponent<typeof VDialog>(
				VideoConferenceConfigurationDialog
			);
			configurationDialog.vm.$emit("close");
			await nextTick();

			const dialogContent = configurationDialog.findComponent({
				name: "VCard",
			});

			expect(dialogContent.exists()).toBe(false);
			expect(videoConferenceModule.startVideoConference).not.toHaveBeenCalled();
			expect(videoConferenceModule.joinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("when a videoconference is started or joined", () => {
		describe("when an error occurs", () => {
			const setup = () => {
				const error = vi.fn(() => {
					throw new Error();
				});

				const { wrapper } = getWrapper(
					{
						roomId: "roomId",
					},
					[Permission.JoinMeeting],
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
						getLoading: false,
						getError: error,
					}
				);

				return {
					wrapper,
				};
			};

			it("should display an error dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent(RoomVideoConferenceCard);
				await card.trigger("click");

				const errorDialog = wrapper.findAllComponents({ name: "VDialog" })[0];
				const dialogContent = errorDialog.findComponent({ name: "VCard" });

				expect(dialogContent.exists()).toBe(true);
			});
		});

		describe("when no error occurs", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						roomId: "roomId",
					},
					[Permission.JoinMeeting],
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
						getError: null,
					}
				);

				return {
					wrapper,
				};
			};

			it("should not display an error dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent(RoomVideoConferenceCard);
				await card.trigger("click");

				const errorDialog = wrapper.findAllComponents({ name: "VDialog" })[0];
				const dialogContent = errorDialog.findComponent({ name: "VCard" });

				expect(dialogContent.exists()).toBe(false);
			});
		});
	});
});
