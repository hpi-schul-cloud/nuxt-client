import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";
// TODO: move composable to shared position
import { useVideoConference } from "@/modules/feature/board-video-conference-element/composables/VideoConference.composable";
import { VideoConferenceState } from "@/store/types/video-conference";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission, RoleName, VideoConferenceScope } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { setActivePinia } from "pinia";
import { computed, nextTick, ref } from "vue";

const mockFetchVideoConferenceInfo = vi.fn();
const mockStartVideoConference = vi.fn();
const mockJoinVideoConference = vi.fn();

const mockVideoConferenceInfo = ref({
	state: VideoConferenceState.NOT_STARTED,
	options: {
		everyAttendeeJoinsMuted: false,
		moderatorMustApproveJoinRequests: false,
		everybodyJoinsAsModerator: false,
	},
});
const mockIsFetching = ref(false);
const mockFetchError = ref<Error | undefined>(undefined);
const mockStartError = ref<Error | undefined>(undefined);
const mockJoinError = ref<Error | undefined>(undefined);

vi.mock("@/modules/feature/board-video-conference-element/composables/VideoConference.composable", () => ({
	useVideoConference: vi.fn(() => ({
		videoConferenceInfo: mockVideoConferenceInfo,
		isFetching: mockIsFetching,
		fetchError: mockFetchError,
		startError: mockStartError,
		joinError: mockJoinError,
		isConferenceRunning: computed(() => mockVideoConferenceInfo.value.state === VideoConferenceState.RUNNING),
		isWaitingRoomActive: computed(() => mockVideoConferenceInfo.value.options.moderatorMustApproveJoinRequests),
		fetchVideoConferenceInfo: mockFetchVideoConferenceInfo,
		startVideoConference: mockStartVideoConference,
		joinVideoConference: mockJoinVideoConference,
	})),
}));

