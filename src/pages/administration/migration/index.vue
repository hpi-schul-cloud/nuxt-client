<template>
	<default-wireframe
		:headline="$t('pages.administration.migration.title')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
		<v-snackbar
			v-model="businessError"
			:timeout="errorTimeout"
			top
			centered
			:color="
				businessError && businessError.statusCode === '200'
					? 'success darken-3'
					: 'error darken-3'
			"
		>
			<div v-if="businessError && businessError.statusCode === '200'">
				{{ businessError.message }}
			</div>
			<div v-else>{{ $t("pages.administration.migration.error") }}</div>
			<template v-slot:action="{ attrs }">
				<v-btn color="white" icon v-bind="attrs" @click="resetBusinessError">
					<v-icon>{{ mdiClose }}</v-icon>
				</v-btn>
			</template>
		</v-snackbar>

		<div slot="header">
			<h1 class="text-h3">{{ $t("pages.administration.migration.title") }}</h1>
			<v-stepper v-model="progressStepper" flat>
				<v-stepper-header>
					<v-stepper-step
						:editable="!loading && !maintanenceFinished"
						:complete="maintanenceFinished"
						step="1"
					>
						{{ $t("pages.administration.migration.step1") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:editable="canStartMigration && !migrationFinished"
						step="2"
						:complete="migrationFinished"
					>
						{{ $t("pages.administration.migration.step2") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:editable="canStartMigration && !migrationFinished"
						:complete="migrationFinished"
						step="3"
					>
						{{ $t("pages.administration.migration.step3") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						step="4"
						:complete="maintanenceFinished"
						:editable="!loading && migrationFinished && !maintanenceFinished"
					>
						{{ $t("pages.administration.migration.step4") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="5">
						{{ $t("pages.administration.migration.step5") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</div>
		<div>
			<v-stepper v-model="progressStepper" v-ripple="false" flat>
				<v-stepper-items>
					<v-stepper-content step="1">
						<v-card
							data-id="migration_tutorial"
							:ripple="false"
							elevation="2"
							class="pa-5 mb-10"
							color="grey lighten-5"
							v-html="
								$t('pages.administration.migration.tutorial', {
									instance: this.$theme.short_name,
								})
							"
						></v-card>
						<v-btn
							id="step2"
							color="primary"
							@click="progressStepper = migrationFinished ? 4 : 2"
							>{{ $t("pages.administration.migration.next") }}</v-btn
						>
					</v-stepper-content>

					<v-stepper-content step="2">
						<import-users></import-users>
						<v-btn color="secondary" @click="progressStepper = 1">{{
							$t("pages.administration.migration.back")
						}}</v-btn>
						<v-btn
							id="step3"
							color="primary"
							:disabled="!canStartMigration"
							@click="progressStepper = 3"
							>{{ $t("pages.administration.migration.next") }}</v-btn
						>
					</v-stepper-content>

					<v-stepper-content
						v-if="canStartMigration && !migrationFinished"
						step="3"
					>
						<v-card
							:ripple="false"
							elevation="2"
							class="pa-5 mb-10"
							color="grey lighten-5"
						>
							<div v-if="!loading">
								<div
									v-html="
										$t('pages.administration.migration.summary', {
											instance: this.$theme.short_name,
											source: $t('pages.administration.migration.ldapSource'),
											importUsersCount: 'XXX',
											importUsersUnmatchedCount: 'YYY',
											usersUnmatchedCount: 'ZZZ',
										})
									"
								></div>
								<br />
								<p>
									<v-checkbox
										v-model="migrationConfirm"
										:label="$t('pages.administration.migration.confirm')"
									></v-checkbox>
								</p>
							</div>
							<div v-else>
								<v-progress-linear indeterminate></v-progress-linear>
								{{ $t("pages.administration.migration.performingMigration") }}
							</div>
						</v-card>
						<v-btn
							color="secondary"
							:disabled="loading"
							@click="progressStepper = 2"
							>{{ $t("pages.administration.migration.back") }}</v-btn
						>
						<v-btn
							color="primary"
							:disabled="!migrationConfirm || loading"
							@click="performMigration"
						>
							<v-progress-circular
								v-if="loading"
								:size="20"
								indeterminate
							></v-progress-circular>
							{{ $t("pages.administration.migration.migrate") }}</v-btn
						>
					</v-stepper-content>

					<v-stepper-content v-if="canFinishMaintanence" step="4">
						<v-card
							:ripple="false"
							elevation="2"
							class="pa-5 mb-10"
							color="grey lighten-5"
							v-html="$t('pages.administration.migration.endTransferPhase')"
						></v-card>
						<v-btn class="primary" @click="endMaintanence">{{
							$t("pages.administration.migration.finishTransferPhase")
						}}</v-btn>
					</v-stepper-content>

					<v-stepper-content step="5">
						<v-card
							:ripple="false"
							elevation="2"
							class="pa-5 mb-10"
							color="grey lighten-5"
							v-html="$t('pages.administration.migration.waitForSync')"
						></v-card>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</div>
	</default-wireframe>
</template>
<script>
import { mdiClose } from "@mdi/js";

import SchoolsModule from "@/store/schools";
import ImportUserModule from "@store/import-users";

import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import ImportUsers from "@components/organisms/administration/importUsers";
export default {
	components: { DefaultWireframe, ImportUsers },
	layout: "defaultVuetify",
	data() {
		return {
			mdiClose,
			progressStepper: 1,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
			migrationConfirm: false,
			errorTimeout: 7500,
			loading: false,
		};
	},
	computed: {
		canStartMigration() {
			return this.school.inUserMigration === true && this.school.inMaintenance;
		},
		canFinishMaintanence() {
			// TODO
			return true;
			//return this.school.inUserMigration === false && this.school.inMaintenance;
		},
		migrationFinished() {
			return this.school.inUserMigration === false;
		},
		maintanenceFinished() {
			return !this.school.inMaintenance;
		},
		school() {
			return SchoolsModule.getSchool;
		},
		businessError() {
			const error = ImportUserModule.getBusinessError;
			if (error && error.message && error.statusCode) {
				return {
					message: error.message,
					statusCode: error.statusCode,
				};
			}
			return false;
		},
	},
	methods: {
		performMigration() {
			// TODO call api
			this.loading = true;

			// fake api call
			const getMigrationStatus = true;
			setTimeout(() => {
				this.school.inUserMigration = false;
				this.loading = false;
				this.progressStepper = 4;
				resolve({
					getMigrationStatus,
				});
			}, 1000);
		},
		endMaintanence() {
			this.loading = true;
			// fake api call
			setTimeout(() => {
				this.school.inMaintenance = false;
				this.loading = false;
				this.progressStepper = 5;
			}, 1000);
		},
		resetBusinessError() {
			ImportUserModule.setBusinessError(null);
		},
	},
	head() {
		return {
			title: this.$t("pages.administration.migration.title"),
		};
	},
};
</script>
<style scoped>
.v-stepper__content {
	padding: 0;
}
</style>
