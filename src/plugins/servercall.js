const errorPageCodes = [404, 500];
const serverCallWrapper = (error) => async (
	ctx,
	axiosCall,
	serverEndpoint,
	params
) => {
	try {
		const result = await axiosCall(serverEndpoint, params);
		ctx.commit("resetServerError");
		return result;
	} catch (err) {
		const serverError = { statusCode: null, message: null };
		if (!err.response) {
			serverError.message = "Network failure";
			error(serverError);
		} else {
			const code = parseInt(err.response.data.code);
			if (errorPageCodes.includes(code)) {
				serverError.statusCode = code;
				serverError.message = err.response.data.message;
				error(serverError);
			}
		}
		ctx.commit("setServerError", serverError);
	}
};

export default ({ error }, inject) => {
	inject("serverCall", serverCallWrapper(error));
};
