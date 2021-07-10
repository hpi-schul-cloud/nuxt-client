<template>
	<section>
		<h2 class="text-h4">Authentifizierung</h2>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">Alias</th>
						<th class="text-left">Typ</th>
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
			:is-open="confirmDeleteDialog.isOpen"
			:size="350"
			:submit="() => removeSystem(confirmDeleteDialog.systemId)"
			@dialog-closed="confirmDeleteDialog.isOpen = false"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{
					$t("pages.administration.school.index.authSystems.deleteAuthSystem")
				}}
			</h2>
			<template slot="dialogContent">
				<p class="body-1 mt-2">
					{{
						$t(
							"pages.administration.school.index.authSystems.confirmDeleteText"
						)
					}}
				</p>
			</template>
		</v-custom-dialog>
		{{ console.log("systems", systems) }}
	</section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import vCustomDialog from "@components/organisms/vCustomDialog";

export default {
  components: {
    vCustomDialog,
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
		...mapGetters("schools", {
			school: "getSchool",
		}),
		...mapGetters("systems", {
			systems: "getSystems",
		}),
		hasLdapSystem() {
			return this.systems.some((system) => system.type === "ldap");
		},
		console: () => console,
	},
	created() {
		this.fetchSchoolSystems(this.school.systems);
	},
	methods: {
		...mapActions("systems", ["fetchSchoolSystems", "deleteSystem"]),
    ...mapActions("schools", ["update"]),
		isEditable(system) {
			return system.type === "ldap";
		},
    openConfirmDeleteDialog(systemId) {
      this.confirmDeleteDialog = {
        isOpen: true,
        systemId
      }
    },
    removeSystem(systemId) {
      // remove system in systems collection
      this.deleteSystem(systemId)

      // remove system from school
      const updatedSystemsList = this.school.systems.filter(
				(system) => system._id !== systemId
			);
			this.update({
				id: this.school.id,
				systems: updatedSystemsList,
			})
      this.confirmDeleteDialog.isOpen = false
      // TODO show error
    }
	},
};
</script>
