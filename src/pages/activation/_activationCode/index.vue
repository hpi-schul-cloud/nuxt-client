<template>
	<section>
		<info-modal-full-width
			:title="getTitle"
			:active="showModal"
			:description="getDescription"
			design="secondary"
			@update:active="buttonHandler"
		>
			<template v-slot:icon>
				<base-icon
					source="custom"
					:icon="activated ? 'mail-check' : 'mail-error'"
					style="color: var(--color-tertiary);"
				/>
			</template>
		</info-modal-full-width>
	</section>
</template>

<script>
import InfoModalFullWidth from "@components/molecules/InfoModalFullWidth";

export default {
	components: {
		InfoModalFullWidth,
	},
	data() {
		return {
			activated: false,
			showModal: false,
		};
	},
	computed: {
		getTitle() {
			let title;
			if (this.activated) {
				title = this.$t("pages.acctivation.index.success");
			} else {
				title = this.$t("Deine Daten konnten nicht geändert werden");
			}
			return title;
		},
		getDescription() {
			let description;
			if (this.activated) {
				description = "";
			} else {
				description =
					"Deine Änderungen konnten leider nicht durchgeführt werden, da der Link ungültig oder abgelaufen ist. Bitte versuche es erneut.";
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
				this.activated = true;
			} catch (e) {
				console.log(e);
			}
			this.showModal = true;
		},
	},
	layout: "loggedout",
};
</script>

<style lang="scss" scoped>
@import "@styles";

section {
	// stylelint-disable
	margin-top: 10%;
}
</style>
