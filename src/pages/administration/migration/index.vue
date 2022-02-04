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
			<v-stepper v-model="migrationStep" flat>
				<v-stepper-header>
					<v-stepper-step
						:complete="isMaintanenceFinished"
						:editable="isStepEditable(1)"
						step="1"
					>
						{{ $t("pages.administration.migration.step1") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:complete="isMigrationFinished"
						:editable="isStepEditable(2)"
						step="2"
					>
						{{ $t("pages.administration.migration.step2") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:editable="isStepEditable(3)"
						:complete="isMigrationFinished"
						step="3"
					>
						{{ $t("pages.administration.migration.step3") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:complete="isMaintanenceFinished"
						:editable="isStepEditable(4)"
						step="4"
					>
						{{ $t("pages.administration.migration.step4") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="5" :editable="isStepEditable(5)" :complete="migrationStep === 5">
						{{ $t("pages.administration.migration.step5") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</div>

		<div>
			<v-stepper v-model="migrationStep" v-ripple="false" flat>
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
							@click="migrationStep = isMigrationFinished ? 4 : 2"
							>{{ $t("pages.administration.migration.next") }}</v-btn
						>
					</v-stepper-content>

					<v-stepper-content step="2">
						<import-users></import-users>
						<v-btn color="secondary" @click="migrationStep = 1">{{
							$t("pages.administration.migration.back")
						}}</v-btn>
						<v-btn
							id="step3"
							color="primary"
							:disabled="!canStartMigration"
							@click="migrationStep = 3"
							>{{ $t("pages.administration.migration.next") }}</v-btn
						>
					</v-stepper-content>

					<v-stepper-content
						v-if="canStartMigration && !isMigrationFinished"
						step="3"
					>
						<v-card
							:ripple="false"
							elevation="2"
							class="pa-5 mb-10"
							color="grey lighten-5"
						>
							<div v-if="!isLoading">
								<div
									v-html="
										$t('pages.administration.migration.summary', {
											instance: this.$theme.short_name,
											source: $t('pages.administration.migration.ldapSource'),
											importUsersCount: totalImportUsers,
											importUsersUnmatchedCount: totalUnmatched,
											usersUnmatchedCount: totalMatched,
										})
									"
								></div>
								<br />
								<p>
									<v-checkbox
										v-model="isMigrationConfirm"
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
							:disabled="isLoading"
							@click="migrationStep = 2"
							>{{ $t("pages.administration.migration.back") }}</v-btn
						>
						<v-btn
							color="primary"
							:disabled="!isMigrationConfirm || isLoading"
							@click="performMigration"
						>
							<v-progress-circular
								v-if="isLoading"
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
			migrationStep: 1,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
			isMigrationConfirm: false,
			errorTimeout: 7500,
			isLoading: false,
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
		isMigrationFinished() {
			return this.school.inUserMigration === false;
		},
		isMaintanenceFinished() {
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
		totalMatched() {
			return ImportUserModule.getTotalMatched;
		},
		totalUnmatched() {
			return ImportUserModule.getTotalUnmatched;
		},
		totalImportUsers() {
			return ImportUserModule.importUserList.total;
		},
	},
	watch: {
		async progressStepper(val) {
			if (val === "3") {
				await this.summary();
			}
			this.scrollToTop();
		},
	},
	created() {
		this.summary();
	},
	methods: {
    isStepEditable(step) {
      switch (step) {
        case 1:
          return !this.isLoading && !this.isMaintanenceFinished;
        case 2:
          return this.canStartMigration && !this.isMigrationFinished;
        case 3:
          return this.canStartMigration && !this.isMigrationFinished;
        case 4:
          return !this.isLoading && this.isMigrationFinished && !this.isMaintanenceFinished;
        case 5:
        default:
          return false;
      }
    },
		async summary() {
			await ImportUserModule.fetchTotalMatched();
			await ImportUserModule.fetchTotalUnmatched();
		},
		performMigration() {
			// TODO call api
			this.isLoading = true;

			// fake api call
			const getMigrationStatus = true;
			setTimeout(() => {
				this.school.inUserMigration = false;
				this.isLoading = false;
				this.migrationStep = 4;
				resolve({
					getMigrationStatus,
				});
			}, 1000);
		},
		endMaintanence() {
			this.isLoading = true;
			// fake api call
			setTimeout(() => {
				this.school.inMaintenance = false;
				this.isLoading = false;
				this.migrationStep = 5;
			}, 1000);
		},
		resetBusinessError() {
			ImportUserModule.setBusinessError(null);
		},
		scrollToTop() {
			window.scrollTo(0, 0);
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
