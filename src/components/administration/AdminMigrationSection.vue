<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<div
			v-if="!isCurrentDateAfterFinalFinish"
			data-testId="migration-control-section"
		>
			<RenderHTML
				data-testid="text-description"
				:html="
					t('components.administration.adminMigrationSection.description', {
						supportLink,
					})
				"
				component="p"
			/>
			<div v-if="isShowStartButton">
				<v-alert light prominent text type="info">
					<RenderHTML
						:html="
							t('components.administration.adminMigrationSection.infoText')
						"
						component="span"
					/>
				</v-alert>
			</div>
			<div v-else-if="isShowActiveMigration">
				<v-alert light prominent text type="info">
					<RenderHTML
						data-testid="migration-active-status"
						:html="
							t(
								'components.administration.adminMigrationSection.migrationActive'
							)
						"
						component="span"
					/>
				</v-alert>
			</div>
			<v-btn
				v-if="isShowStartButton"
				class="my-5 button-start"
				color="primary"
				depressed
				:disabled="!officialSchoolNumber"
				data-testid="migration-start-button"
				@click="onToggleShowStartWarning"
			>
				{{
					t(
						"components.administration.adminMigrationSection.migrationEnableButton.label"
					)
				}}
			</v-btn>
			<v-btn
				v-if="isShowEndButton"
				class="my-5 button-end"
				color="primary"
				depressed
				:disabled="!oauthMigration.startedAt"
				data-testid="migration-end-button"
				@click="onToggleShowEndWarning"
			>
				{{
					t(
						"components.administration.adminMigrationSection.migrationEndButton.label"
					)
				}}
			</v-btn>
			<v-switch
				v-show="isShowMandatorySwitch"
				:label="
					t(
						'components.administration.adminMigrationSection.mandatorySwitch.label'
					)
				"
				:disabled="!oauthMigration.startedAt"
				:true-value="true"
				:false-value="false"
				:value="oauthMigration.mandatorySince"
				inset
				dense
				class="ml-1"
				data-testid="migration-mandatory-switch"
				@change="setMigrationMandatory(!oauthMigration.mandatorySince)"
			/>
		</div>
		<RenderHTML
			v-if="oauthMigration.finishedAt"
			class="migration-completion-date"
			data-testid="migration-finished-timestamp"
			:html="
				t(finalFinishText, {
					date: dayjs(oauthMigration.closedAt).format('DD.MM.YYYY'),
					time: dayjs(oauthMigration.closedAt).format('HH:mm'),
					finishDate: dayjs(oauthMigration.finishedAt).format('DD.MM.YYYY'),
					finishTime: dayjs(oauthMigration.finishedAt).format('HH:mm'),
				})
			"
			component="p"
		/>
		<migration-warning-card
			value="start"
			v-if="isShowStartWarning"
			data-testid="migration-start-warning-card"
			@start="onToggleShowStartWarning"
			@set="onStartMigration()"
		/>
		<migration-warning-card
			value="end"
			v-if="isShowEndWarning"
			data-testid="migration-end-warning-card"
			@end="onToggleShowEndWarning"
			@set="onCloseMigration()"
		/>
		<v-switch
			v-if="
				!isCurrentDateAfterFinalFinish &
				globalFeatureEnableLdapSyncDuringMigration
			"
			:label="
				t(
					'components.administration.adminMigrationSection.enableSyncDuringMigration.label'
				)
			"
			:disabled="!oauthMigration.oauthMigrationPossible"
			v-model="school.features.enableLdapSyncDuringMigration"
			inset
			dense
			class="ml-1"
			data-testid="enable-sync-during-migration-switch"
			@change="setSchoolFeatures"
		/>
		<v-switch
			v-if="globalFeatureShowOutdatedUsers"
			:label="
				t(
					'components.administration.adminMigrationSection.showOutdatedUsers.label'
				)
			"
			v-model="school.features.showOutdatedUsers"
			inset
			dense
			class="ml-1"
			data-testid="show-outdated-users-switch"
			@change="setSchoolFeatures"
		/>
		<p
			v-if="globalFeatureShowOutdatedUsers"
			data-testid="show-outdated-users-description"
		>
			{{
				t(
					"components.administration.adminMigrationSection.showOutdatedUsers.description"
				)
			}}
		</p>
	</div>
</template>

<script lang="ts">
import { MigrationBody } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import { OauthMigration, School } from "@/store/types/schools";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import dayjs from "dayjs";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
	watch,
} from "vue";
import VueI18n from "vue-i18n";
import MigrationWarningCard from "./MigrationWarningCard.vue";
import { RenderHTML } from "@feature-render-html";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import { UserLoginMigration } from "@/store/user-login-migration";
import { UserLoginMigrationFlags } from "../../store/user-login-migration/user-login-migration-flags";

