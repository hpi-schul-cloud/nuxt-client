<template>
	<DefaultWireframe :headline="t('pages.administration.ldap.save.title')" :breadcrumbs="breadcrumbs" max-width="short">
		<section v-if="verified" class="section">
			<div class="icon-text">
				<div class="icon-text-unit">
					<VIcon :icon="mdiAccountSchoolOutline" />
					<span>{{ verified.users && verified.users.student }}</span>
					<span>{{ t("common.labels.students") }}</span>
				</div>
				<div class="icon-text-unit">
					<VIcon :icon="mdiHumanMaleBoard" />
					<span>{{ verified.users && verified.users.teacher }}</span>
					<span>{{ t("common.labels.teacher.plural") }}</span>
				</div>
				<div class="icon-text-unit">
					<VIcon :icon="mdiShieldAccountVariantOutline" />
					<span>{{ verified.users && verified.users.admin }}</span>
					<span>{{ t("common.labels.admin") }}</span>
				</div>
				<div class="icon-text-unit">
					<VIcon :icon="mdiAccountEye" />
					<span>{{ verified.classes && verified.classes.total }}</span>
					<span>{{ t("common.labels.classes") }}</span>
				</div>
			</div>
			<p class="subtitle-text">
				{{ t("pages.administration.ldap.save.subtitle") }}
			</p>

			<div v-if="verified.users.sample">
				<p class="category-title">
					{{ t("pages.administration.ldap.save.example.user") }}
				</p>
				<div>
					<table data-testid="ldapUsersActivateTable">
						<tr v-if="verified.users.sample.roles">
							<td>{{ t("pages.administration.ldap.activate.roles") }}</td>
							<td>{{ verified.users.sample.roles[0] }}</td>
						</tr>

						<tr v-if="verified.users.sample.lastName">
							<td>{{ t("pages.administration.ldap.activate.lastName") }}</td>
							<td>{{ verified.users.sample.lastName }}</td>
						</tr>

						<tr v-if="verified.users.sample.firstName">
							<td>
								{{ t("pages.administration.ldap.activate.firstName") }}
							</td>
							<td>{{ verified.users.sample.firstName }}</td>
						</tr>

						<tr v-if="verified.users.sample.email">
							<td>{{ t("pages.administration.ldap.activate.email") }}</td>
							<td>{{ verified.users.sample.email }}</td>
						</tr>

						<tr v-if="verified.users.sample.ldapUID">
							<td>{{ t("pages.administration.ldap.activate.uid") }}</td>
							<td>{{ verified.users.sample.ldapUID }}</td>
						</tr>

						<tr v-if="verified.users.sample.ldapUUID">
							<td>{{ t("pages.administration.ldap.activate.uuid") }}</td>
							<td>{{ verified.users.sample.ldapUUID }}</td>
						</tr>
					</table>
				</div>
			</div>

			<div v-if="verified.classes.sample">
				<p class="category-title">
					{{ t("pages.administration.ldap.save.example.class") }}
				</p>
				<div>
					<table data-testid="ldapClassesActivateTable">
						<tr v-if="verified.classes.sample.className">
							<td>
								{{ t("pages.administration.ldap.activate.className") }}
							</td>
							<td>{{ verified.classes.sample.className }}</td>
						</tr>
						<tr v-if="verified.classes.sample.ldapDn">
							<td>{{ t("pages.administration.ldap.activate.dN") }}</td>
							<td>{{ verified.classes.sample.ldapDn }}</td>
						</tr>
					</table>
				</div>
			</div>
		</section>
		<div v-for="(error, index) in activationErrors" :key="index" class="errors-container">
			<InfoMessage data-testid="errorInfoMessage" :message="error" type="bc-error" />
		</div>
		<section v-if="showUserMigrationOption" class="section" data-testid="migrateUsersSection">
			<h2 class="title-class">
				{{ t("pages.administration.ldap.activate.migrateExistingUsers.title") }}
			</h2>
			<VCheckbox
				v-model="migrateUsersCheckbox"
				:label="t('pages.administration.ldap.activate.migrateExistingUsers.checkbox')"
				data-testid="migrateUsersCheckbox"
			/>
			<p>
				{{ t("pages.administration.ldap.activate.migrateExistingUsers.info") }}
			</p>
		</section>
		<div v-if="importUsersError" class="errors-container">
			<InfoMessage
				data-testid="school-migration-activation-error"
				:message="t('pages.administration.ldap.activate.migrateExistingUsers.error')"
				type="bc-error"
			/>
		</div>
		<div class="bottom-buttons">
			<VBtn variant="text" data-testid="ldapBackButton" @click="onBack">
				<VIcon size="20" class="mr-1">{{ mdiChevronLeft }}</VIcon>
				{{ t("common.actions.back") }}
			</VBtn>
			<VBtn
				color="primary"
				variant="flat"
				data-testid="ldapSubmitButton"
				:disabled="status === 'pending'"
				@click="onSubmit"
			>
				{{ t("pages.administration.ldap.save.example.synchronize") }}
			</VBtn>
		</div>
		<VDialog :model-value="submitted?.ok" :persistent="true" data-testid="confirmModal" width="480">
			<VCard>
				<VCardText class="d-flex flex-column align-center text-center">
					<VIcon size="60" color="success" :icon="mdiCheckCircle" />
					<h2 class="mt-4">{{ t("pages.administration.ldap.activate.message") }}</h2>
				</VCardText>
				<VCardActions>
					<VBtn
						variant="flat"
						block
						color="success"
						:text="t('pages.administration.ldap.activate.ok')"
						data-testid="ldapOkButton"
						@click="onConfirm"
					/>
				</VCardActions>
			</VCard>
		</VDialog>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { ldapErrorHandler } from "@/utils/ldap-error-handling.utils";
