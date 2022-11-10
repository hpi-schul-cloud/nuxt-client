<template>
	<error-page :error="error">
		<template #action>
			<v-btn color="primary" depressed @click="retryPageload">
				{{ $t("error.proxy.action") }}
			</v-btn>
		</template>
	</error-page>
</template>

<script>
import ErrorPage from "@components/templates/ErrorPage";
export default {
	components: {
		ErrorPage,
	},
	layout: "loggedOut",
	meta: {
		isPublic: true,
	},
	data() {
		return {
			error: {
				statusCode: 500,
				message: this.$t("error.proxy.description"),
			},
			url: "",
		};
	},
	created() {
		const { redirect } = this.$route.query;
		if (redirect) {
			this.url = redirect;
			setTimeout(() => {
				this.retryPageload();
			}, 10000);
		}
	},
	methods: {
		retryPageload() {
			location.href = this.url;
		},
	},
};
</script>
