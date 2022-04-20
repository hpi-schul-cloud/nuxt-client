<template>
	<section>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.administration.school.index.authSystems.title") }}
		</h2>
		<v-text-field
			v-if="customLoginLinkEnabled"
			id="school-login-link"
			:value="customLoginLink"
			class="school-login-link"
			:label="
				$t('pages.administration.school.index.authSystems.loginLinkLabel')
			"
			:color="copiedStatus ? 'success' : 'primary'"
			readonly
			dense
			:append-icon="copiedStatus ? iconMdiCheckCircle : iconMdiContentCopy"
			@click:append="copyLoginLink"
			@blur="linkCopyFinished"
		></v-text-field>
		<v-simple-table class="table-system">
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							{{ $t("pages.administration.school.index.authSystems.alias") }}
						</th>
						<th class="text-left">
							{{ $t("pages.administration.school.index.authSystems.type") }}
						</th>
						<th class="text-left"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="system in systems" :key="system._id">
						<td>{{ system.alias }}</td>
						<td>{{ system.type }}</td>
						<td>
							<v-btn
								v-if="isEditable(system)"
								class="edit-system-btn"
								icon
								:to="`/administration/ldap/config?id=${system._id}`"
								nuxt
							>
								<v-icon>{{ iconMdiPencilOutline }}</v-icon>
							</v-btn>
							<v-btn
								v-if="isRemovable(system)"
								class="delete-system-btn"
								icon
								@click.stop="openConfirmDeleteDialog(system._id)"
							>
								<v-icon>{{ iconMdiTrashCanOutline }}</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-btn
			color="primary"
			class="my-8 add-ldap"
			depressed
			to="/administration/ldap/config"
			nuxt
			>{{ $t("pages.administration.school.index.authSystems.addLdap") }}</v-btn
		>
		<v-custom-dialog
			v-model="confirmDeleteDialog.isOpen"
			class="custom-dialog"
			:size="375"
			has-buttons
			@dialog-confirmed="removeSystem(confirmDeleteDialog.systemId)"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{
					$t("pages.administration.school.index.authSystems.deleteAuthSystem")
				}}
			</h2>
			<template slot="content">
				<p class="text-md mt-2">
					{{
						$t(
							"pages.administration.school.index.authSystems.confirmDeleteText"
						)
					}}
				</p>
			</template>
		</v-custom-dialog>
	</section>
</template>

<script>
import SchoolsModule from "@/store/schools";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import vCustomDialog from "@components/organisms/vCustomDialog";
import { mdiContentCopy, mdiCheckCircle } from "@mdi/js";
import EnvConfigModule from "@/store/env-config";

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
			copiedStatus: false,
		};
	},
	computed: {
		hasLdapSystem() {
			return this.systems.some((system) => system.type === "ldap");
		},
		customLoginLinkEnabled: () => EnvConfigModule.getLoginLinkEnabled,
		customLoginLink() {
			let type = "";
			let schoolId = "";
			if (this.systems.some((system) => system.oauthConfig))
				type = "strategy=iserv";
			else if (this.systems.length === 0) type = "strategy=email";
			else if (this.systems.some((system) => system.type === "ldap")) {
				type = "strategy=ldap";
				schoolId = `&schoolId=${SchoolsModule.getSchool.id}`;
			}
			return `${window.location.origin}/login?${type}${schoolId}`;
		},
	},
	methods: {
		// TODO - Discuss which systems are still gonna be editable in the future
		isEditable(system) {
			return system.type === "ldap" && system.ldapConfig.provider === "general";
		},
		isRemovable(system) {
			return system.type !== "ldap" || system.ldapConfig.provider === "general";
		},
		// TODO - Discuss which systems are deletable by the user in the future
		openConfirmDeleteDialog(systemId) {
			this.confirmDeleteDialog = {
				isOpen: true,
				systemId,
			};
		},
		removeSystem(systemId) {
			SchoolsModule.deleteSystem(systemId);
			// TODO show error
		},
		copyLoginLink() {
			const copyText = document.getElementById("school-login-link");

			copyText.select();
			copyText.setSelectionRange(0, 99999); // For mobile devices

			navigator.clipboard.writeText(copyText.value);

			this.copiedStatus = true;
		},
		linkCopyFinished() {
			this.copiedStatus = false;
		},
	},
};
</script>
