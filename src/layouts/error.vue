<template>
	<error-page :error="error" />
</template>

<script>
import ErrorPage from "@/components/templates/ErrorPage";
export default {
	components: {
		ErrorPage,
	},
	meta: {
		isPublic: true,
	},
	props: {
		error: {
			type: Object,
			required: true,
		},
	},
};
</script>
