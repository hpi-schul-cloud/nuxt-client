<template>
	<v-custom-dialog
		ref="dialog"
		:is-open="isOpen"
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
				<v-text-field
					ref="textField"
					:value="parentName"
					:label="$t('common.labels.course')"
					:rules="[rules.required]"
					@input="onInput"
				></v-text-field>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation } from "@mdi/js";
import { defineComponent, inject, reactive, ref } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportModal",
	components: {
		vCustomDialog,
	},
	emits: ["import", "cancel"],
	props: {
		isOpen: { type: Boolean },
		parentName: { type: String, required:true }
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");
		const newName = ref(props.parentName);

		const rules = reactive({
          required: value => !!value || i18n?.t("common.validation.required"),
		});

		const onInput = (value) => newName.value = value;
		const onConfirm = () => {
			if (rules.required(newName.value) === true) {
				emit('import', newName.value);
			}
		}
		const onCancel = () => emit('cancel')

		return {
			onConfirm,
			onCancel,
      		onInput,
			mdiInformation,
			rules
		};
	},
});
</script>
