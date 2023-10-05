<template>
	<div>
		<div v-if="!isGracePeriodExpired" data-testId="migration-control-section">
			<RenderHTML
				data-testid="text-description"
				:html="
					t('components.administration.adminMigrationSection.description', {
						supportLink,
					})
				"
				component="p"
			/>
			<div v-if="isStartButtonVisible">
				<v-alert light text type="info">
					<div class="alert-text">
						<RenderHTML
							data-testid="migration-info-text"
							:html="
								t('components.administration.adminMigrationSection.infoText')
							"
							component="span"
						/>
					</div>
				</v-alert>
			</div>
			<div v-else-if="isMigrationActive">
				<v-alert light text type="info">
					<div class="alert-text">
						<RenderHTML
							data-testid="migration-active-status"
							:html="
								t(
									'components.administration.adminMigrationSection.migrationActive'
								)
							"
							component="span"
						/>
					</div>
				</v-alert>
			</div>
			<v-btn
				v-if="isStartButtonVisible"
				class="my-4 button-start"
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
				v-if="isEndButtonVisible"
				class="my-4 button-end"
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

		<migration-warning-card
			value="start"
			v-if="isStartWarningVisible"
			data-testid="migration-start-warning-card"
			@start="onToggleShowStartWarning"
			@set="onStartMigration()"
		/>

		<migration-warning-card
			value="end"
			v-if="isEndWarningVisible"
			data-testid="migration-end-warning-card"
			@end="onToggleShowEndWarning"
			@set="onCloseMigration()"
		/>

		<RenderHTML
			v-if="oauthMigration && oauthMigration.finishedAt"
			class="migration-completion-date"
			data-testid="migration-finished-timestamp"
			:html="
				t(latestMigration, {
					date: dayjs(oauthMigration.closedAt).format('DD.MM.YYYY'),
					time: dayjs(oauthMigration.closedAt).format('HH:mm'),
					finishDate: dayjs(oauthMigration.finishedAt).format('DD.MM.YYYY'),
					finishTime: dayjs(oauthMigration.finishedAt).format('HH:mm'),
				})
			"
			component="p"
		/>

		<v-switch
			v-if="!isGracePeriodExpired & globalFeatureEnableLdapSyncDuringMigration"
			:label="
				t(
					'components.administration.adminMigrationSection.enableSyncDuringMigration.label'
				)
			"
			:disabled="!isMigrationActive"
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
import { School } from "@/store/types/schools";
import {
	ENV_CONFIG_MODULE_KEY,
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
import MigrationWarningCard from "./MigrationWarningCard.vue";
import { RenderHTML } from "@feature-render-html";
import { useI18n } from "@/composables/i18n.composable";
import { UserLoginMigration } from "@/store/user-login-migration";
import { UserLoginMigrationFlags } from "@/store/user-login-migration/user-login-migration-flags";

export default defineComponent({
	name: "AdminMigrationSection",
	components: {
		MigrationWarningCard,
		RenderHTML,
	},
	setup() {
		const { t } = useI18n();
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const userLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);

		onMounted(async () => {
			// TODO remove in https://ticketsystem.dbildungscloud.de/browse/N21-820
			await schoolsModule.fetchSchoolOAuthMigration();
			await userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser();
		});

		const userLoginMigration: ComputedRef<UserLoginMigration | undefined> =
			computed(() => userLoginMigrationModule.getUserLoginMigration);

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

		const isMigrationActive: ComputedRef<boolean> = computed(
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

		// TODO remove in https://ticketsystem.dbildungscloud.de/browse/N21-820
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

		const isEndWarningVisible: Ref<boolean> = ref(false);

		const onToggleShowEndWarning = () => {
			isEndWarningVisible.value = !isEndWarningVisible.value;
		};

		const isStartWarningVisible: Ref<boolean> = ref(false);

		const onToggleShowStartWarning = () => {
			isStartWarningVisible.value = !isStartWarningVisible.value;
		};

		const isEndButtonVisible: ComputedRef<boolean> = computed(
			() =>
				isMigrationActive.value &&
				!isEndWarningVisible.value &&
				!isStartWarningVisible.value
		);

		const isStartButtonVisible: ComputedRef<boolean> = computed(
			() =>
				!isEndButtonVisible.value &&
				!isEndWarningVisible.value &&
				!isStartWarningVisible.value
		);

		const isShowMandatorySwitch: ComputedRef<boolean> = computed(
			() => !isEndWarningVisible.value && !isStartWarningVisible.value
		);

		const isGracePeriodExpired: ComputedRef<boolean> = computed(() => {
			if (userLoginMigration.value?.finishedAt) {
				return (
					Date.now() >= new Date(userLoginMigration.value.finishedAt).getTime()
				);
			} else {
				return false;
			}
		});

		const latestMigration: ComputedRef<string> = computed(() => {
			if (isGracePeriodExpired.value) {
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
			onStartMigration,
			setMigrationMandatory,
			onCloseMigration,
			t,
			isEndWarningVisible,
			onToggleShowEndWarning,
			isStartWarningVisible,
			onToggleShowStartWarning,
			isStartButtonVisible,
			isEndButtonVisible,
			isShowMandatorySwitch,
			isGracePeriodExpired,
			latestMigration,
			dayjs,
			supportLink,
			school,
			setSchoolFeatures,
			globalFeatureShowOutdatedUsers,
			globalFeatureEnableLdapSyncDuringMigration,
			officialSchoolNumber,
			isMigrationActive,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: var(--v-black-base) !important;
	line-height: var(--line-height-lg) !important;
}
</style>
