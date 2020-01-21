<template>
	<error-page :error="error">
		<template #action>
			<base-button design="primary" @click="retryPageload">
				{{ $t("error.proxy.action") }}
			</base-button>
		</template>
	</error-page>
</template>

<script>
import ErrorPage from "@components/templates/ErrorPage";
export default {
	components: {
		ErrorPage,
	},
	layout: "loggedout",
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
