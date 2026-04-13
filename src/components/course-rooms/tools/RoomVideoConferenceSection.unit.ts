import RoomVideoConferenceCard from "./RoomVideoConferenceCard.vue";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";
import { createTestAppStore, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission, RoleName, VideoConferenceScope, VideoConferenceStateResponse } from "@api-server";
import { useVideoConference } from "@data-access";
import { createTestingPinia } from "@pinia/testing";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, nextTick, ref } from "vue";

vi.mock("@data-access");

describe("RoomVideoConferenceSection", () => {
	let useVideoConferenceMock: Mocked<ReturnType<typeof useVideoConference>>;

	const getWrapper = (options: {
		roomId: string;
		userPermissions?: (Permission.JOIN_MEETING | Permission.START_MEETING)[];
		isExternalPerson?: boolean;
		videoConferenceState?: VideoConferenceStateResponse;
		everyAttendeeJoinsMuted?: boolean;
		moderatorMustApproveJoinRequests?: boolean;
		everybodyJoinsAsModerator?: boolean;
		isLoading?: boolean;
		fetchError?: Error;
		startError?: Error;
		joinError?: Error;
	}) => {
		const {
			roomId,
			userPermissions = [],
			isExternalPerson = false,
			videoConferenceState = VideoConferenceStateResponse.NOT_STARTED,
			everyAttendeeJoinsMuted = false,
			moderatorMustApproveJoinRequests = false,
			everybodyJoinsAsModerator = false,
			isLoading = false,
			fetchError,
			startError,
			joinError,
		} = options;

		Object.defineProperty(window, "location", {
			value: { origin: "https://mock.com" },
			writable: true,
		});

		useVideoConferenceMock = mockComposable(useVideoConference, {
			videoConferenceInfo: ref({
				state: videoConferenceState,
				options: {
					everyAttendeeJoinsMuted,
					moderatorMustApproveJoinRequests,
					everybodyJoinsAsModerator,
				},
			}),
			isLoading: computed(() => isLoading),
			fetchError: ref(fetchError),
			startError: ref(startError),
			joinError: ref(joinError),
			isConferenceRunning: computed(() => videoConferenceState === VideoConferenceStateResponse.RUNNING),
			isWaitingRoomActive: computed(() => moderatorMustApproveJoinRequests),
		});

		vi.mocked(useVideoConference).mockReturnValue(useVideoConferenceMock);

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
			props: { roomId },
		});

		return { wrapper, useVideoConferenceMock };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should call useVideoConference with COURSE scope and roomId", () => {
		getWrapper({ roomId: "roomId", userPermissions: [Permission.JOIN_MEETING] });

		expect(useVideoConference).toHaveBeenCalledWith(VideoConferenceScope.COURSE, "roomId");
	});

	describe("when the video conference is not running", () => {
		it("should set the video conference card to not running", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				videoConferenceState: VideoConferenceStateResponse.NOT_STARTED,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRunning")).toBe(false);
		});
	});

	describe("when the video conference is running", () => {
		it("should set the video conference card to running", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRunning")).toBe(true);
		});
	});

	describe("when the video conference is loading", () => {
		it("should set the video conference card to refreshing", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				isLoading: true,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("isRefreshing")).toBe(true);
		});
	});

	describe("when the user is an expert and the waiting room is not active", () => {
		it("should set the video conference card to not have permission", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				isExternalPerson: true,
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(false);
		});
	});

	describe("when the user is an expert and the waiting room is active", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				isExternalPerson: true,
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
				moderatorMustApproveJoinRequests: true,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user has the join permission", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.JOIN_MEETING],
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user has the start permission", () => {
		it("should set the video conference card to have permission", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.START_MEETING],
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(true);
		});
	});

	describe("when the user does not have the permissions", () => {
		it("should set the video conference card to not have permission", () => {
			const { wrapper } = getWrapper({
				roomId: "roomId",
				videoConferenceState: VideoConferenceStateResponse.RUNNING,
			});

			expect(wrapper.findComponent(RoomVideoConferenceCard).props("hasPermission")).toBe(false);
		});
	});

	describe("when the video conference card requests a refresh", () => {
		it("should call fetchVideoConferenceInfo", () => {
			const { wrapper, useVideoConferenceMock } = getWrapper({ roomId: "roomId" });

			wrapper.findComponent(RoomVideoConferenceCard).vm.$emit("refresh");

			expect(useVideoConferenceMock.fetchVideoConferenceInfo).toHaveBeenCalledTimes(1);
		});

		it("should not call fetchVideoConferenceInfo when already loading", () => {
			const { wrapper, useVideoConferenceMock } = getWrapper({
				roomId: "roomId",
				isLoading: true,
			});

			wrapper.findComponent(RoomVideoConferenceCard).vm.$emit("refresh");

			expect(useVideoConferenceMock.fetchVideoConferenceInfo).not.toHaveBeenCalled();
		});
	});

	describe("when the video conference card is clicked", () => {
		describe("when the video conference is running", () => {
			it("should call joinVideoConference", async () => {
				const { wrapper, useVideoConferenceMock } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.JOIN_MEETING],
					videoConferenceState: VideoConferenceStateResponse.RUNNING,
				});

				await wrapper.findComponent(RoomVideoConferenceCard).trigger("click");

				expect(useVideoConferenceMock.joinVideoConference).toHaveBeenCalled();
			});
		});

		describe("when the video conference is not running", () => {
			it("should open the videoconference configuration dialog", async () => {
				const { wrapper } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.START_MEETING],
					videoConferenceState: VideoConferenceStateResponse.NOT_STARTED,
				});

				await wrapper.findComponent(RoomVideoConferenceCard).trigger("click");

				expect(wrapper.findComponent(VideoConferenceConfigurationDialog).props("isOpen")).toBe(true);
			});
		});
	});

	describe("when videoconference configuration dialog emits 'start-video-conference'", () => {
		const setup = () =>
			getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.START_MEETING],
				videoConferenceState: VideoConferenceStateResponse.NOT_STARTED,
				moderatorMustApproveJoinRequests: true,
			});

		it("should call startVideoConference with correct options", () => {
			const { wrapper, useVideoConferenceMock } = setup();

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");

			expect(useVideoConferenceMock.startVideoConference).toHaveBeenCalledWith({
				everyAttendeeJoinsMuted: false,
				moderatorMustApproveJoinRequests: true,
				everybodyJoinsAsModerator: false,
			});
		});

		it("should call joinVideoConference after a successful start", async () => {
			const { wrapper, useVideoConferenceMock } = setup();

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");
			await nextTick();

			expect(useVideoConferenceMock.startVideoConference).toHaveBeenCalled();
			expect(useVideoConferenceMock.joinVideoConference).toHaveBeenCalled();
		});

		it("should not call joinVideoConference if start failed", async () => {
			const { wrapper, useVideoConferenceMock } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.START_MEETING],
				videoConferenceState: VideoConferenceStateResponse.NOT_STARTED,
				moderatorMustApproveJoinRequests: true,
				startError: new Error("start failed"),
			});

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("start-video-conference");
			await nextTick();

			expect(useVideoConferenceMock.startVideoConference).toHaveBeenCalled();
			expect(useVideoConferenceMock.joinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("when videoconference configuration dialog emits 'close'", () => {
		it("should close the configuration dialog without starting or joining", async () => {
			const { wrapper, useVideoConferenceMock } = getWrapper({
				roomId: "roomId",
				userPermissions: [Permission.START_MEETING],
				videoConferenceState: VideoConferenceStateResponse.NOT_STARTED,
			});

			wrapper.findComponent(VideoConferenceConfigurationDialog).vm.$emit("close");
			await nextTick();

			expect(wrapper.findComponent(VideoConferenceConfigurationDialog).props("isOpen")).toBe(false);
			expect(useVideoConferenceMock.startVideoConference).not.toHaveBeenCalled();
			expect(useVideoConferenceMock.joinVideoConference).not.toHaveBeenCalled();
		});
	});

	describe("error dialog", () => {
		const getErrorDialog = (wrapper: ReturnType<typeof getWrapper>["wrapper"]) =>
			wrapper.findAllComponents({ name: "VDialog" })[0];

		describe("when a fetchError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.JOIN_MEETING],
					fetchError: new Error("fetch failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when a startError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.START_MEETING],
					startError: new Error("start failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when a joinError is present", () => {
			it("should display the error dialog", () => {
				const { wrapper } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.JOIN_MEETING],
					joinError: new Error("join failed"),
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(true);
			});
		});

		describe("when no error is present", () => {
			it("should not display the error dialog", () => {
				const { wrapper } = getWrapper({
					roomId: "roomId",
					userPermissions: [Permission.JOIN_MEETING],
				});

				expect(getErrorDialog(wrapper).findComponent({ name: "VCard" }).exists()).toBe(false);
			});
		});
	});
});