export default defineComponent({
	name: "AdminMigrationSection",
	components: {
		MigrationWarningCard,
		RenderHTML,
	},
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const schoolsModule: SchoolsModule | undefined =
			injectStrict(SCHOOLS_MODULE_KEY);
		const userLoginMigrationModule: UserLoginMigrationModule | undefined =
			injectStrict(USER_LOGIN_MIGRATION_MODULE_KEY);

		onMounted(async () => {
			await userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser();
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values): string =>
			i18n.tc(key, 0, values);

		const userLoginMigration: ComputedRef<UserLoginMigration> = computed(
			() => userLoginMigrationModule.getUserLoginMigration
		);

		const oauthMigration: ComputedRef<UserLoginMigrationFlags> = computed(
			() => {
				return {
					startedAt: !!userLoginMigration.value?.startedAt,
					mandatorySince: !!userLoginMigration.value?.mandatorySince,
					closedAt: userLoginMigration.value?.closedAt,
					finishedAt: userLoginMigration.value?.finishedAt,
				};
			}
		);

		const isShowActiveMigration: ComputedRef<boolean> = computed(
			() => oauthMigration.value.startedAt && !oauthMigration.value.closedAt
		);

		const onStartMigration = () => {
			if (oauthMigration.value.startedAt) {
				userLoginMigrationModule.restartUserLoginMigration();
			} else {
				userLoginMigrationModule.startUserLoginMigration();
			}
		};

		const setMigrationMandatory = (mandatory: boolean) => {
			userLoginMigrationModule.setUserLoginMigrationMandatory(mandatory);
		};

		const onCloseMigration = () => {
			userLoginMigrationModule.closeUserLoginMigration();
		};

		const setMigration = async (available: boolean, mandatory: boolean) => {
			const migrationFlags: MigrationBody = {
				oauthMigrationPossible: available,
				oauthMigrationMandatory: mandatory,
				oauthMigrationFinished: !available,
			};
			await schoolsModule.setSchoolOauthMigration(migrationFlags);
			await schoolsModule.fetchSchool();
		};

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);
		watch(school, async () => {
			await schoolsModule.fetchSchoolOAuthMigration();
		});

		const isShowEndWarning: Ref<boolean> = ref(false);

		const onToggleShowEndWarning = () => {
			isShowEndWarning.value = !isShowEndWarning.value;
		};

		const isShowStartWarning: Ref<boolean> = ref(false);

		const onToggleShowStartWarning = () => {
			isShowStartWarning.value = !isShowStartWarning.value;
		};

		const isShowEndButton: ComputedRef<boolean> = computed(
			() =>
				oauthMigration.value.startedAt &&
				!oauthMigration.value.closedAt &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowStartButton: ComputedRef<boolean> = computed(
			() =>
				!isShowEndButton.value &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowMandatorySwitch: ComputedRef<boolean> = computed(
			() => !isShowEndWarning.value && !isShowStartWarning.value
		);

		const isCurrentDateAfterFinalFinish: ComputedRef<boolean> = computed(() => {
			if (userLoginMigration.value.finishedAt) {
				return (
					Date.now() >= new Date(userLoginMigration.value.finishedAt).getTime()
				);
			} else {
				return false;
			}
		});

		const finalFinishText: ComputedRef<string> = computed(() => {
			if (isCurrentDateAfterFinalFinish.value) {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.textComplete";
			} else {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.text";
			}
		});

		const officialSchoolNumber: ComputedRef<string | undefined> = computed(
			() => schoolsModule.getSchool.officialSchoolNumber
		);

		const getSubject = (): string => {
			const subject = encodeURIComponent(
				`Schule mit der Nummer: ${
					officialSchoolNumber.value ?? "???"
				} soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!`
			);

			return subject;
		};

		const supportLink: ComputedRef<string> = computed(
			() =>
				`mailto:${
					envConfigModule.getAccessibilityReportEmail
				}?subject=${getSubject()}`
		);

		const globalFeatureEnableLdapSyncDuringMigration: ComputedRef<boolean> =
			computed(() => envConfigModule.getEnableLdapSyncDuringMigration);

		const globalFeatureShowOutdatedUsers: ComputedRef<boolean> = computed(
			() => envConfigModule.getShowOutdatedUsers
		);

		const setSchoolFeatures = async () => {
			await schoolsModule.update({
				id: school.value.id,
				features: school.value.features,
			});
		};

		return {
			oauthMigration,
			setMigration,
			onStartMigration,
			setMigrationMandatory,
			onCloseMigration,
			t,
			isShowEndWarning,
			onToggleShowEndWarning,
			isShowStartWarning,
			onToggleShowStartWarning,
			isShowStartButton,
			isShowEndButton,
			isShowMandatorySwitch,
			isCurrentDateAfterFinalFinish,
			finalFinishText,
			dayjs,
			supportLink,
			school,
			setSchoolFeatures,
			globalFeatureShowOutdatedUsers,
			globalFeatureEnableLdapSyncDuringMigration,
			officialSchoolNumber,
			isShowActiveMigration,
		};
	},
});
</script>
