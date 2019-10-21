<template>
	<error-page :error="error" />
</template>

<script>
import ErrorPage from "@components/templates/ErrorPage";
export default {
	components: {
		ErrorPage,
	},
	layout: "loggedout",
	data() {
		return {
			error: {
				statusCode: 500,
				message:
					"Wir haben ein kleines Problem mit unserer Infrastruktur. Wir sind gleich wieder da.",
			},
		};
	},
};
</script>
