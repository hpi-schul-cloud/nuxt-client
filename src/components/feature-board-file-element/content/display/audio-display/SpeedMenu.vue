<template>
	<div class="text-center">
		<v-menu offset-y max-height="120px">
			<template v-slot:activator="{ on, attrs }">
				<button v-bind="attrs" v-on="on">
					<v-icon style="color: white">{{ mdiPlaySpeed }}</v-icon>
				</button>
			</template>
			<v-list>
				<v-list-item
					v-for="(item, index) in items"
					:key="index"
					@click="onSelect(item.id)"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { mdiCheck, mdiPlaySpeed } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SpeedMenu",
	emits: ["rate"],
	setup(props, { emit }) {
		const items = [
			{ title: "0.25", value: 0.25, id: 1 },
			{ title: "0.5", value: 0.5, id: 2 },
			{ title: "0.75", value: 0.75, id: 3 },
			{ title: "Normal", value: 1, id: 4 },
			{ title: "1.25", value: 1.25, id: 5 },
			{ title: "1.5", value: 1.5, id: 6 },
			{ title: "1.75", value: 1.75, id: 7 },
			{ title: "2", value: 2, id: 8 },
		];

		const onSelect = async (selected: number) => {
			emit("rate", items[selected - 1].value);
		};

		return {
			items,
			mdiPlaySpeed,
			mdiCheck,
			onSelect,
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
