<template>
	<v-card
		class="card"
		max-width="100%"
		aria-label="ariaLabel"
		hover
		@click="handleClick"
	>
		<div class="logo-container">
			<v-img
				v-if="tool.logoUrl"
				class="mx-auto logo"
				:src="tool.logoUrl"
				contain
				data-testid="tool-card-logo"
				:alt="$t('pages.rooms.tools.logo')"
				crossorigin="anonymous"
			/>
		</div>
		<h5 class="title my-auto">{{ tool.name }}</h5>
		<span
			v-if="tool.openInNewTab"
			class="ml-1 my-auto no-wrap"
			data-testid="tool-card-new-tab-text"
			>({{ $t("pages.rooms.tools.newTab") }})</span
		>
		<div class="mx-auto"></div>
		<div v-if="canEdit" class="ml-1 my-auto">
			<more-item-menu
				class="menu"
				:menu-items="menuItems"
				:show="true"
				data-testid="tool-card-menu"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import MoreItemMenu from "@/components/molecules/MoreItemMenu.vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	mdiPencilOutline,
	mdiPuzzleOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "RoomExternalToolCard",
	components: { MoreItemMenu },
	emits: ["edit", "delete", "click"],
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
		const i18n = injectStrict(I18N_KEY);

		const t = (key: string): string => i18n.tc(key, 0) || key;

		const defaultToolIcon = mdiPuzzleOutline;

		const handleClick = () => {
			emit("click", props.tool);
		};

		const handleEdit = () => {
			emit("edit", props.tool);
		};

		const handleDelete = () => {
			emit("delete", props.tool);
		};

		const menuItems = [
			{
				icon: mdiPencilOutline,
				action: handleEdit,
				name: t("common.actions.edit"),
				dataTestId: "tool-edit",
			},
			{
				icon: mdiTrashCanOutline,
				action: handleDelete,
				name: t("common.actions.remove"),
				dataTestId: "tool-delete",
			},
		];

		return {
			handleClick,
			menuItems,
			defaultToolIcon,
		};
	},
});
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	align-content: center;
	height: 100px;
	padding: 16px;
}

.title {
	overflow: hidden;
	max-height: 100%;
}

.logo-container {
	margin-right: 16px;
	max-width: 160px;
	height: 100%;
}

@media only screen and (max-width: 749px) {
	.logo-container {
		max-width: 68px;
	}
}

@media only screen and (max-width: 399px) {
	.logo-container {
		display: none;
	}
}

.logo {
	max-width: 140px;
	height: 100%;
	width: auto;
}

.no-wrap {
	flex-shrink: 0;
}
</style>
