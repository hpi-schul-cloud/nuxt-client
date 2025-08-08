<template>
	<default-wireframe
		:headline="$t('pages.administration.ldap.save.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<section class="section">
			<div class="icon-text">
				<div class="icon-text-unit">
					<v-icon class="material-icon" :icon="mdiAccountSchoolOutline" />
					<span>{{ verified.users && verified.users.student }}</span>
					<span>{{ $t("common.labels.students") }}</span>
				</div>
				<div class="icon-text-unit">
					<v-icon class="custom-icon">$teacher</v-icon>
					<span>{{ verified.users && verified.users.teacher }}</span>
					<span>{{ $t("common.labels.teacher.plural") }}</span>
				</div>
				<div class="icon-text-unit">
					<v-icon
						class="material-icon"
						:icon="mdiShieldAccountVariantOutline"
					/>
					<span>{{ verified.users && verified.users.admin }}</span>
					<span>{{ $t("common.labels.admin") }}</span>
				</div>
				<div class="icon-text-unit">
					<v-icon class="custom-icon">$class</v-icon>
					<span>{{ verified.classes && verified.classes.total }}</span>
					<span>{{ $t("common.labels.classes") }}</span>
				</div>
			</div>
			<p class="subtitle-text">
				{{ $t("pages.administration.ldap.save.subtitle") }}
			</p>

			<div v-if="verified.users.sample">
				<p class="category-title">
					{{ $t("pages.administration.ldap.save.example.user") }}
				</p>
				<div>
					<table data-testid="ldapUsersActivateTable">
						<tr v-if="verified.users.sample.roles">
							<td>{{ $t("pages.administration.ldap.activate.roles") }}</td>
							<td>{{ verified.users.sample.roles[0] }}</td>
						</tr>

						<tr v-if="verified.users.sample.lastName">
							<td>{{ $t("pages.administration.ldap.activate.lastName") }}</td>
							<td>{{ verified.users.sample.lastName }}</td>
						</tr>

						<tr v-if="verified.users.sample.firstName">
							<td>
								{{ $t("pages.administration.ldap.activate.firstName") }}
							</td>
							<td>{{ verified.users.sample.firstName }}</td>
						</tr>

						<tr v-if="verified.users.sample.email">
							<td>{{ $t("pages.administration.ldap.activate.email") }}</td>
							<td>{{ verified.users.sample.email }}</td>
						</tr>

						<tr v-if="verified.users.sample.ldapUID">
							<td>{{ $t("pages.administration.ldap.activate.uid") }}</td>
							<td>{{ verified.users.sample.ldapUID }}</td>
						</tr>

						<tr v-if="verified.users.sample.ldapUUID">
							<td>{{ $t("pages.administration.ldap.activate.uuid") }}</td>
							<td>{{ verified.users.sample.ldapUUID }}</td>
						</tr>
					</table>
				</div>
			</div>

			<div v-if="verified.classes.sample">
				<p class="category-title">
					{{ $t("pages.administration.ldap.save.example.class") }}
				</p>
				<div>
					<table data-testid="ldapClassesActivateTable">
						<tr v-if="verified.classes.sample.className">
							<td>
								{{ $t("pages.administration.ldap.activate.className") }}
							</td>
							<td>{{ verified.classes.sample.className }}</td>
						</tr>
						<tr v-if="verified.classes.sample.ldapDn">
							<td>{{ $t("pages.administration.ldap.activate.dN") }}</td>
							<td>{{ verified.classes.sample.ldapDn }}</td>
						</tr>
					</table>
				</div>
			</div>
		</section>
		<div
			v-for="(error, index) in activationErrors"
			:key="index"
			class="errors-container"
		>
			<info-message
				data-testid="errorInfoMessage"
				:message="error"
				type="bc-error"
			/>
		</div>
		<section
			v-if="showUserMigrationOption"
			class="section"
			data-testid="migrateUsersSection"
		>
			<h3 class="title-class">
				{{
					$t("pages.administration.ldap.activate.migrateExistingUsers.title")
				}}
			</h3>
			<base-input
				v-model="migrateUsersCheckbox"
				type="checkbox"
				:label="
					$t('pages.administration.ldap.activate.migrateExistingUsers.checkbox')
				"
				data-testid="migrateUsersCheckbox"
			/>
			<p>
				{{ $t("pages.administration.ldap.activate.migrateExistingUsers.info") }}
			</p>
		</section>
		<div v-if="schoolErrors" class="errors-container">
			<info-message
				data-testid="school-migration-activation-error"
				:message="
					$t('pages.administration.ldap.activate.migrateExistingUsers.error')
				"
				type="bc-error"
			/>
		</div>
		<div class="bottom-buttons">
			<v-btn
				variant="text"
				data-testid="ldapBackButton"
				@click="backButtonHandler"
			>
				<v-icon size="20" class="mr-1">{{ mdiChevronLeft }}</v-icon>
				{{ $t("common.actions.back") }}
			</v-btn>
			<v-btn
				color="primary"
				variant="flat"
				data-testid="ldapSubmitButton"
				:disabled="status === 'pending'"
				@click="submitButtonHandler"
			>
				{{ $t("pages.administration.ldap.save.example.synchronize") }}
			</v-btn>
		</div>
		<base-modal
			v-model:active="submitted.ok"
			:background-click-disabled="true"
			data-testid="confirmModal"
		>
			<template #header />
			<template #body>
				<modal-body-info
					:title="$t('pages.administration.ldap.activate.message')"
				>
					<template #icon>
						<v-icon
							color="rgba(var(--v-theme-success))"
							class="material-icon"
							:icon="mdiCheckCircle"
						/>
					</template>
				</modal-body-info>
			</template>
			<template #footer>
				<modal-footer-confirm
					backgroundcolor="rgba(var(--v-theme-success))"
					:text="$t('pages.administration.ldap.activate.ok')"
					data-testid="ldapOkButton"
					@click="okButtonHandler"
				/>
			</template>
		</base-modal>
	</default-wireframe>
