<template>
	<error-page :error="error" />
</template>

<script>
import ErrorPage from "@components/templates/ErrorPage";
export default {
	components: {
		ErrorPage,
	},
	props: {
		error: {
			type: Object,
			default: () => ({
				statusCode: 404,
			}),
		},
	},
};
</script>
