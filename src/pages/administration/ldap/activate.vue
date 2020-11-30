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
					<span>{{ verified.users.student }}</span>
					<span>{{ $t("common.labels.student") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="teacher" />
					<span>{{ verified.users.teacher }}</span>
					<span>{{ $t("common.labels.teacher.plural") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="admin_panel_settings" />
					<span>{{ verified.users.admin }}</span>
					<span>{{ $t("common.labels.admin") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="custom" icon="class" />
					<span>{{ verified.classes.total }}</span>
					<span>{{ $t("common.labels.classes") }}</span>
				</div>
			</div>
			<p class="subtitle-text">
				{{ $t("pages.administration.ldap.save.subtitle") }}
			</p>

			<p class="category-title">
				{{ $t("pages.administration.ldap.save.example.user") }}
			</p>
			<div>
				<table data-testid="ldapUsersActivateTable">
					<tr
						v-for="(row, index) in Object.entries(formattedUserVerifiedData)"
						:key="index"
						class="table-row"
					>
						<td>{{ row[0] }}</td>
						<td>{{ row[1] }}</td>
					</tr>
				</table>
			</div>

			<p class="category-title">
				{{ $t("pages.administration.ldap.save.example.class") }}
			</p>
			<div>
				<table data-testid="ldapClassesActivateTable">
					<tr
						v-for="(row, index) in Object.entries(formattedClassesVerifiedData)"
						:key="index"
					>
						<td>{{ row[0] }}</td>
						<td>{{ row[1] }}</td>
					</tr>
				</table>
			</div>
		</section>
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
		<base-modal :active.sync="submitted.ok" :background-click-disabled="true">
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
import errorHandling from "@mixins/ldapErrorHandling";
import BaseButton from "@/components/base/BaseButton.vue";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";

export default {
	components: { BaseButton, ModalBodyInfo, ModalFooterConfirm },
	mixins: [errorHandling],
	meta: {
		requiredPermissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
	},
	computed: {
		...mapState("ldap-config", {
			verified: "verified",
			temp: "temp",
			submitted: "submitted",
		}),
		formattedUserVerifiedData() {
			const data = {};
			const { sample } = this.verified.users;
			Object.keys(sample).forEach((key) => {
				switch (key) {
					case "email":
						data[this.$t("pages.administration.ldap.activate.email")] =
							sample.email;
						break;
					case "firstName":
						data[this.$t("pages.administration.ldap.activate.firstName")] =
							sample.firstName;
						break;
					case "lastName":
						data[this.$t("pages.administration.ldap.activate.lastName")] =
							sample.lastName;
						break;
					case "ldapDn":
						data[this.$t("pages.administration.ldap.activate.dN")] =
							sample.ldapDn;
						break;
					case "ldapUID":
						data[this.$t("pages.administration.ldap.activate.uuid")] =
							sample.ldapUID;
						break;
					case "ldapUUID":
						data[this.$t("pages.administration.ldap.activate.uid")] =
							sample.ldapUUID;
						break;
					case "roles":
						data[this.$t("pages.administration.ldap.activate.roles")] =
							sample.roles[0];
					default:
						break;
				}
			});
			return data;
		},
		formattedClassesVerifiedData() {
			const data = {};
			const { sample } = this.verified.classes;
			Object.keys(sample).forEach((key) => {
				switch (key) {
					case "className":
						data[this.$t("pages.administration.ldap.activate.className")] =
							sample.className;
						break;
					case "ldapDn":
						data[this.$t("pages.administration.ldap.activate.dN")] =
							sample.ldapDn;
						break;
					default:
						break;
				}
			});
			return data;
		},
	},
	created() {
		if (!Object.keys(this.verified).length) {
			this.$router.push("/administration/ldap/config");
		}
	},
	methods: {
		backButtonHandler() {
			this.$router.push("/administration/ldap/config");
		},
		async submitButtonHandler() {
			await this.$store.dispatch("ldap-config/submitData", this.temp);
			if (!this.submitted.ok) {
				this.errorHandler(this.submitted.errors).forEach((message) => {
					this.$toast.error(message);
				});
				this.$router.push({
					path: `/administration/ldap/config`,
				});
				return;
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
	margin-top: var(--space-xl-4);
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
</style>
