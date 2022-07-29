<template>
	<span> {{ elementTypeName }} - {{ element.title }} </span>
</template>

<script>
import { CopyResultItemElement } from "@components/copy-result-modal/types/CopyResultItemElement";

export default {
	name: "CopyResultModalListItemElement",
	props: {
		element: {
			type: CopyResultItemElement,
			required: true,
			default: () => undefined,
		},
	},
	computed: {
		elementTypeName() {
			if (element.type === "geogebra") return "Geogebra";
			if (element.type === "file") return "Datei";
			if (element.type === "etherpad") return "Etherpad";
			return "";
		},
	},
};
</script>

<!--<style scoped></style>-->
