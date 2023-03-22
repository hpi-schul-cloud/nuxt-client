<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="black"
				small
				text
				dark
				icon
				v-bind="attrs"
				v-on="on"
				:ripple="false"
			>
				<v-icon>{{ mdiDotsVertical }}</v-icon>
				<span class="d-sr-only">Card-Menu</span>
			</v-btn>
		</template>
		<v-list>
			<slot></slot>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { mdiDotsVertical } from "@mdi/js";
export default defineComponent({
	name: "CardHostMenu",
	setup() {
		return {
			mdiDotsVertical,
		};
	},
});
</script>
