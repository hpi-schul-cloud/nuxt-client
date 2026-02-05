<template>
	<section>
		<InfoModalFullWidth
			:model-value="showModal"
			:title="getTitle"
			:description="getDescription"
			design="primary"
			@update:model-value="buttonHandler"
		>
			<template #icon>
				<VIcon size="60">{{ activated ? mdiEmailCheckOutline : mdiEmailRemoveOutline }}</VIcon>
			</template>
		</InfoModalFullWidth>
	</section>
</template>

<script>
import InfoModalFullWidth from "@/components/legacy/InfoModalFullWidth.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiEmailCheckOutline, mdiEmailRemoveOutline } from "@icons/material";
import { logger } from "@util-logger";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { mapGetters } from "vuex";

export default defineComponent({
	components: {
		InfoModalFullWidth,
	},
	setup() {
		const { t } = useI18n();
		return { t };
	},
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
						title = this.t("pages.activation._activationCode.index.success.email");
						break;

					default:
						break;
				}
			} else {
				switch (this.keyword) {
					default:
						title = this.t("pages.activation._activationCode.index.error.title");
						break;
				}
			}
			return title;
		},
		getDescription() {
			let description = "";
			if (!this.activated) {
				description = this.t("pages.activation._activationCode.index.error.description");
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
});
</script>

<style scoped>
section {
	margin-top: 10%;
}
</style>
