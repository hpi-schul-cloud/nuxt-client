<template>
	<v-custom-dialog
		:is-open="openDialog"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['cancel', 'next']"
		@dialog-closed="onCloseDialog"
		@next="onNext"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2 wordbreak-normal">
			Teilen Einstellungen
		</div>

		<template slot="content">
			<div>
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon class="blue--text text--darken-1">{{
							mdiInformation
						}}</v-icon>
					</div>
					<div>
						Mit dem folgenden Link kann der Kurs als Kopie von anderen
						Lehrkräften importiert werden. Personenbezogene Daten werden dabei
						nicht importiert.
					</div>
				</div>
				<div class="d-flex justify-space-between">
					<div>Link nur schulintern gültig</div>
					<v-switch
						v-model="shareOptions.schoolInternally"
						color="primary"
						value
						input-value="true"
						class="ma-0"
					></v-switch>
				</div>
				<div class="d-flex justify-space-between">
					<div>Link läuft nach 7 Tagen ab</div>
					<v-switch
						v-model="shareOptions.expiresInSevenDays"
						color="primary"
						value
						input-value="true"
						class="ma-0"
					></v-switch>
				</div>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation } from "@mdi/js";

export default {
	name: "ShareModal",
	components: { vCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
		},
	},
	data() {
		return {
			mdiInformation,
			shareOptions: {
				schoolInternally: true,
				expiresInSevenDays: true,
			},
			openDialog: false,
		};
	},
	watch: {
		isOpen(newValue) {
			this.openDialog = newValue;
		},
	},
	methods: {
		onCloseDialog() {
			this.$emit("dialog-closed", false);
			this.openDialog = false;
		},
		onNext() {},
	},
};
</script>

<style scoped lang="scss">
.wordbreak-normal {
	word-break: normal;
}
</style>
