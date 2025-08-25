<template>
	<div v-if="numberOfSelectedItems > 0" class="row-selection-info">
		<div class="d-flex align-center content-wrapper">
			<div v-if="allRowsOfAllPagesSelected">
				{{ $t("pages.administration.all") }}
				{{ totalNumberOfItems }}
				{{ $t("pages.administration.selected") }}
			</div>
			<div v-else>
				<span
					>{{ numberOfSelectedItems }}
					{{ $t("pages.administration.selected") }}
				</span>
			</div>
			<div
				v-if="actions && actions.length"
				class="actions"
				style="position: relative"
			>
				<v-btn
					variant="tonal"
					data-test-id="context-menu-open"
					class="context-menu-open"
					size="small"
					@click="actionsMenuOpen = true"
				>
					{{ $t("pages.administration.actions") }}
				</v-btn>
				<context-menu
					v-model:show="actionsMenuOpen"
					anchor="top-left"
					:actions="contextActions"
					@action="fireAction"
				/>
			</div>
		</div>
		<v-btn
			variant="text"
			:icon="mdiClose"
			width="40"
			height="40"
			@click="closeBanner"
		/>
	</div>
</template>

<script>
import ContextMenu from "@/components/molecules/ContextMenu.vue";
import { mdiClose } from "@icons/material";

export default {
	components: {
		ContextMenu,
	},
	props: {
		actions: {
			type: Array,
			default: () => [],
		},
		totalNumberOfItems: {
			type: Number,
			default: 0,
		},
		numberOfSelectedItems: {
			type: Number,
			required: true,
		},
		allRowsOfAllPagesSelected: {
			type: Boolean,
		},
	},
	emits: ["update:allRowsOfAllPagesSelected", "fire-action"],
	data() {
		return {
			actionsMenuOpen: false,
			mdiClose,
		};
	},
	computed: {
		contextActions() {
			return this.actions.map((actionCtx, index) => ({
				text: actionCtx.label,
				icon: actionCtx.icon,
				"icon-source": actionCtx["icon-source"],
				event: "action",
				arguments: index,
				dataTestId: actionCtx.dataTestId || null,
			}));
		},
	},
	watch: {
		numberOfSelectedItems(to) {
			if (to === 0) {
				this.actionsMenuOpen = false;
			}
		},
	},
	beforeUnmount() {
		this.actionsMenuOpen = false;
	},
	methods: {
		closeBanner() {
			this.$emit("update:allRowsOfAllPagesSelected", false);
		},
		fireAction(index) {
			this.$emit("fire-action", this.actions[index]);
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.row-selection-info {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 8px 16px;
	background-color: rgba(var(--v-theme-primary), 0.12);
}

.actions {
	margin-top: 12px;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin-top: 0;
		margin-left: 16px;
	}
}

.content-wrapper {
	flex-wrap: wrap;
	margin: 8px 0;
}

.select-all-rows {
	text-decoration: underline;
	cursor: pointer;
}
</style>
