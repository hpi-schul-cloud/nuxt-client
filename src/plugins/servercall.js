const errorPageCodes = [404, 500];
const serverCallWrapper = (error, $axios) => async (
	ctx,
	axiosCall,
	serverEndpoint,
	params
) => {
	try {
		ctx.commit("resetServerError");
		const result = await axiosCall.bind($axios)(serverEndpoint, params);
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
		throw err;
	}
};

export default ({ error, $axios }, inject) => {
	inject("serverCall", serverCallWrapper(error, $axios));
};
