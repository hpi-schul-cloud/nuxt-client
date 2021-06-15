<template>
	<section>
		<base-button
			design="text"
			data-testid="ldapBackButton"
			@click="backButtonHandler"
		>
			<base-icon source="material" icon="keyboard_arrow_left" />
			{{ $t("common.actions.back") }}
		</base-button>
		<section class="section">
			<h1 class="h4">{{ $t("pages.administration.ldap.save.title") }}</h1>
			<div class="icon-text">
				<div class="icon-text-unit">
					<base-icon source="material" icon="student" />
					<span>{{ verified.users && verified.users.student }}</span>
					<span>{{ $t("common.labels.student") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="teacher" />
					<span>{{ verified.users && verified.users.teacher }}</span>
					<span>{{ $t("common.labels.teacher.plural") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="admin_panel_settings" />
					<span>{{ verified.users && verified.users.admin }}</span>
					<span>{{ $t("common.labels.admin") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="custom" icon="class" />
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
							<td>{{ $t("pages.administration.ldap.activate.firstName") }}</td>
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
							<td>{{ $t("pages.administration.ldap.activate.className") }}</td>
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
				type="error"
			/>
		</div>
		<div class="bottom-buttons">
			<base-button
				design="text"
				data-testid="ldapBackButton"
				@click="backButtonHandler"
			>
				<base-icon source="material" icon="keyboard_arrow_left" />
				{{ $t("common.actions.back") }}
			</base-button>
			<base-button
				design="secondary"
				data-testid="ldapSubmitButton"
				@click="submitButtonHandler"
				>{{
					$t("pages.administration.ldap.save.example.synchronize")
				}}</base-button
			>
		</div>
		<base-modal
			:active.sync="submitted.ok"
			:background-click-disabled="true"
			data-testid="confirmModal"
		>
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					:title="$t('pages.administration.ldap.activate.message')"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="check_circle"
							style="color: var(--color-success)"
						/>
					</template>
				</modal-body-info>
			</template>
			<template v-slot:footer>
				<modal-footer-confirm
					backgroundcolor="var(--color-success)"
					:text="$t('pages.administration.ldap.activate.ok')"
					data-testid="ldapOkButton"
					@click="okButtonHandler"
				/>
			</template>
		</base-modal>
	</section>
</template>

<script>
import { mapState } from "vuex";
import { ldapErrorHandler } from "@utils/ldapErrorHandling";
import { unchangedPassword } from "@utils/ldapConstants";
import BaseButton from "@/components/base/BaseButton.vue";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import InfoMessage from "@components/atoms/InfoMessage";

const redirectToConfigPage = (page) => {
	const { id } = page.$route.query;
	if (id) {
		page.$router.push(`/administration/ldap/config?id=${id}`);
	} else {
		page.$router.push("/administration/ldap/config");
	}
};

export default {
	components: { BaseButton, ModalBodyInfo, ModalFooterConfirm, InfoMessage },
	meta: {
		requiredPermissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
	},
	computed: {
		...mapState("ldap-config", {
			verified: "verified",
			temp: "temp",
			submitted: "submitted",
		}),
		activationErrors() {
			return ldapErrorHandler(this.submitted.errors, this);
		},
	},
	created() {
		if (!Object.keys(this.verified).length) {
			redirectToConfigPage(this);
		}
	},
	methods: {
		backButtonHandler() {
			redirectToConfigPage(this);
		},
		async submitButtonHandler() {
			const { id } = this.$route.query;
			const temporaryConfigData = { ...this.temp };

			if (temporaryConfigData.searchUserPassword === unchangedPassword) {
				delete temporaryConfigData.searchUserPassword;
			}

			if (id) {
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("ldap-config/patchData", {
					systemData: temporaryConfigData,
					systemId: id,
				});
			} else {
				// TODO wrong use of store (not so bad)
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
	head() {
		return {
			title: `${this.$t("pages.administration.ldap.save.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.subtitle-text {
	margin-top: var(--space-xl);
}
.section {
	margin: var(--space-xl-2);
}
.bottom-buttons {
	display: flex;
	justify-content: space-between;
	margin-top: var(--space-xl);
	margin-right: var(--space-xl);
	margin-left: var(--space-lg);
}
.icon-text {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: var(--space-xl-2);
}
.icon-text-unit {
	margin-top: var(--space-sm);
	margin-right: var(--space-lg);
	font-weight: var(--font-weight-bold);
	white-space: nowrap;
}
.category-title {
	margin: var(--space-xl-2) 0 var(--space-lg) 0;
	font-weight: var(--font-weight-bold);
}
table {
	width: 100%;
	border-collapse: collapse;
}
td {
	min-width: 200px;
	padding: var(--space-sm);
	margin-bottom: var(--space-md);
	white-space: normal;
}
tr:nth-child(odd) {
	background: #ebeef0;
}
.errors-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: var(--space-xl-2);
}
</style>
