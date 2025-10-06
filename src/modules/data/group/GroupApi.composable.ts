import { GroupMapper } from "./GroupMapper";
import { GroupListFilter, PaginationOptions } from "./types";
import { GroupApiFactory, GroupListResponse, GroupResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { Group } from "@data-group";
import { AxiosResponse } from "axios";

export const useGroupApi = () => {
	const groupApi = GroupApiFactory(undefined, "/v3", $axios);

	const getGroup = async (groupId: string): Promise<Group> => {
		const response: AxiosResponse<GroupResponse> = await groupApi.groupControllerGetGroup(groupId);

		const group: Group = GroupMapper.mapToGroup(response.data);

		return group;
	};

	const getGroups = async (pagination?: PaginationOptions, filter?: GroupListFilter): Promise<GroupListResponse> => {
		const response: AxiosResponse<GroupListResponse> = await groupApi.groupControllerGetAllGroups(
			pagination?.skip,
			pagination?.limit,
			filter?.availableForSynchronization,
			filter?.name
		);

		return response.data;
	};

	return {
		getGroup,
		getGroups,
	};
};
