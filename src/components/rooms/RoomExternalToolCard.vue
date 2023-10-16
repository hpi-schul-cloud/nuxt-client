<template>
	<room-base-card
		:title="tool.name"
		:logo-url="tool.logoUrl"
		:open-in-new-tab="tool.openInNewTab"
		test-id="tool-card"
		@click="handleClick"
	>
		<template #under-title>
			<div v-if="isToolOutdated" class="mt-1">
				<v-chip
					small
					class="py-1"
					color="warning lighten-1"
					text-color="black"
					data-testId="tool-card-status"
				>
					<v-icon small class="mr-1" color="warning">{{ mdiAlert }}</v-icon>
					{{ t("pages.rooms.tools.outdated") }}
				</v-chip>
			</div>
		</template>
		<template #right>
			<div v-if="canEdit" class="ml-1 my-auto">
				<room-dot-menu
					:menu-items="menuItems"
					data-testId="tool-card-menu"
					:aria-label="t('pages.rooms.tools.menu.ariaLabel')"
				/>
			</div>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	ref,
	Ref,
} from "vue";
import RoomDotMenu from "@/components/molecules/RoomDotMenu.vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import {
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { mdiAlert, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import {
	ToolConfigurationStatus,
	ToolLaunchRequest,
} from "@/store/external-tool";
import EnvConfigModule from "@/store/env-config";
import RoomBaseCard from "./RoomBaseCard.vue";
import { useI18n } from "vue-i18n";
import ExternalToolsModule from "@/store/external-tools";
import { ExternalToolMapper } from "@/store/external-tool/mapper";
import { ToolLaunchRequestResponse } from "@/serverApi/v3";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { RoomBaseCard, RoomDotMenu },
	emits: ["edit", "delete", "click", "error"],
	props: {
		tool: {
			type: Object as PropType<ExternalToolDisplayData>,
			required: true,
		},
		canEdit: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { t } = useI18n();
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);

		const handleClick = () => {
			if (loadingError.value) {
				emit("error", props.tool);
				return;
			}

			emit("click", toolLaunchRequest.value, props.tool);
		};

		const handleEdit = () => {
			emit("edit", props.tool);
		};

		const handleDelete = () => {
			emit("delete", props.tool);
		};

		const menuItems = [
			{
				icon: mdiTrashCanOutline,
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		if (envConfigModule.getCtlContextConfigurationEnabled) {
			menuItems.unshift({
				icon: mdiPencilOutline,
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			});
		}

		const isToolOutdated: ComputedRef = computed(
			() => props.tool.status === ToolConfigurationStatus.Outdated
		);

		const toolLaunchRequest: Ref<ToolLaunchRequest | undefined> = ref();

		const loadingError: Ref<boolean> = ref(false);
		const loadLaunchRequest = async () => {
			loadingError.value = false;
			try {
				const response: ToolLaunchRequestResponse | undefined =
					await externalToolsModule.loadToolLaunchData(
						props.tool.contextExternalToolId
					);
				toolLaunchRequest.value = response
					? ExternalToolMapper.mapToToolLaunchRequest(response)
					: undefined;
			} catch (e: unknown) {
				loadingError.value = true;
			}
		};

		onMounted(async () => {
			if (isToolOutdated.value) {
				return;
			}
			await loadLaunchRequest();
		});

		return {
			t,
			handleClick,
			menuItems,
			isToolOutdated,
			mdiAlert,
		};
	},
});
</script>
