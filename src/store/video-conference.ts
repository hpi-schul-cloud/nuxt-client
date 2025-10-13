import { VideoConferenceInfo, VideoConferenceOptions, VideoConferenceState } from "./types/video-conference";
import {
	VideoConferenceApiFactory,
	VideoConferenceApiInterface,
	VideoConferenceInfoResponse,
	VideoConferenceJoinResponse,
	VideoConferenceScope,
	VideoConferenceStateResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

const videoConferenceStateMapping: Partial<Record<VideoConferenceStateResponse, VideoConferenceState>> = {
	[VideoConferenceStateResponse.Running]: VideoConferenceState.RUNNING,
	[VideoConferenceStateResponse.NotStarted]: VideoConferenceState.NOT_STARTED,
};

@Module({
	name: "videoConferenceModule",
	namespaced: true,
	stateFactory: true,
})
export default class VideoConferenceModule extends VuexModule {
	private videoConferenceInfo: VideoConferenceInfo = {
		state: VideoConferenceState.NOT_STARTED,
		options: {
			everyAttendeeJoinsMuted: false,
			everybodyJoinsAsModerator: false,
			moderatorMustApproveJoinRequests: true,
		},
	};
	private loading = false;
	private error: unknown | null = null;

	private get videoConferenceApi(): VideoConferenceApiInterface {
		return VideoConferenceApiFactory(undefined, "v3", $axios);
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): unknown | null {
		return this.error;
	}

	get getVideoConferenceInfo(): VideoConferenceInfo {
		return this.videoConferenceInfo;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: unknown | null): void {
		this.error = error;
	}

	@Mutation
	resetError(): void {
		this.error = null;
	}

	@Mutation
	setVideoConferenceInfo(videoConferenceInfo: VideoConferenceInfo): void {
		this.videoConferenceInfo = videoConferenceInfo;
	}

	@Action
	async fetchVideoConferenceInfo(params: { scope: VideoConferenceScope; scopeId: string }): Promise<void> {
		this.setLoading(true);

		try {
			const response: AxiosResponse<VideoConferenceInfoResponse> =
				await this.videoConferenceApi.videoConferenceControllerInfo(params.scope, params.scopeId);

			const mapped: VideoConferenceInfo = {
				state: videoConferenceStateMapping[response.data.state] ?? VideoConferenceState.UNKNOWN,
				options: response.data.options,
			};

			this.setVideoConferenceInfo(mapped);
		} catch (error: unknown) {
			this.setError(error);
		}

		this.setLoading(false);
	}

	@Action
	async joinVideoConference(params: { scope: VideoConferenceScope; scopeId: string }) {
		this.setLoading(true);

		try {
			const response: AxiosResponse<VideoConferenceJoinResponse> =
				await this.videoConferenceApi.videoConferenceControllerJoin(params.scope, params.scopeId);

			this.setLoading(false);

			return response.data;
		} catch (error: unknown) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async startVideoConference(params: {
		scope: VideoConferenceScope;
		scopeId: string;
		videoConferenceOptions: VideoConferenceOptions;
		logoutUrl?: string;
	}): Promise<void> {
		this.setLoading(true);

		try {
			await this.videoConferenceApi.videoConferenceControllerStart(params.scope, params.scopeId, {
				...params.videoConferenceOptions,
				logoutUrl: params.logoutUrl,
			});

			this.setVideoConferenceInfo({
				state: VideoConferenceState.RUNNING,
				options: params.videoConferenceOptions,
			});
		} catch (error: unknown) {
			this.setError(error);
		}

		this.setLoading(false);
	}
}
