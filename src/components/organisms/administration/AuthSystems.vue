<template>
	<section>
		<h2 class="text-h4">
			{{ $t("pages.administration.school.index.authSystems.title") }}
		</h2>
		<v-simple-table>
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
								icon
								:to="`/administration/ldap/config?id=${system._id}`"
								nuxt
							>
								<v-icon>{{ iconMdiPencilOutline }}</v-icon>
							</v-btn>
							<v-btn icon @click.stop="openConfirmDeleteDialog(system._id)">
								<v-icon>{{ iconMdiTrashCanOutline }}</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-btn
			color="primary"
			class="my-8"
			depressed
			to="/administration/ldap/config"
			nuxt
			>{{ $t("pages.administration.school.index.authSystems.addLdap") }}</v-btn
		>
		<v-custom-dialog
			v-model="confirmDeleteDialog.isOpen"
			:size="375"
			@dialog-confirmed="() => removeSystem(confirmDeleteDialog.systemId)"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{
					$t("pages.administration.school.index.authSystems.deleteAuthSystem")
				}}
			</h2>
			<template slot="content">
				<p class="body-1 mt-2">
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
import { mapActions } from "vuex";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import vCustomDialog from "@components/organisms/vCustomDialog";

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
		};
	},
	computed: {
		hasLdapSystem() {
			return this.systems.some((system) => system.type === "ldap");
		},
	},
	methods: {
		...mapActions("schools", ["deleteSystem"]),
		// TODO - Discuss which systems are still gonna be editable in the future
		isEditable(system) {
			return system.type === "ldap";
		},
		// TODO - Discuss which systems are deletable by the user in the future
		openConfirmDeleteDialog(systemId) {
			this.confirmDeleteDialog = {
				isOpen: true,
				systemId,
			};
		},
		removeSystem(systemId) {
			this.deleteSystem(systemId);
			this.confirmDeleteDialog.isOpen = false;
			// TODO show error
		},
	},
};
</script>
