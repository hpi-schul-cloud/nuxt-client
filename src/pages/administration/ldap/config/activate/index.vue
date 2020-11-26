<template>
	<section>
		<base-button design="text" @click="backButtonHandler">
			<base-icon source="material" icon="keyboard_arrow_left" />
			{{ $t("common.actions.back") }}
		</base-button>
		<section class="section">
			<h1 class="h4">{{ $t("pages.administration.ldap.save.title") }}</h1>
			<div class="icon-text">
				<div class="icon-text-unit">
					<base-icon source="material" icon="edit" />
					<span>{{ systemData.users.student }}</span>
					<span>{{ $t("common.labels.student") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="edit" />
					<span>{{ systemData.users.teacher }}</span>
					<span>{{ $t("common.labels.teacher.plural") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="edit" />
					<span>{{ systemData.users.admin }}</span>
					<span>{{ $t("common.labels.admin") }}</span>
				</div>
				<div class="icon-text-unit">
					<base-icon source="material" icon="edit" />
					<span>{{ systemData.classes.total }}</span>
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
				<span
					v-for="(row, index) in Object.entries(systemData.users.sample)"
					:key="index"
				>
					<table>
						<tr>
							<td>{{ row[0] }}</td>
							<td>{{ row[0] === "roles" ? row[1][0] : row[1] }}</td>
						</tr>
					</table>
				</span>
			</div>

			<p class="category-title">
				{{ $t("pages.administration.ldap.save.example.class") }}
			</p>
			<div>
				<span
					v-for="(row, index) in Object.entries(systemData.classes.sample)"
					:key="index"
				>
					<table>
						<tr>
							<td>{{ row[0] }}</td>
							<td>{{ row[0] === "roles" ? row[1][0] : row[1] }}</td>
						</tr>
					</table>
				</span>
			</div>
		</section>
		<div class="bottom-buttons">
			<base-button design="text" @click="backButtonHandler">
				<base-icon source="material" icon="keyboard_arrow_left" />
				{{ $t("common.actions.back") }}
			</base-button>
			<base-button design="secondary" @click="submitButtonHandler">{{
				$t("pages.administration.ldap.save.example.synchronize")
			}}</base-button>
		</div>
		<base-modal :active.sync="submitted.ok" :background-click-disabled="true">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					title="Deine Konfiguration ist gespeichert Die Synchronisation kann bis zu einigen Stunden andauern."
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
					text="Ok"
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
	data() {
		return {
			systemData: {
				ok: true,
				users: {
					total: 8,
					admin: 2,
					teacher: 2,
					student: 4,
					sample: {
						email: "alice.daniel@schul-cloud.org",
						firstName: "Alice",
						lastName: "Daniel",
						roles: ["student"],
						ldapDn: "uid=alice.daniel,ou=users,dc=schul-cloud,dc=org",
						ldapUUID: "MTIwMQ==",
						ldapUID: "alice.daniel",
						modifyTimestamp: "20190802121825Z",
					},
				},
				classes: {
					total: 3,
					sample: {
						className: "Klassen",
						ldapDn: "ou=classes,ou=groups,dc=schul-cloud,dc=org",
						modifyTimestamp: "20190712131016Z",
					},
				},
			},
		};
	},
	computed: {
		...mapState("ldap-config", {
			// systemData: "systemVerificationData",
			tempData: "temp",
			submitted: "dataSubmission",
		}),
	},
	created() {
		if (!Object.keys(this.systemData).length) {
			this.$router.push("/administration/ldap/config");
		}
	},
	methods: {
		backButtonHandler() {
			this.$router.push("/administration/ldap/config");
		},
		async submitButtonHandler() {
			await this.$store.dispatch("ldap-config/submitData", this.tempData);
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
	margin: var(--space-xl) 0;
}
.section {
	margin: var(--space-xl-2);
}
.bottom-buttons {
	display: flex;
	justify-content: space-between;
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
	margin: var(--space-xl) 0;
	font-weight: var(--font-weight-bold);
}
</style>
