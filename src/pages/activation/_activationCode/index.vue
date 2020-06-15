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
				title = "Deine E-Mail-Adresse wurde  erfolgreich geändert.";
			} else {
				title = "Fehler bei der Validierung";
			}
			return title;
		},
		getDescription() {
			let description;
			if (this.activated) {
				description = "";
			} else {
				description = "Es gibt ein Problem. Bitte versuche es später erneut.";
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
</style>
