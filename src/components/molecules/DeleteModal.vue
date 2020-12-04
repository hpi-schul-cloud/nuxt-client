<template>
	<div>
		<base-button @click="showModal = true"> Open Modal </base-button>
		<base-modal :active.sync="showModal" @onBackdropClick="closeModal">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info :title="title" :description="description">
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="report_problem"
							style="color: var(--color-danger)"
						/>
					</template>
				</modal-body-info>
			</template>
			<template v-slot:footerRight>
				<base-button design="text" @click="showModal = false">
					{{ $t("common.actions.cancel") }}
				</base-button>
				<base-button class="delete-btn" @click="confirmDelete">
					<base-icon source="material" icon="delete" />
					{{ $t("common.actions.remove") }}
				</base-button>
			</template>
		</base-modal>
	</div>
</template>

<script>
import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";

import BaseModal from "@basecomponents/BaseModal";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
export default {
	components: {
		BaseModal,
		ModalBodyInfo,
		BaseIcon,
		BaseButton,
	},
	props: {
		title: { type: String, default: "Willst du die Aufgabe wirklich löschen?" },
		description: {
			type: String,
			default: "Der Kursinhalt wird unwiederruflich gelöscht",
		},
	},
	data() {
		return {
			showModal: false,
		};
	},
	methods: {
		closeModal() {
			this.$emit("update:show-modal", false);
			this.showModal = false;
		},
		confirmDelete() {
			this.$emit("close");
			// logic here
			this.closeModal();
		},
	},
};
</script>

<style lang="scss" scoped>
.delete-btn {
	background-color: var(--color-danger) !important;
	&:hover {
		background-color: var(--color-danger-dark) !important;
	}
}
</style>
