import {
	VideoConferenceApiFactory,
	VideoConferenceApiInterface,
	VideoConferenceInfoResponse,
	VideoConferenceScope,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { MigrationLinks } from "./types/user-login-migration";
import {
	VideoConferenceInfo,
	VideoConferenceState,
} from "./types/video-conference";

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
			moderatorMustApproveJoinRequests: false,
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
	setVideoConferenceInfo(videoConferenceInfo: VideoConferenceInfo): void {
		this.videoConferenceInfo = videoConferenceInfo;
	}

	@Action
	async fetchVideoConferenceInfo(params: {
		scope: VideoConferenceScope;
		scopeId: string;
	}): Promise<void> {
		this.setLoading(true);

		try {
			const response: AxiosResponse<VideoConferenceInfoResponse> =
				await this.videoConferenceApi.videoConferenceControllerInfo(
					params.scope,
					params.scopeId
				);

			const mapped: VideoConferenceInfo = {
				state: response.data.state as unknown as VideoConferenceState, // TODO
				options: response.data.options,
			};

			this.setVideoConferenceInfo(mapped);
		} catch (error: unknown) {
			this.setError(error);
		}

		this.setLoading(false);
	}
}
