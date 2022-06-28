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
				<v-icon :class="setCustomClass(item.status)" :data-testid="item.id">
					{{ setIcons(item) }}
				</v-icon>
			</template>
			<template #label="{ item }">
				<div
					class="treeview-item"
					:class="`treeview-item-${item.status}`"
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
	Success: "success",
	Failure: "failure",
	Partial: "partial",
	SuccessAll: "success-all",
};

const ClassEnum = {
	Finished: "finished",
	NotFinished: "not-finished",
	Partial: "partial",
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
			if (itemStatus === StatusEnum.Success) return ClassEnum.Finished;
			if (itemStatus === StatusEnum.Failure) return ClassEnum.NotFinished;
			if (itemStatus === StatusEnum.Partial) return ClassEnum.Partial;
		},
		setIcons(item) {
			if (item.status === StatusEnum.SuccessAll) return this.icons.mdiCheckAll;
			if (item.status === StatusEnum.Success && !item.elements)
				return this.icons.mdiCheck;
			if (item.status === StatusEnum.Success) return this.icons.mdiCheck;
			if (item.status === StatusEnum.Failure) return this.icons.mdiAlertCircle;
			if (item.status === StatusEnum.Partial) return this.icons.mdiAlert;
		},
		searchExpandedNodes(items) {
			if (!items instanceof Array) return;
			items.forEach((item) => {
				if (item.elements && item.status !== StatusEnum.Success)
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
					itemStatus: this.$t(`common.labels.${item.status}`),
				});
			}

			if (!this.expandedNodes.includes(item.index)) {
				return this.$t("components.molecules.copyResult.aria.parentItem.info", {
					itemTitle: item.title,
					itemStatus: this.$t(`common.labels.${item.status}`),
					includedItems: item.elements.length,
					action: this.$t("common.labels.expand"),
				});
			}

			return this.$t("components.molecules.copyResult.aria.parentItem.info", {
				itemTitle: item.title,
				itemStatus: this.$t(`common.labels.${item.status}`),
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
	color: var(--color-accent);
}
</style>