describe("RoomVideoConferenceSection", () => {
	const mockUrl = "https://mock.com";

	const getWrapper = (
		props: { roomId: string },
		userPermissions: (Permission.JOIN_MEETING | Permission.START_MEETING)[],
		isExternalPerson: boolean,
		overrides?: {
			videoConferenceInfo?: {
				state: VideoConferenceState;
				options: {
					everyAttendeeJoinsMuted: boolean;
					moderatorMustApproveJoinRequests: boolean;
					everybodyJoinsAsModerator: boolean;
				};
			};
			isFetching?: boolean;
			fetchError?: Error;
			startError?: Error;
			joinError?: Error;
		}
	) => {
		Object.defineProperty(window, "location", {
			value: { origin: mockUrl },
			writable: true,
		});

		mockVideoConferenceInfo.value = overrides?.videoConferenceInfo ?? {
			state: VideoConferenceState.NOT_STARTED,
			options: {
				everyAttendeeJoinsMuted: false,
				moderatorMustApproveJoinRequests: false,
				everybodyJoinsAsModerator: false,
			},
		};
		mockIsFetching.value = overrides?.isFetching ?? false;
		mockFetchError.value = overrides?.fetchError;
		mockStartError.value = overrides?.startError;
		mockJoinError.value = overrides?.joinError;

		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStore({
			me: {
				permissions: userPermissions,
				roles: isExternalPerson ? [{ id: "expert", name: RoleName.EXTERNAL_PERSON }] : [],
			},
		});

		const wrapper = mount(RoomVideoConferenceSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					VideoConferenceConfigurationDialog: true,
				},
			},
			props,
		});

		return { wrapper };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should call useVideoConference with COURSE scope and roomId", () => {
		getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false);

		expect(useVideoConference).toHaveBeenCalledWith(VideoConferenceScope.COURSE, "roomId");
	});

	it("should call fetchVideoConferenceInfo on mount", () => {
		getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false);

		expect(mockFetchVideoConferenceInfo).toHaveBeenCalled();
	});

	describe("when the video conference is not running", () => {
		it("should set the video conference card to not running", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.NOT_STARTED,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRunning")).toBe(false);
		});
	});

	describe("when the video conference is running", () => {
		it("should set the video conference card to running", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRunning")).toBe(true);
		});
	});

	describe("when the video conference is fetching", () => {
		it("should set the video conference card to refreshing", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
				isFetching: true,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRefreshing")).toBe(true);
		});
	});

	describe("when the user is an expert and the waiting room is not active", () => {
		it("should set the video conference card to not have permission", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], true, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(false);
		});
	});

	describe("when the user is an expert and the waiting room is active", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], true, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: true,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user has the join permission", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user has the start permission", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.START_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user does not have the permissions", () => {
		it("should set the video conference card to not have permission", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.RUNNING,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(false);
		});
	});

	describe("when the video conference card requests a refresh", () => {
		it("should call fetchVideoConferenceInfo", () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [], false);
			mockFetchVideoConferenceInfo.mockClear();

			wrapper.findComponent(RoomVideoConferenceCard).vm.$emit("refresh");

			expect(mockFetchVideoConferenceInfo).toHaveBeenCalledTimes(1);
		});
	});

	describe("when the video conference card is clicked", () => {
		describe("when the video conference is running", () => {
			it("should call joinVideoConference", async () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
					videoConferenceInfo: {
						state: VideoConferenceState.RUNNING,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
				});

				await wrapper.findComponent(RoomVideoConferenceCard).trigger("click");

				expect(mockJoinVideoConference).toHaveBeenCalled();
			});
		});

		describe("when the video conference is not running", () => {
			it("should open the videoconference configuration dialog", async () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.START_MEETING], false, {
					videoConferenceInfo: {
						state: VideoConferenceState.NOT_STARTED,
						options: {
							everyAttendeeJoinsMuted: false,
							moderatorMustApproveJoinRequests: false,
							everybodyJoinsAsModerator: false,
						},
					},
				});

				await wrapper.findComponent(RoomVideoConferenceCard).trigger("click");

				expect(wrapper.findComponent(VideoConferenceConfigurationDialog).props("isOpen")).toBe(true);
			});
		});
	});

	describe("when videoconference configuration dialog emits 'start-video-conference'", () => {
		const setup = () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.START_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.NOT_STARTED,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: true,
						everybodyJoinsAsModerator: false,
					},
				},
			});
			return { wrapper };
		};

		it("should call startVideoConference with correct options", () => {
			const { wrapper } = setup();

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");

			expect(mockStartVideoConference).toHaveBeenCalledWith({
				everyAttendeeJoinsMuted: false,
				moderatorMustApproveJoinRequests: true,
				everybodyJoinsAsModerator: false,
			});
		});

		it("should call joinVideoConference after a successful start", async () => {
			const { wrapper } = setup();

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");
			await nextTick();

			expect(mockStartVideoConference).toHaveBeenCalled();
			expect(mockJoinVideoConference).toHaveBeenCalled();
		});

		it("should not call joinVideoConference if start failed", async () => {
			const { wrapper } = setup();
			mockStartError.value = new Error("start failed");

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");
			await nextTick();

			expect(mockStartVideoConference).toHaveBeenCalled();
			expect(mockJoinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("when videoconference configuration dialog emits 'close'", () => {
		it("should close the configuration dialog without starting or joining", async () => {
			const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.START_MEETING], false, {
				videoConferenceInfo: {
					state: VideoConferenceState.NOT_STARTED,
					options: {
						everyAttendeeJoinsMuted: false,
						moderatorMustApproveJoinRequests: false,
						everybodyJoinsAsModerator: false,
					},
				},
			});

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("close");
			await nextTick();

			expect(wrapper.findComponent(VideoConferenceConfigurationDialog).props("isOpen")).toBe(false);
			expect(mockStartVideoConference).not.toHaveBeenCalled();
			expect(mockJoinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("error dialog", () => {
		const getErrorDialog = (wrapper: ReturnType<typeof getWrapper>["wrapper"]) =>
			wrapper.findAllComponents({ name: "VDialog" })[0];

		describe("when a fetchError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
					fetchError: new Error("fetch failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when a startError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.START_MEETING], false, {
					startError: new Error("start failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when a joinError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false, {
					joinError: new Error("join failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when no error is present", () => {
			it("should not display the error dialog", () => {
				const { wrapper } = getWrapper({ roomId: "roomId" }, [Permission.JOIN_MEETING], false);

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(false);
			});
		});
	});
});
