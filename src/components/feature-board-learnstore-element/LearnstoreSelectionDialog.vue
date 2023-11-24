<template>
	<v-custom-dialog :is-open="isOpen" @dialog-canceled="onCancel">
		<h2 slot="title" class="text-h4 my-2">LernStore</h2>
		<template #content>
			<router-view />
		</template>
	</v-custom-dialog>
</template>

<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { BusinessError } from "@/store/types/commons";
import { useBoardNotifier } from "@util-board";
import { computed, ComputedRef, defineComponent, ref, Ref, watch } from "vue";
import VCustomDialog from "../organisms/vCustomDialog.vue";
import { useLearnstoreElementDisplayState } from "@feature-board-learnstore-element";
import ContentModule from "@/store/content";
import { injectStrict, LEARNSTORE_MODULE_KEY } from "@/utils/inject";

export default defineComponent({
	emits: ["close", "save"],
	components: { VCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		materialId: {
			type: String,
			required: false,
		},
	},
	setup(props, { emit }) {
		const learnstoreModule: ContentModule = injectStrict(LEARNSTORE_MODULE_KEY);
		const { t } = useI18n();
		const { showSuccess } = useBoardNotifier();

		const hasData: Ref<boolean> = ref(false);

		const { isLoading, error, fetchContent } =
			useLearnstoreElementDisplayState(learnstoreModule);

		const apiError: ComputedRef<BusinessError | undefined> = computed(
			() => error.value
		);

		const closeDialog = () => {
			hasData.value = false;

			emit("close");
		};

		const onCancel = () => {
			closeDialog();
		};

		const onSave = async () => {
			// TODO: trigger save
			const saved = true;

			if (saved) {
				emit("save", saved);
			}

			if (!apiError.value) {
				const message = props.materialId ? "Updated" : "Created";

				showSuccess(message);

				closeDialog();
			}
		};

		watch(
			() => props.isOpen,
			async (value, oldValue) => {
				if (value && !oldValue) {
					await onOpen();
				}
			}
		);

		const onOpen = async () => {
			if (props.materialId) {
				await fetchContent(props.materialId);
			}

			hasData.value = true;
		};

		return {
			t,
			isLoading,
			apiError,
			onSave,
			onCancel,
		};
	},
});
</script>
