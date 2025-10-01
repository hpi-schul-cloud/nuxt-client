<template>
	<div>
		<v-text-field
			v-if="customLoginLinkEnabled && !hasSystems"
			id="school-login-link-0"
			:model-value="generateLoginLink()"
			class="school-login-link"
			:color="getCopyStatus(0) ? 'success' : 'primary'"
			:label="$t('pages.administration.school.index.authSystems.loginLinkLabel')"
			readonly
			density="compact"
			@blur="linkCopyFinished(0)"
		>
			<template #append>
				<v-btn icon variant="text" :aria-label="$t('common.actions.shareLink')" @click="copyLoginLink(0)">
					<v-icon>
						{{ getCopyStatus(0) ? iconMdiCheckCircle : iconMdiContentCopy }}
					</v-icon>
				</v-btn>
			</template>
		</v-text-field>
		<v-table v-if="hasSystems" class="table-system" data-testid="system-table">
			<template #default>
				<thead>
					<tr>
						<th class="text-left">
							{{ $t("pages.administration.school.index.authSystems.alias") }}
						</th>
						<th class="text-left">
							{{ $t("pages.administration.school.index.authSystems.type") }}
						</th>
						<th v-if="customLoginLinkEnabled" class="text-left">
							{{ $t("pages.administration.school.index.authSystems.loginLinkLabel") }}
						</th>
						<th class="text-left" />
					</tr>
				</thead>
				<tbody>
					<tr v-for="system in systems" :key="system.id">
						<td data-testid="system-table-alias">{{ system.alias }}</td>
						<td data-testid="system-table-type">{{ system.type }}</td>
						<td v-if="customLoginLinkEnabled">
							<v-text-field
								v-if="isLoginSystem(system)"
								:id="`school-login-link-${system.id}`"
								data-testid="system-table-login-link"
								:model-value="generateLoginLink(system)"
								class="school-login-link"
								:color="getCopyStatus(system.id) ? 'success' : 'primary'"
								readonly
								@blur="linkCopyFinished"
							>
								<template #append>
									<v-btn
										icon
										variant="text"
										:aria-label="$t('common.actions.shareLink')"
										@click="copyLoginLink(system.id)"
									>
										<v-icon>{{ getCopyStatus(system.id) ? iconMdiCheckCircle : iconMdiContentCopy }} </v-icon>
									</v-btn>
								</template>
							</v-text-field>
						</td>
						<td>
							<v-btn
								v-if="isEditable(system) && hasSystemEditPermission"
								class="edit-system-btn"
								icon
								variant="text"
								data-testid="system-table-button-edit"
								:to="redirectTo(system)"
								:aria-label="ariaLabels(system).edit"
							>
								<v-icon>{{ iconMdiPencilOutline }}</v-icon>
							</v-btn>
							<v-btn
								v-if="isRemovable(system) && hasSystemCreatePermission"
								class="delete-system-btn"
								icon
								variant="text"
								data-testid="system-table-button-delete"
								:aria-label="ariaLabels(system).delete"
								@click.stop="openConfirmDeleteDialog(system.id)"
							>
								<v-icon>{{ iconMdiTrashCanOutline }}</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-table>
		<v-btn
			v-if="hasSystemCreatePermission"
			color="primary"
			class="mt-8 mb-4 add-ldap float-right"
			variant="flat"
			to="/administration/ldap/config"
		>
			{{ $t("pages.administration.school.index.authSystems.addLdap") }}
		</v-btn>
		<v-custom-dialog
			v-model:is-open="confirmDeleteDialog.isOpen"
			class="custom-dialog"
			:size="375"
			has-buttons
			@dialog-confirmed="removeSystem(confirmDeleteDialog.systemId)"
		>
			<template #title>
				<h2 class="my-2">
					{{ $t("pages.administration.school.index.authSystems.deleteAuthSystem") }}
				</h2>
			</template>
			<template #content>
				<p class="text-md mt-2">
					{{ $t("pages.administration.school.index.authSystems.confirmDeleteText") }}
				</p>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog";
import { authModule, schoolsModule } from "@/store";
import { useEnvConfig } from "@data-env";
import { mdiCheckCircle, mdiContentCopy, mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";

export default {
	components: {
		vCustomDialog,
	},
	props: {
		systems: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			confirmDeleteDialog: {
				isOpen: false,
				systemId: undefined,
			},
			iconMdiPencilOutline: mdiPencilOutline,
			iconMdiTrashCanOutline: mdiTrashCanOutline,
			iconMdiContentCopy: mdiContentCopy,
			iconMdiCheckCircle: mdiCheckCircle,
			copiedElement: "",
		};
	},
	computed: {
		hasSystems() {
			return this.systems.length > 0;
		},
		customLoginLinkEnabled: () => useEnvConfig().value.FEATURE_LOGIN_LINK_ENABLED,
		hasSystemCreatePermission: () => authModule.getUserPermissions.includes("system_create"),
		hasSystemEditPermission: () => authModule.getUserPermissions.includes("system_edit"),
	},
	methods: {
		ariaLabels(system) {
			const systemName = system.alias || this.$t("pages.administration.school.index.authSystems.title");

			return {
				edit: this.$t("pages.administration.school.index.authSystems.edit", {
					system: systemName,
				}),
				delete: this.$t("pages.administration.school.index.authSystems.delete", { system: systemName }),
			};
		},
		isEditable(system) {
			return system.ldapConfig?.provider === "general" || system.alias === "moin.schule";
		},
		isRemovable(system) {
			return system.ldapConfig?.provider === "general";
		},
		redirectTo(system) {
			if (system.alias === "moin.schule") {
				return `/administration/school-settings/provisioning-options?systemId=${system.id}`;
			}
			return `/administration/ldap/config?id=${system.id}`;
		},
		openConfirmDeleteDialog(systemId) {
			this.confirmDeleteDialog = {
				isOpen: true,
				systemId,
			};
		},
		isLoginSystem(system) {
			return system.oauthConfig || system.ldapConfig;
		},
		removeSystem(systemId) {
			schoolsModule.deleteSystem(systemId);
			// TODO show error
		},
		generateLoginLink(system) {
			let params = "";

			if (!system) {
				params = "?strategy=email";
			} else if (system.oauthConfig) {
				params = `?strategy=${system.oauthConfig.provider}`;
			} else if (system.ldapConfig) {
				params = `?strategy=ldap&schoolId=${schoolsModule.getSchool.id}`;
			}

			return `${window.location.origin}/login${params}`;
		},
		copyLoginLink(id) {
			const copyText = document.getElementById(`school-login-link-${id}`);

			copyText.select();
			copyText.setSelectionRange(0, 99999); // For mobile devices

			navigator.clipboard.writeText(copyText.value);

			this.copiedElement = id;
		},
		getCopyStatus(id) {
			return this.copiedElement === id;
		},
		linkCopyFinished() {
			this.copiedElement = "";
		},
	},
};
</script>

<style scoped lang="scss">
.school-login-link {
	align-items: center;
}
</style>
