<template>
	<v-card
		v-show="isEditMode"
		class="mb-4"
		data-testid="board-learnstore-element"
		dense
		elevation="0"
		outlined
		ref="learnstoreElement"
		:ripple="false"
		tabindex="0"
		:loading="isLoading"
		@keydown.up.down="onKeydownArrow"
		@click="onClickElement"
	>
		<div class="card-container d-flex gap-8 grey lighten-4">
			<div
				v-if="resource && resource.preview.data"
				class="logo-container my-auto mr-1"
			>
				<v-img
					height="100%"
					class="mx-auto"
					:src="resource.preview.data"
					contain
				/>
			</div>
			<v-icon v-else>{{ mdiPuzzleOutline }}</v-icon>
			<span class="align-self-center title flex-1 break-word">
				{{
					isLinked
						? title
						: t("feature-board-learnstore-element.placeholder.select")
				}}
			</span>
		</div>
		<!-- <lernstore-detail-view
      :v-if="isLearnstoreOpen && resource"
      :resource="resource"
    /> -->
	</v-card>
</template>

<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { LearnstoreElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { mdiPuzzleOutline } from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	Ref,
	ref,
	toRef,
	watch,
} from "vue";
import { injectStrict, LEARNSTORE_MODULE_KEY } from "@/utils/inject";
import { useLearnstoreElementDisplayState } from "@feature-board-learnstore-element";
import ContentModule from "@/store/content";
import { Resource } from "@/store/types/content";
import LernstoreDetailView from "@/components/lern-store/LernstoreDetailView.vue";

export default defineComponent({
	components: { LernstoreDetailView },
	props: {
		element: {
			type: Object as PropType<LearnstoreElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const { modelValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});
		const learnstoreModule: ContentModule = injectStrict(LEARNSTORE_MODULE_KEY);
		const {
			resource,
			isLoading: isDisplayDataLoading,
			error,
			fetchContent,
		} = useLearnstoreElementDisplayState(learnstoreModule);

		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<LearnstoreElementResponse> = toRef(props, "element");
		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

		const { lastCreatedElementId, resetLastCreatedElementId } =
			useSharedLastCreatedElement();

		watch(lastCreatedElementId, (newValue) => {
			if (newValue !== undefined && newValue === props.element.id) {
				isLearnstoreOpen.value = true;
				resetLastCreatedElementId();
			}
		});

		const isLinked: ComputedRef<boolean> = computed(
			() => !!modelValue.value.someId
		);

		const title: ComputedRef<string> = computed(
			() => resource.value?.name ?? "..."
		);

		const isLoading = computed(
			() => isLinked.value && !resource.value && isDisplayDataLoading.value
		);

		const isLearnstoreOpen: Ref<boolean> = ref(false);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveElementDown = () => {
			emit("move-down:edit");
		};

		const onMoveElementUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = () => emit("delete:element", element.value.id);

		const onEditElement = () => {
			isLearnstoreOpen.value = true;
		};

		const onClickElement = () => {
			// TODO: do something
			if (!isLinked.value && props.isEditMode) {
				isLearnstoreOpen.value = true;
			}
		};

		const onLearnstoreClose = () => {
			isLearnstoreOpen.value = false;
		};

		const onLearnstoreAdd = async (resource: Resource) => {
			modelValue.value.someId = resource.ref.id;

			await loadCardData();
		};

		const loadCardData = async () => {
			if (modelValue.value.someId) {
				await fetchContent(modelValue.value.someId);
			}
		};

		onMounted(loadCardData);

		return {
			t,
			isLinked,
			title,
			resource,
			error,
			isLoading,
			isLearnstoreOpen,
			mdiPuzzleOutline,
			onMoveElementDown,
			onMoveElementUp,
			onKeydownArrow,
			onDeleteElement,
			onEditElement,
			onClickElement,
			onLearnstoreClose,
			onLearnstoreAdd,
		};
	},
});
</script>

<style scoped lang="scss">
$card-padding: 16px;
$logo-size: 24px;

.card-container {
	max-width: 100%;
	min-height: calc($card-padding * 2 + $logo-size);
	padding: $card-padding;
}

.logo-container {
	width: $logo-size;
	height: $logo-size;
}

.gap-8 {
	gap: 8px;
}

.flex-1 {
	flex: 1;
}

.break-word {
	word-break: break-word;
}
</style>
