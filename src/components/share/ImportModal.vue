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
			{{ $t(`components.molecules.import.${parentType}.options.title`) }}
		</div>

		<template slot="content">
			<div>
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon color="info">{{ mdiInformation }}</v-icon>
					</div>
					<RenderHTML
						data-testid="import-modal-external-tools-info"
						v-if="ctlToolsEnabled && parentType === 'courses'"
						:html="
							$t(
								`components.molecules.import.${parentType}.options.ctlTools.infoText`
							)
						"
					/>
					<div v-else data-testid="import-modal-coursefiles-info">
						{{
							$t(`components.molecules.import.${parentType}.options.infoText`)
						}}
					</div>
				</div>
				<v-text-field
					ref="nameInputText"
					v-model="newName"
					:label="$t(`components.molecules.import.${parentType}.label`)"
					:rules="[rules.required]"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, reactive, ref } from "vue";
import { RenderHTML } from "@feature-render-html";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportModal",
	components: {
		RenderHTML,
		vCustomDialog,
	},
	emits: ["import", "cancel"],
	props: {
		isOpen: { type: Boolean },
		parentName: { type: String, required: true },
		parentType: { type: String, required: true },
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const nameInput = ref(undefined);

		const rules = reactive({
			required: (value) => !!value || i18n.t("common.validation.required"),
		});

		const newName = computed({
			get: () => nameInput.value ?? props.parentName,
			set: (value) => (nameInput.value = value),
		});

		const onConfirm = () => {
			if (rules.required(newName.value) === true) {
				emit("import", newName.value);
			}
		};
		const onCancel = () => emit("cancel");

		const ctlToolsEnabled = computed(() => {
			return envConfigModule.getCtlToolsTabEnabled;
		});

		return {
			onConfirm,
			onCancel,
			mdiInformation,
			rules,
			newName,
			ctlToolsEnabled,
		};
	},
});
</script>
