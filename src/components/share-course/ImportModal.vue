<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="import-dialog"
		:size="480"
		has-buttons
		:buttons="['cancel', 'confirm']"
		confirm-btn-title-key="common.actions.import"
		@dialog-confirmed="onConfirm"
		@dialog-canceled="onCancel"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2">
			{{ $t("components.molecules.importCourse.options.title") }}
		</div>

		<template slot="content">
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div>
					<div
						class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
					>
						<div class="mx-2">
							<v-icon class="blue--text text--darken-1">{{
								mdiInformation
							}}</v-icon>
						</div>
						<div>
							{{ $t("components.molecules.importCourse.options.infoText") }}
						</div>
					</div>
					<v-text-field v-model="courseName" label="Kurs name"></v-text-field>
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation } from "@mdi/js";
import { defineComponent, ref, watch } from "@vue/composition-api";
import { XmlEntities } from "html-entities";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportModal",
	components: {
		vCustomDialog,
	},
	inject: ["i18n"],
	emits: ["import", "cancel"],
	props: {
		isOpen: { type: Boolean },
		parentName: { type: String, default: () => '' }
	},
	setup(props, { emit }) {
		const courseName = ref("");
		watch(() => props.parentName, (newValue) => {
			const entities = new XmlEntities();
			courseName.value = entities.decode(newValue);
		});

		const onConfirm = () => emit('import', courseName.value);
		const onCancel = () => emit('cancel')

		return {
			onConfirm,
			onCancel,
			courseName,
			mdiInformation,
		};
	},
});
</script>
