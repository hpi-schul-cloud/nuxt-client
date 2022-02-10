<template>
	<v-menu bottom left offset-y attach>
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
				class="task-action"
				@click.prevent="item.action"
			>
				<v-list-item-title>
					<v-icon class="task-action-icon">
						{{ item.icon }}
					</v-icon>
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
// stylelint-disable sh-waqar/declaration-use-variable
.task-action {
	min-height: 25px;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
	color: rgba(0, 0, 0, 0.87);
}
</style>