import { unchangedPassword } from "@/utils/ldapConstants";
import { buildPageTitle } from "@/utils/pageTitle";
import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useImportUsersStore } from "@data-import-users";
import { useLdapConfigStore } from "@data-ldap";
import {
	mdiAccountEye,
	mdiAccountSchoolOutline,
	mdiCheckCircle,
	mdiChevronLeft,
	mdiHumanMaleBoard,
	mdiShieldAccountVariantOutline,
} from "@icons/material";
import { type Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const importUsersStore = useImportUsersStore();
const ldapConfigStore = useLdapConfigStore();
const { verified, submitted, ldapFormData, status } = storeToRefs(ldapConfigStore);

const { updateLdapConfig, createLdapConfig } = ldapConfigStore;

const migrateUsersCheckbox = ref(false);

const showUserMigrationOption = computed(
	() =>
		useEnvConfig().value.SC_THEME !== SchulcloudTheme.N21 &&
		useEnvConfig().value.FEATURE_USER_MIGRATION_ENABLED &&
		!route?.query?.id
);

const importUsersError = computed(() => importUsersStore.businessError);
const activationErrors = computed(() => ldapErrorHandler(submitted.value?.errors, t));

const ldapConfigRoute = computed(() => {
	const { id } = route.query;
	if (id) {
		return `/administration/ldap/config?id=${id}`;
	} else {
		return "/administration/ldap/config";
	}
});

const redirectToConfigPage = () => {
	router.push(ldapConfigRoute.value);
};

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("pages.administration.school.index.title"),
		to: "/administration/school-settings",
	},
	{
		title: t("pages.administration.ldap.index.title"),
		to: ldapConfigRoute.value,
	},
	{
		title: t("pages.administration.ldap.activate.breadcrumb"),
		disabled: true,
	},
]);

const pageTitle = buildPageTitle(t("pages.administration.ldap.save.title"));
useTitle(pageTitle);

onMounted(() => {
	if (!verified.value) {
		redirectToConfigPage();
	}

	migrateUsersCheckbox.value = showUserMigrationOption.value;
});

const onBack = () => {
	redirectToConfigPage();
};

const onSubmit = async () => {
	const { id } = route.query;
	const temporaryConfigData = { ...ldapFormData.value };

	if (temporaryConfigData.searchUserPassword === unchangedPassword) {
		temporaryConfigData.searchUserPassword = undefined;
	}

	if (migrateUsersCheckbox.value) {
		await importUsersStore.setSchoolInUserMigration(false);
		if (importUsersStore.businessError) {
			return;
		}
	}

	if (id) {
		await updateLdapConfig(temporaryConfigData, id as string);
	} else {
		await createLdapConfig(temporaryConfigData);
	}
};

const onConfirm = () => {
	router.push({
		path: `/administration/school-settings`,
	});
};
</script>

<style lang="scss" scoped>
.subtitle-text {
	margin-top: 32px;
}

.section {
	margin: 40px;
}

.bottom-buttons {
	display: flex;
	justify-content: space-between;
	margin-top: 32px;
	margin-right: 32px;
	margin-left: 24px;
}

.icon-text {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 40px;
}

.icon-text-unit {
	margin-top: 12px;
	margin-right: 24px;
	font-weight: bold;
	white-space: nowrap;
}

.category-title {
	margin: 40px 0 24px 0;
	font-weight: bold;
}

table {
	width: 100%;
	border-collapse: collapse;
}

td {
	min-width: 200px;
	padding: 12px;
	margin-bottom: 16px;
	white-space: normal;
}

tr:nth-child(odd) {
	background: #ebeef0;
}

.errors-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 40px;
}

.title-class {
	margin-top: 52px;
	margin-bottom: 24px;
}
</style>
