<template>
	<default-wireframe
		:headline="$t('pages.administration.migration.title')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
		<div slot="header">
			<h1 class="text-h3">{{ $t("pages.administration.migration.title") }}</h1>
			<v-stepper v-model="progressStepper" flat>
				<v-stepper-header>
					<v-stepper-step editable step="1"> Intro </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step editable step="2"> Accounts matching </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step editable step="3"> Summary </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="4"> Finish </v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</div>
		<div>
			<v-stepper v-model="progressStepper" flat>
				<v-stepper-items>
					<v-stepper-content step="1">
						<v-card elevation="2" class="pa-2 mb-10" color="grey lighten-5"
							>TODO info / tutorial</v-card
						>
						<v-btn color="primary" @click="progressStepper = 2">
							Continue
						</v-btn>
					</v-stepper-content>
					<v-stepper-content step="2">
						<import-users></import-users>
						<v-btn color="primary" @click="progressStepper = 3">
							Continue
						</v-btn>
					</v-stepper-content>
					<v-stepper-content step="3">
						<v-card elevation="2" class="pa-2 mb-10" color="grey lighten-5"
							>TODO summary</v-card
						>
						<v-btn color="primary" @click="progressStepper = 2">Back</v-btn>
						<v-btn color="secondary">Finish Migration</v-btn>
					</v-stepper-content>
					<v-stepper-content step="4">
						<v-card elevation="2" class="pa-2 mb-10" color="grey lighten-5"
							>TODO show message or redirect</v-card
						>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</div>
	</default-wireframe>
</template>
<script>
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import ImportUsers from "@components/organisms/administration/importUsers";
export default {
	components: { DefaultWireframe, ImportUsers },
	layout: "defaultVuetify",
	data() {
		return {
			progressStepper: 1,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
		};
	},
	head() {
		return {
			title: this.$t("pages.administration.migration.title"),
		};
	},
};
</script>
