import { SystemsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { ProvisioningOptions } from "./type";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

export const useProvisioningOptionsApi = () => {
	const { handleError } = useErrorHandler();
	const provisioningApi = SystemsApiFactory(undefined, "/v3", $axios); //TODO N21-1479 ProvisioningOptionsApiFactory

	const getProvisioningOptions = async (
		systemId: string,
		schoolId: string
	): Promise<ProvisioningOptions> => {
		// try {
		const provisioningOptions: ProvisioningOptions = {
			class: true,
			course: false,
			others: false,
		};

		return provisioningOptions;
		/* } catch (error) {
			handleError(error, {
				404: undefined,
				500: undefined,
			});
			return {
				class: true,
				course: false,
				others: false,
			};
		} */
	};

	const saveProvisioningOptions = async (
		systemId: string,
		schoolId: string,
		provisioningOptions: ProvisioningOptions
	): Promise<ProvisioningOptions> => {
		//TODO N21-1479 call api with POST with errorhandling
		const savedOptions = {
			class: provisioningOptions.class,
			course: provisioningOptions.course,
			others: provisioningOptions.others,
		};
		console.log(
			"save has been called with",
			systemId,
			schoolId,
			provisioningOptions
		);
		return savedOptions;
	};

	return {
		getProvisioningOptions,
		saveProvisioningOptions,
	};
};
