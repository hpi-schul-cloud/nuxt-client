<template>
	<div v-if="item !== undefined">
		<!--breadcrumb element -->
		<v-breadcrumbs
			:items="[{ href: itemUrl, text: item.title, disabled: false }]"
		></v-breadcrumbs>
		<ul>
			<li v-for="{ e, index } of elements" :key="index">
				<copy-result-modal-list-item-element
					:element="e"
				></copy-result-modal-list-item-element>
			</li>
		</ul>
	</div>
</template>

<script>
import { CopyResultItem } from "@components/copy-result-modal/types/CopyResultItem";
import CopyResultModalListItemElement from "@components/copy-result-modal/CopyResultModalListItemElement";

/**
 * Diese Component rendert ein item der Liste.
 *
 * Ein Item besteht aus dem Breadcrumb titel und der Liste der fehlgeschlagenen elemente
 */

export default {
	name: "CopyResultModalListItem",
	components: { CopyResultModalListItemElement },
	props: {
		item: {
			type: CopyResultItem | undefined, // I don't know how to solve this lint-error right now || are we using classes for props typing?
			required: true,
			default: () => undefined,
		},
	},
	computed: {
		itemUrl() {
			return "google.de"; // create the target url where the user can fix the shown errors
		},
		elements() {
			return this.item?.elements || [];
		},
	},
};
</script>

<!--<style scoped></style>-->
