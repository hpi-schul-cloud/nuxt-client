<template>
	<v-menu v-if="menuItems.length" bottom left offset-y attach>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				v-show="show"
				v-bind="attrs"
				class="three-dot-button"
				icon
				v-on="on"
				@click.prevent
				@keydown.space.stop
			>
				<v-icon>{{ mdiDotsVertical }}</v-icon>
			</v-btn>
		</template>
		<v-list v-if="menuItems.length">
			<v-list-item
				v-for="(item, i) in menuItems"
				:key="i"
				:class="`task-action task-action-${item.name.split(' ').join('-')}`"
				@click.prevent="item.action"
				><v-icon class="task-action-icon mr-1">
					{{ item.icon }}
				</v-icon>
				<v-list-item-title>
					{{ item.name }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import { mdiDotsVertical } from "@mdi/js";

export default {
	components: {},
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
		show: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			mdiDotsVertical,
		};
	},
};
</script>

<style lang="scss" scoped>
.task-action {
	min-height: var(--space-lg);
}

.task-action-icon {
	width: var(--space-md);
	height: var(--space-md);
	margin-top: calc(-0.5 + var(--space-base-vuetify));
	font-size: var(--space-md);
	color: var(--color-gray-dark);
}
</style>
