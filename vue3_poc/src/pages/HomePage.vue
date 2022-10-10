<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<v-img :src="bird" class="my-3" contain height="400" />
			</v-col>

			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					<h1>Welcome to Vue 3 POC</h1>
				</h1>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import bird from "../assets/bird.svg";

export default defineComponent({
	name: "HomePage",
	data() {
		return {
			bird,
		};
	},
});
</script>
