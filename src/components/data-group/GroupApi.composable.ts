import { $axios } from "@/utils/api";
import { GroupApiFactory, GroupResponse } from "@/serverApi/v3";
import { AxiosResponse } from "axios";
import { GroupMapper } from "./GroupMapper";
import { Group } from "@data-group";

export const useGroupApi = () => {
	const groupApi = GroupApiFactory(undefined, "/v3", $axios);

	const getGroup = async (groupId: string): Promise<Group> => {
		const response: AxiosResponse<GroupResponse> =
			await groupApi.groupControllerGetGroup(groupId);

		const group: Group = GroupMapper.mapToGroup(response.data);

		return group;
	};

	return {
		getGroup,
	};
};
