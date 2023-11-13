<template>
	<div class="text-center">
		<v-menu offset-y max-height="120px">
			<template v-slot:activator="{ on, attrs }">
				<button v-bind="attrs" v-on="on">
					<v-icon style="color: white">{{ mdiPlaySpeed }}</v-icon>
				</button>
			</template>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { mdiPlaySpeed } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SpeedMenu",
	setup() {
		const items = [
			{ title: "0.25" },
			{ title: "0.5" },
			{ title: "0.75" },
			{ title: "Normal" },
			{ title: "1.25" },
			{ title: "1.5" },
			{ title: "1.75" },
			{ title: "2" },
		];

		return {
			items,
			mdiPlaySpeed,
		};
	},
});
</script>
<style scoped>
button:focus {
	outline: none;
}
.v-list-item {
	min-height: 38px;
}
</style>
