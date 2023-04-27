<template>
	<v-menu offset-y left min-width="250">
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
				@dblclick.stop="() => {}"
			>
				<v-icon>{{ mdiDotsVertical }}</v-icon>
				<span class="d-sr-only">
					<template v-if="scope === 'board'">Board-Menu</template>
					<template v-if="scope === 'column'">Column-Menu</template>
					<template v-if="scope === 'card'">Card-Menu</template>
				</span>
			</v-btn>
		</template>
		<v-list>
			<slot></slot>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { mdiDotsVertical } from "@mdi/js";
export default defineComponent({
	name: "BoardMenu",
	props: {
		scope: {
			type: String as PropType<"card" | "column" | "board">,
			required: true,
		},
	},
	setup() {
		return {
			mdiDotsVertical,
		};
	},
});
</script>
