<template>
	<error-page :error="error">
		<template #action>
			<v-btn color="primary" variant="flat" @click="retryPageload">
				{{ $t("error.proxy.action") }}
			</v-btn>
		</template>
	</error-page>
</template>

<script>
import ErrorPage from "@/pages/Error.page.vue";
export default {
	components: {
		ErrorPage,
	},
	layout: "loggedOut",
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
