import {
	GroupApiFactory,
	GroupEntryResponse,
	GroupResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { Group } from "@data-group";
import { AxiosResponse } from "axios";
import { GroupMapper } from "./GroupMapper";
import { GroupListFilter } from "./types";

export const useGroupApi = () => {
	const groupApi = GroupApiFactory(undefined, "/v3", $axios);

	const getGroup = async (groupId: string): Promise<Group> => {
		const response: AxiosResponse<GroupResponse> =
			await groupApi.groupControllerGetGroup(groupId);

		const group: Group = GroupMapper.mapToGroup(response.data);

		return group;
	};

	const getGroups = async (
		options?: GroupListFilter
	): Promise<GroupEntryResponse[]> => {
		const response: AxiosResponse<GroupEntryResponse[]> =
			await groupApi.groupControllerGetAllGroups(
				options?.availableForSynchronization
			);

		return response.data;
	};

	return {
		getGroup,
		getGroups,
	};
};