</template>

<script>
import { envConfigModule, schoolsModule } from "@/store";
import { mapGetters } from "vuex";
import { ldapErrorHandler } from "@/utils/ldapErrorHandling";
import { unchangedPassword } from "@/utils/ldapConstants";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@/components/molecules/ModalFooterConfirm";
import InfoMessage from "@/components/atoms/InfoMessage";
import {
	mdiAccountSchoolOutline,
	mdiCheckCircle,
	mdiChevronLeft,
	mdiShieldAccountVariantOutline,
} from "@icons/material";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { SchulcloudTheme } from "@/serverApi/v3";

const redirectToConfigPage = (page) => {
	const { id } = page.$route.query;
	if (id) {
		page.$router.push(`/administration/ldap/config?id=${id}`);
	} else {
		page.$router.push("/administration/ldap/config");
	}
};

export default {
	components: {
		ModalBodyInfo,
		ModalFooterConfirm,
		InfoMessage,
		DefaultWireframe,
	},
	data() {
		return {
			migrateUsersCheckbox: false,
			mdiAccountSchoolOutline,
			mdiCheckCircle,
			mdiChevronLeft,
			mdiShieldAccountVariantOutline,
		};
	},
	computed: {
		...mapGetters("ldap-config", {
			verified: "getVerified",
			temp: "getTemp",
			submitted: "getSubmitted",
			status: "getStatus",
		}),
		showUserMigrationOption() {
			return (
				envConfigModule.getTheme !== SchulcloudTheme.N21 &&
				envConfigModule.getEnv.FEATURE_USER_MIGRATION_ENABLED &&
				!this.$route?.query?.id
			);
		},
		schoolErrors() {
			return schoolsModule.error;
		},
		activationErrors() {
			return ldapErrorHandler(this.submitted.errors, this);
		},
		ldapConfigRoute() {
			const { id } = this.$route.query;
			if (id) {
				return `/administration/ldap/config?id=${id}`;
			} else {
				return "/administration/ldap/config";
			}
		},
		breadcrumbs() {
			return [
				{
					title: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					title: this.$t("pages.administration.school.index.title"),
					href: envConfigModule.getNewSchoolAdminPageAsDefault
						? "/administration/school-settings"
						: "/administration/school",
				},
				{
					title: this.$t("pages.administration.ldap.index.title"),
					href: this.ldapConfigRoute,
				},
				{
					title: this.$t("pages.administration.ldap.activate.breadcrumb"),
					disabled: true,
				},
			];
		},
	},
	created() {
		if (!Object.keys(this.verified).length) {
			redirectToConfigPage(this);
		}
	},
	mounted() {
		this.migrateUsersCheckbox = this.showUserMigrationOption;

		document.title = buildPageTitle(
			this.$t("pages.administration.ldap.save.title")
		);
	},
	methods: {
		backButtonHandler() {
			redirectToConfigPage(this);
		},
		async submitButtonHandler() {
			const { id } = this.$route.query;
			const temporaryConfigData = { ...this.temp };

			if (temporaryConfigData.searchUserPassword === unchangedPassword) {
				temporaryConfigData.searchUserPassword = undefined;
			}

			if (this.migrateUsersCheckbox) {
				await schoolsModule.setSchoolInUserMigration(false);
				if (this.schoolErrors) {
					return;
				}
			}

			if (id) {
				await this.$store.dispatch("ldap-config/patchData", {
					systemData: temporaryConfigData,
					systemId: id,
				});
			} else {
				await this.$store.dispatch(
					"ldap-config/submitData",
					temporaryConfigData
				);
			}
		},
		okButtonHandler() {
			this.$router.push({
				path: `/administration/school`,
			});
		},
	},
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
	font-weight: var(--font-weight-bold);
	white-space: nowrap;
}

.category-title {
	margin: 40px 0 24px 0;
	font-weight: var(--font-weight-bold);
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
