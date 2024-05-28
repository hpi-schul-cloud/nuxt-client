import {
	EduSharingApiFactory,
	EduSharingApiInterface,
} from "@/eduSharingApi/v3";
import { $axios } from "@/utils/api";

export const useEduSharingApi = () => {
	const eduSharingApi: EduSharingApiInterface = EduSharingApiFactory(
		undefined,
		"/v3",
		$axios
	);

	const getEduAppXMLData = async (): Promise<string> => {
		const response = await eduSharingApi.getEduAppXMLData();
		return response.data;
	};

	const getTicketAuthenticationInfo = async (
		ticket: string
	): Promise<string> => {
		const response = await eduSharingApi.getTicketAuthenticationInfo(ticket);
		return response.data;
	};

	const getTicketForUser = async (userName?: string): Promise<string> => {
		const response = await eduSharingApi.getTicketForUser(userName);
		return response.data;
	};

	return {
		getEduAppXMLData,
		getTicketAuthenticationInfo,
		getTicketForUser,
	};
};
