<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="import-dialog"
		:size="480"
		has-buttons
		:buttons="['cancel', 'confirm']"
		confirm-btn-title-key="common.actions.import"
		@dialog-confirmed="onConfirmed"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2">
			Kurs importieren
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
							Teilnehmer:innen bezogene Daten werden nicht kopiert. Der Kurs
							kann im Folgenden umbenannt werden.
						</div>
					</div>
					<v-text-field
						v-model="parentNameModel"
						label="Kurs name"
					></v-text-field>
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, inject } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportModal",
	components: {
		vCustomDialog,
	},
	inject: ["i18n", "notifierModule"],
	emits: ["import"],
	props: {
		isOpen: { type: Boolean },
		parentName: { type: String, default: () => '' }
	},
	setup(props, { emit }) {
		// const i18n = inject("i18n");

		// const t = (key) => {
		// 	const translateResult = i18n?.t(key);
		// 	if (typeof translateResult === "string") {
		// 		return translateResult;
		// 	}
		// 	return "unknown translation-key:" + key;
		// };

		const shareCourseModule = inject("shareCourseModule");

		const onCloseDialog = () => {
			shareCourseModule.resetImportFlow();
		};

		const parentNameModel = computed({
			get: () => props.parentName,
			set: () => {}
		});

		const onConfirmed = () => {
			emit('import');
		}

		return {
			onCloseDialog,
			onConfirmed,
			parentNameModel,
			mdiInformation,
		};
	},
});
</script>
