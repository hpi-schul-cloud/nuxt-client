<template>
	<section>
		<info-modal-full-width
			:title="getTitle"
			:active="showModal"
			:description="getDescription"
			design="secondary"
			@update:active="buttonHandler"
		>
			<template #icon>
				<base-icon
					source="custom"
					:icon="activated ? 'mail-check' : 'mail-error'"
					style="color: var(--v-secondary-base)"
				/>
			</template>
		</info-modal-full-width>
	</section>
</template>

<script>
import InfoModalFullWidth from "@/components/molecules/InfoModalFullWidth";
import { mapGetters } from "vuex";

export default {
	components: {
		InfoModalFullWidth,
	},
	data() {
		return {
			activated: false,
			keyword: null,
			showModal: false,
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
	created(ctx) {
		this.submitHandler();
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
				console.log(e);
			}
			this.showModal = true;
		},
	},
	layout: "loggedOut",
};
</script>

<style lang="scss" scoped>
section {
	// stylelint-disable
	margin-top: 10%;
}
</style>
