<template>
	<section>
		<info-modal-full-width
			:title="getTitle"
			:active="showModal"
			:description="getDescription"
			design="primary"
			@update:active="buttonHandler"
		>
			<template #icon>
				<v-icon class="material-icon">{{
					activated ? mdiEmailCheckOutline : mdiEmailRemoveOutline
				}}</v-icon>
			</template>
		</info-modal-full-width>
	</section>
</template>

<script>
import InfoModalFullWidth from "@/components/molecules/InfoModalFullWidth.vue";
import { mapGetters } from "vuex";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiEmailCheckOutline, mdiEmailRemoveOutline } from "@icons/material";
import { logger } from "@util-logger";

export default {
	components: {
		InfoModalFullWidth,
	},
	layout: "loggedOut",
	data() {
		return {
			activated: false,
			keyword: null,
			showModal: false,
			mdiEmailCheckOutline,
			mdiEmailRemoveOutline,
		};
	},
	computed: {
		...mapGetters("activation", {
			data: "getList",
		}),
		getTitle() {
			let title = "";
			if (this.activated) {
				switch (this.keyword) {
					case "eMailAddress":
						title = this.$t(
							"pages.activation._activationCode.index.success.email"
						);
						break;

					default:
						break;
				}
			} else {
				switch (this.keyword) {
					default:
						title = this.$t(
							"pages.activation._activationCode.index.error.title"
						);
						break;
				}
			}
			return title;
		},
		getDescription() {
			let description = "";
			if (!this.activated) {
				description = this.$t(
					"pages.activation._activationCode.index.error.description"
				);
			}
			return description;
		},
	},
	created() {
		this.submitHandler();
		document.title = buildPageTitle(this.getTitle);
	},
	methods: {
		buttonHandler() {
			this.showModal = false;
			this.$router.push({
				path: `/`,
			});
		},
		async submitHandler() {
			const { activationCode } = this.$route.params;
			try {
				await this.$store.dispatch("activation/update", [activationCode]);
				this.keyword = this.data[0].keyword;
				this.activated = this.data[0].success;
			} catch (e) {
				logger.error(e);
			}
			this.showModal = true;
		},
	},
};
</script>

<style lang="scss" scoped>
section {
	margin-top: 10%;
}
</style>
