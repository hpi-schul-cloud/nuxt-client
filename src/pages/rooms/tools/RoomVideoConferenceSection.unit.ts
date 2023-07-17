import AuthModule from "@/store/auth";
import { VideoConferenceState } from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	AUTH_MODULE_KEY,
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
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[VIDEO_CONFERENCE_MODULE_KEY.valueOf()]: videoConferenceModule,
					[ROOM_MODULE_KEY.valueOf()]: roomModule,
				},
			}
		);

		return {
			wrapper,
			authModule,
			videoConferenceModule,
			roomModule,
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
				const { wrapper } = getWrapper(
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

				expect(configurationDialog.props("value")).toBe(true);
			});
		});
	});

	describe("when open videoconference configuration dialog", () => {
		const setup = () => {
			const { wrapper, videoConferenceModule, roomModule } = getWrapper(
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

			return {
				wrapper,
				videoConferenceModule,
				roomModule,
			};
		};

		it("should set the roomName in dialog title", async () => {
			const { wrapper, roomModule } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});

			await card.vm.$emit("click");

			const configurationDialog = wrapper.find(
				'[data-testid="videoconference-config-dialog"]'
			);
			const cardTitle = configurationDialog.find(
				'[data-testid="videoconference-config-dialog-title"]'
			);
			const title = cardTitle.element.getAttribute("html");

			expect(title).toContain(roomModule.getRoomData.title);
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

		it("should call start with all options true ", async () => {
			const { wrapper, videoConferenceModule, params } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});
			await card.vm.$emit("click");

			const svEveryAttendeeJoinsMuted = wrapper.find(
				'[data-testId="every-attendee-joins-muted"]'
			);
			const svModeratorMustApproveJoinRequests = wrapper.find(
				'[data-testId="moderator-must-approve-join-requests"]'
			);
			const svEverybodyJoinsAsModerator = wrapper.find(
				'[data-testId="everybody-joins-as-moderator"]'
			);

			await svEveryAttendeeJoinsMuted.vm.$emit("change", true);
			await svModeratorMustApproveJoinRequests.vm.$emit("change", true);
			await svEverybodyJoinsAsModerator.vm.$emit("change", true);

			const createBtn = wrapper.find('[data-testId="dialog-create"]');
			await createBtn.vm.$emit("click");

			expect(videoConferenceModule.startVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
				videoConferenceOptions: {
					everyAttendeeJoinsMuted: true,
					moderatorMustApproveJoinRequests: true,
					everybodyJoinsAsModerator: true,
				},
			});
		});

		it("should call start with all options false ", async () => {
			const { wrapper, videoConferenceModule, params } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});
			await card.vm.$emit("click");

			const svEveryAttendeeJoinsMuted = wrapper.find(
				'[data-testId="every-attendee-joins-muted"]'
			);
			const svModeratorMustApproveJoinRequests = wrapper.find(
				'[data-testId="moderator-must-approve-join-requests"]'
			);
			const svEverybodyJoinsAsModerator = wrapper.find(
				'[data-testId="everybody-joins-as-moderator"]'
			);

			await svEveryAttendeeJoinsMuted.vm.$emit("change", false);
			await svModeratorMustApproveJoinRequests.vm.$emit("change", false);
			await svEverybodyJoinsAsModerator.vm.$emit("change", false);

			const createBtn = wrapper.find('[data-testId="dialog-create"]');
			await createBtn.vm.$emit("click");

			expect(videoConferenceModule.startVideoConference).toHaveBeenCalledWith({
				scope: params.scope,
				scopeId: params.scopeId,
				videoConferenceOptions: {
					everyAttendeeJoinsMuted: false,
					moderatorMustApproveJoinRequests: false,
					everybodyJoinsAsModerator: false,
				},
			});
		});

		it("should call start and join videoconference function of store", async () => {
			const { wrapper, videoConferenceModule, params } = setup();

			const card = wrapper.findComponent({
				name: "room-video-conference-card",
			});
			await card.vm.$emit("click");

			const configurationDialog = wrapper.find(
				'[data-testid="videoconference-config-dialog"]'
			);

			const createBtn = wrapper.find('[data-testId="dialog-create"]');
			await createBtn.vm.$emit("click");

			expect(configurationDialog.props("value")).toBe(false);
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

			expect(configurationDialog.props("value")).toBe(false);
			expect(videoConferenceModule.startVideoConference).not.toHaveBeenCalled();
			expect(videoConferenceModule.joinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("when a videoconference is started or joined", () => {
		describe("when an error occurs", () => {
			const setup = () => {
				const error = jest.fn(() => {
					throw new Error();
				});

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

				const card = wrapper.findComponent({
					name: "room-video-conference-card",
				});
				await card.vm.$emit("click");

				const dialog = wrapper.find('[data-testId="error-dialog"]');

				expect(dialog.props("isOpen")).toBe(true);
			});
		});

		describe("when no error occurs", () => {
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
						getError: null,
					}
				);

				return {
					wrapper,
				};
			};

			it("should not display an error dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					name: "room-video-conference-card",
				});
				await card.vm.$emit("click");
				await wrapper.vm.$nextTick();

				const dialog = wrapper.find('[data-testId="error-dialog"]');

				expect(dialog.props("isOpen")).toBe(false);
			});
		});
	});
});
