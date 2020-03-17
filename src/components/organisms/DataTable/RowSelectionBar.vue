<template>
	<div v-if="numberOfSelectedItems > 0" class="row-selection-info">
		<div class="d-flex align-items-center action">
			<div v-if="allRowsOfAllPagesSelected"
				>Alle {{ totalNumberOfItems }} ausgewählt</div
			>
			<div v-else>
				<span>{{ numberOfSelectedItems }} ausgewählt</span>
				<span v-if="numberOfSelectedItems < totalNumberOfItems">
					(oder
					<base-button
						design="none"
						class="select-all-rows"
						@click="$emit('update:allRowsOfAllPagesSelected', true)"
					>
						alle {{ totalNumberOfItems }} auswählen
					</base-button>
					)
				</span>
			</div>
			<div
				v-if="actions && actions.length"
				class="actions"
				style="position: relative;"
			>
				<base-button size="small" @click="actionsMenuOpen = true">
					Aktionen
				</base-button>
				<context-menu
					:show.sync="actionsMenuOpen"
					anchor="top-right"
					:actions="contextActions"
					@action="fireAction"
				/>
			</div>
		</div>
		<base-button design="none">
			<base-icon
				icon="close"
				source="material"
				class="ml--md mr--md close"
				style="cursor: pointer"
				@click="closeBanner"
			/>
		</base-button>
	</div>
</template>

<script>
import ContextMenu from "@components/molecules/ContextMenu";

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
	data() {
		return {
			actionsMenuOpen: false,
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
	beforeDestroy() {
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
@import "@styles";

.row-selection-info {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	padding: var(--space-md);
	font-size: var(--text-sm);
	font-weight: var(--font-weight-normal);
	color: var(--color-on-tertiary-light);
	background-color: var(--color-tertiary-light);

	@include breakpoint(tablet) {
		font-size: var(--text-md);
	}
}

.actions {
	margin-top: var(--space-sm);

	@include breakpoint(tablet) {
		margin-top: 0;
		margin-left: var(--space-md);
	}
}

.d-flex.action {
	flex-wrap: wrap;
	margin: var(--space-sm);
}

.select-all-rows {
	color: var(--color-white);
	text-decoration: underline;
	cursor: pointer;
}

.close {
	color: var(--color-white);
}
</style>
