<template>
	<default-wireframe
		:headline="t('pages.tool.context.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<RenderHTML :html="t('pages.tool.context.description')" component="p" />
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
				<external-tool-selection-row
					:item="item"
					max-height="20"
					max-width="20"
				/>
			</template>
			<template #item="{ item }">
				<external-tool-selection-row :item="item" />
			</template>
		</v-select>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert
			v-if="apiError && apiError.message"
			light
			prominent
			text
			type="error"
			data-testId="context-tool-error"
		>
			{{ t(getBusinessErrorTranslationKey(apiError)) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				color="secondary"
				outlined
				@click="onCancel"
				data-testId="cancel-button"
			>
				{{ t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				class="mr-2"
				color="primary"
				depressed
				:disabled="!canSave"
				@click="onSaveTool"
				data-testId="save-button"
			>
				{{ t("pages.tool.addBtn.label") }}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import VueRouter from "vue-router";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	PropType,
	ref,
	Ref,
} from "vue";
import { BusinessError } from "@/store/types/commons";
import {
	ContextExternalToolTemplateListItem,
	ToolConfigurationTemplate,
} from "@/store/external-tool";
import { useRouter } from "vue-router/composables";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ExternalToolsModule from "@/store/external-tools";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import RoomsModule from "@/store/rooms";
import ExternalToolSelectionRow from "../administration/external-tool/ExternalToolSelectionRow.vue";
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import ContextExternalToolsModule from "@/store/context-external-tools";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	injectStrict,
} from "@/utils/inject";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ContextExternalToolConfiguration",
	components: {
		DefaultWireframe,
		ExternalToolSelectionRow,
		RenderHTML,
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
		const i18n = injectStrict(I18N_KEY);
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const roomsModule: RoomsModule | undefined = inject("roomsModule");

		onMounted(async () => {
			await externalToolsModule.loadAvailableToolConfigurationsForContext({
				contextId: props.contextId,
				contextType: props.contextType,
			});
			await roomsModule?.fetch();

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

		const courseTitle: ComputedRef<string | undefined> = computed(
			() =>
				roomsModule?.getRoomsData.find(
					(element) => element.id === props.contextId
				)?.title
		);

		const contextRoute = `/rooms/${props.contextId}`;

		const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
			const crumbs: Breadcrumb[] = [
				{
					text: t("common.words.courses"),
					to: "/rooms-overview/",
				},
			];

			if (courseTitle.value) {
				crumbs.push({
					text: courseTitle.value,
					to: contextRoute,
				});
			}

			return crumbs;
		});

		const { getBusinessErrorTranslationKey } = useExternalToolMappings();

		const hasData: Ref<boolean> = ref(false);
		const loading: ComputedRef<boolean | undefined> = computed(
			() =>
				!hasData.value ||
				externalToolsModule.getLoading ||
				contextExternalToolsModule.getLoading
		);

		const configurationItems: ComputedRef<
			ContextExternalToolTemplateListItem[] | undefined
		> = computed(() => externalToolsModule.getContextExternalToolTemplates);

		const selectedItem: Ref<ContextExternalToolTemplateListItem | undefined> =
			ref();

		// TODO N21-904 use ContextExternalToolTemplate as a type for the list and the selected template, so we don't have to load another template
		const toolTemplate: Ref<ToolConfigurationTemplate | undefined> = ref();

		const canSave: ComputedRef<boolean> = computed(
			() => !!toolTemplate.value && !!selectedItem.value
		);

		const apiError: ComputedRef<BusinessError | undefined> = computed(
			() => contextExternalToolsModule.getBusinessError
		);

		const onSelectTemplate = async (
			selectedTool: ContextExternalToolTemplateListItem
		) => {
			toolTemplate.value =
				await externalToolsModule.loadContextToolConfigurationTemplateFromExternalTool(
					{
						toolId: selectedTool.id,
						contextType: props.contextType,
						contextId: props.contextId,
					}
				);
		};

		const router: VueRouter = useRouter();
		const onCancel = async () => {
			await router.push({ path: contextRoute, query: { tab: "tools" } });
		};

		const onSaveTool = async () => {
			if (
				toolTemplate.value &&
				selectedItem.value &&
				props.contextId &&
				props.contextType
			) {
				await contextExternalToolsModule.createContextExternalTool({
					toolTemplate: toolTemplate.value,
					schoolToolId: selectedItem.value.schoolToolId,
					contextId: props.contextId,
					contextType: props.contextType,
				});
			}

			if (!externalToolsModule.getBusinessError.message) {
				await router.push({ path: contextRoute, query: { tab: "tools" } });
			}
		};

		return {
			t,
			courseTitle,
			breadcrumbs,
			getBusinessErrorTranslationKey,
			loading,
			configurationItems,
			selectedItem,
			toolTemplate,
			apiError,
			canSave,
			onSelectTemplate,
			onCancel,
			onSaveTool,
		};
	},
});
</script>
