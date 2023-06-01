<template>
	<div class="d-flex flex-column">
		<div class="d-flex flex-sm-row align-items-center">
			<v-icon x-large>{{ mdiFileDocumentOutline }}</v-icon>
			<a
				class="file-content-element-display-label truncate"
				href="https://niedersachsen.cloud/"
			>
				{{ caption }}
			</a>
		</div>
		<vTextField v-model="modelCaption" label="Caption"></vTextField>
	</div>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import { mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementEdit",
	props: {
		caption: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelCaption = useVModel(props, "caption", emit);
		return {
			mdiFileDocumentOutline,
			modelCaption,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
@import "~vuetify/src/styles/styles.sass";
.file-content-element-edit {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
}

.file-content-element-edit-label {
	font-family: "PT Sans";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02px;
	color: #9e292b;
}
</style>
