<template>
	<div>
		<template v-for="{ item, index } in items">
			<copy-result-modal-list-item
				:key="index"
				:item="item"
			></copy-result-modal-list-item>
		</template>
	</div>
</template>

<script>
import CopyResultModalListItem from "@components/copy-result-modal/CopyResultModalListItem";

/**
 * Diese Komponente orchestriert in erster linie nur die iteration der einzelnen breadcrumb items.
 *
 * Ich breche diese component aus dem CopyResultModalContent raus um das Template dort möglichst schlank zu halten.
 */

export default {
	name: "CopyResultModalList",
	components: { CopyResultModalListItem },
	props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
	},
};
</script>

<!--<style scoped></style>-->
