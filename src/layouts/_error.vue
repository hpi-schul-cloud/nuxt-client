<template>
	<error-page :error="error" :error-object="errorObject" />
</template>

<script>
import ErrorPage from "@components/templates/ErrorPage";
import { applicationErrorModule } from "@/store";
export default {
	components: {
		ErrorPage,
	},
	meta: {
		isPublic: true,
	},
	// props: {
	// 	error: {
	// 		type: Object,
	// 		required: true,
	// 	},
	// },
	computed: {
		errorObject() {
			return applicationErrorModule.error;
		},
	},
};
</script>
