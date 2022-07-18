<template>
	<div>
		<v-treeview
			:expand-icon="icons.mdiChevronDown"
			:items="items"
			color="primary"
			transition
			:open="expandedNodes"
			item-children="elements"
			item-key="index"
			dense
			@keydown.space="onSpacePress"
		>
			<template #prepend="{ item }">
				<v-icon :class="setCustomClass(item.feStatus)" :data-testid="item.id">
					{{ setIcons(item) }}
				</v-icon>
			</template>
			<template #label="{ item }">
				<div
					class="treeview-item"
					:class="`treeview-item-${item.feStatus}`"
					tabindex="0"
					:aria-label="getAriaLabel(item)"
					@keydown.space="onSpacePress(item.index)"
				>
					{{ item.title }}
				</div>
			</template>
		</v-treeview>
	</div>
</template>

<script>
import {
	mdiCheck,
	mdiCheckAll,
	mdiAlert,
	mdiAlertCircle,
	mdiChevronDown,
} from "@mdi/js";

const StatusEnum = {
	SUCCESS: "success",
	FAILURE: "failure",
	PARTIAL: "partial",
	SUCCESS_ALL: "success-all",
};

const ClassEnum = {
	FINISHED: "finished",
	NOT_FINISHED: "not-finished",
	PARTIAL: "partial",
};

export default {
	props: {
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
	data() {
		return {
			icons: {
				mdiCheck,
				mdiCheckAll,
				mdiAlert,
				mdiAlertCircle,
				mdiChevronDown,
			},

			expandedNodes: [],
		};
	},
	created() {
		this.searchExpandedNodes(this.items);
	},
	methods: {
		setCustomClass(itemStatus) {
			if (itemStatus === StatusEnum.SUCCESS) return ClassEnum.FINISHED;
			if (itemStatus === StatusEnum.FAILURE) return ClassEnum.NOT_FINISHED;
			if (itemStatus === StatusEnum.PARTIAL) return ClassEnum.PARTIAL;
		},
		setIcons(item) {
			if (item.feStatus === StatusEnum.SUCCESS_ALL)
				return this.icons.mdiCheckAll;
			if (item.feStatus === StatusEnum.SUCCESS) return this.icons.mdiCheck;
			if (item.feStatus === StatusEnum.FAILURE)
				return this.icons.mdiAlertCircle;
			if (item.feStatus === StatusEnum.PARTIAL) return this.icons.mdiAlert;
		},
		searchExpandedNodes(items) {
			if (!items instanceof Array) return;
			items.forEach((item) => {
				if (item.elements && item.feStatus !== StatusEnum.SUCCESS)
					this.expandedNodes.push(item.index);
				if (item.elements) this.searchExpandedNodes(item.elements);
			});
		},
		onSpacePress(itemId) {
			if (this.expandedNodes.includes(itemId)) {
				const index = this.expandedNodes.indexOf(itemId);
				this.expandedNodes.splice(index, 1);
				return;
			}
			this.expandedNodes.push(itemId);
		},
		getAriaLabel(item) {
			if (!item.elements) {
				return this.$t("components.molecules.copyResult.aria.childItem.info", {
					itemTitle: item.title,
					itemStatus: this.$t(`common.labels.${item.feStatus}`),
				});
			}

			if (!this.expandedNodes.includes(item.index)) {
				return this.$t("components.molecules.copyResult.aria.parentItem.info", {
					itemTitle: item.title,
					itemStatus: this.$t(`common.labels.${item.feStatus}`),
					includedItems: item.elements.length,
					action: this.$t("common.labels.expand"),
				});
			}

			return this.$t("components.molecules.copyResult.aria.parentItem.info", {
				itemTitle: item.title,
				itemStatus: this.$t(`common.labels.${item.feStatus}`),
				includedItems: item.elements.length,
				action: this.$t("common.labels.collapse"),
			});
		},
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

.treeview-item-failure {
	color: var(--color-danger-dark);
	white-space: normal;
}

.not-finished {
	color: var(--color-danger-dark);
}

.finished {
	color: var(--color-secondary);
}

.partial {
	color: var(--color-warning);
}
</style>
