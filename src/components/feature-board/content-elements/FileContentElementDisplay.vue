<template>
	<div>
		<div>
			{{ caption }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		caption: {
			type: String,
			required: true,
		},
	},
});
</script>
