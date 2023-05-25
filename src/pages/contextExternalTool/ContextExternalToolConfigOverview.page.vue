<template>
	<default-wireframe
		:headline="$t('pages.tool.context.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<p v-html="$t('pages.tool.context.description')"></p>
		<v-spacer class="mt-10"></v-spacer>
		<v-select
			:label="$t('pages.tool.select.label')"
			item-title="name"
			item-value="id"
			:items="configurationItems"
			v-model="selectedItem"
			:no-data-text="$t('common.nodata')"
			return-object
			:loading="loading"
			@change="onSelectTemplate"
			data-testId="configuration-select"
		>
			<template #selection="{ item }">
				<context-external-tool-selection-row
					:item="item"
					max-height="20"
					max-width="20"
				/>
			</template>
			<template #item="{ item }">
				<context-external-tool-selection-row :item="item" />
			</template>
		</v-select>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert v-if="apiError.message" light prominent text type="error">
			{{ $t(getTranslationKey(apiError)) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				color="secondary"
				outlined
				@click="onCancel"
				data-testId="cancel-button"
			>
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				class="mr-2"
				color="primary"
				depressed
				:disabled="!hasToolTemplate"
				@click="onSaveTool"
				data-testId="save-button"
			>
				{{ $t("pages.tool.addBtn.label") }}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	inject,
	PropType,
	ref,
	Ref,
} from "vue";
import { BusinessError } from "@/store/types/commons";
import {
	ToolConfigurationListItem,
	ToolConfigurationTemplate,
} from "@/store/external-tool";
import { useRouter } from "vue-router/composables";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import ContextExternalToolSelectionRow from "./ContextExternalToolSelectionRow.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ExternalToolsModule from "@/store/external-tools";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import RoomsModule from "../../store/rooms";
import { CourseMetadataResponse } from "../../serverApi/v3";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ContextExternalToolConfigOverview",
	components: {
		DefaultWireframe,
		ContextExternalToolSelectionRow,
	},
	props: {
		contextId: {
			type: String,
			required: true,
		},
		contextType: {
			type: String as PropType<ToolContextType>,
			required: true,
		},
	},

	setup(props) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		const roomsModule: RoomsModule | undefined =
			inject<RoomsModule>("roomsModule");

		onMounted(async () => {
			await externalToolsModule?.loadAvailableSchoolToolConfigurations(
				props.contextId
			);

			await roomsModule?.fetchAllElements();

			hasData.value = true;
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		/*const allElements: CourseMetadataResponse[] | undefined =
			roomsModule?.getAllElements;

		if (allElements) {
			const title = allElements[0].title;
		}*/

		const contextRoute: Breadcrumb = {
			text: "Mathe", //roomsModule?.allElements[0].title as string, //TODO load data from store reactively
			to: `/rooms/${props.contextId}`,
		};
		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.courses.index.title"),
				to: "/rooms-overview/",
			},
			contextRoute,
			{
				text: t("pages.tool.context.title"),
				disabled: true,
			},
		];

		const { getTranslationKey } = useExternalToolMappings();

		const hasData: Ref<boolean> = ref(false);
		const loading: ComputedRef<boolean | undefined> = computed(
			() => !hasData.value || externalToolsModule?.getLoading
		);

		const configurationItems: ComputedRef<
			ToolConfigurationListItem[] | undefined
		> = computed(() => externalToolsModule?.getToolConfigurations);

		const selectedItem: Ref<ToolConfigurationListItem | undefined> = ref();

		const toolTemplate: Ref<ToolConfigurationTemplate | undefined> = ref();
		const hasToolTemplate: Ref<boolean> = ref(false);

		const apiError: ComputedRef<BusinessError | undefined> = computed(
			() => externalToolsModule?.getBusinessError
		);

		const onSelectTemplate = async (
			selectedTool: ToolConfigurationListItem
		) => {
			toolTemplate.value =
				await externalToolsModule?.loadToolConfigurationTemplateFromSchoolExternalTool(
					selectedTool.id
				);

			hasToolTemplate.value = true;
		};

		const router: VueRouter = useRouter();
		const onCancel = async () => {
			await router.push({ path: contextRoute.to });
		};

		const onSaveTool = async () => {
			if (toolTemplate.value && props.contextId && props.contextType) {
				await externalToolsModule?.createContextExternalTool({
					toolTemplate: toolTemplate.value,
					contextId: props.contextId,
					contextType: props.contextType,
				});
			}

			if (!externalToolsModule?.getBusinessError.message) {
				await router.push({ path: contextRoute.to });
			}
		};

		return {
			t,
			breadcrumbs,
			getTranslationKey,
			loading,
			configurationItems,
			selectedItem,
			toolTemplate,
			apiError,
			hasToolTemplate,
			onSelectTemplate,
			onCancel,
			onSaveTool,
		};
	},
});
</script>
