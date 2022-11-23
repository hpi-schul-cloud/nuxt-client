import {ApplicationError} from "@store/types/application-error";
import {createApplicationError} from "@utils/create-application-error.factory";
import {applicationErrorModule} from "@/store";
import Vue from "vue";

export const handleApplicationError = (err: ApplicationError | Error) => {
	if (err.name === "ApplicationError") {
		applicationErrorModule.setError(err as ApplicationError); // WIP
		return;
	}
	applicationErrorModule.setError(createApplicationError(500, "error.generic"));
};

Vue.config.errorHandler = handleApplicationError;
