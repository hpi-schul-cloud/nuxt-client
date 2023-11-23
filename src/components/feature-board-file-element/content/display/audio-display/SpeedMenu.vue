<template>
	<div class="text-center">
		<v-menu offset-y max-height="120px" nudge-left="100px" max-width="120px">
			<template v-slot:activator="{ on, attrs }">
				<button v-bind="attrs" v-on="on">
					<v-icon
						aria-label="Speed menu"
						role="img"
						style="color: white; padding-right: 10px; padding-left: 2px"
						>{{ mdiPlaySpeed }}</v-icon
					>
				</button>
			</template>

			<v-list>
				<v-list-item-group v-model="selectedItem">
					<v-list-item
						v-for="(item, i) in items"
						:key="i"
						@click="onSelect(item.id)"
					>
						<v-list-item-content class="ml-3">
							<v-list-item-title>{{ item.title }} </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="item.id === selectedItem + 1">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { mdiCheck, mdiPlaySpeed } from "@mdi/js";
import { defineComponent, Ref, ref } from "vue";

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
		const selectedItem = ref(3);
		const speedSelected: Ref<boolean> = ref(false);

		const onSelect = async (selected: number) => {
			emit("rate", items[selected - 1].value);
			speedSelected.value = !speedSelected.value;
		};

		return {
			items,
			mdiPlaySpeed,
			mdiCheck,
			onSelect,
			speedSelected,
			selectedItem,
		};
	},
});
</script>
<style scoped>
button:focus {
	outline: none;
}
.v-list-item {
	min-height: 30px;
	padding: 0px;
}
</style>
