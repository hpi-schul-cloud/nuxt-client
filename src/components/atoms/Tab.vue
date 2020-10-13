<template>
	<div
		v-if="hasPermission"
		v-show="isActive"
		data-testid="tabTest"
		class="tab-content"
	>
		<slot></slot>
	</div>
</template>

<script>
import UserHasPermission from "@/mixins/UserHasPermission";
export default {
	mixins: [UserHasPermission],
	props: {
		name: {
			type: String,
			required: true,
		},
		selected: {
			type: Boolean,
		},
		iconName: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			isActive: false,
			hasPermission: true,
		};
	},
	created() {
		this.isActive = this.selected;
		this.hasPermission = this.$_hasPermission;
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
.tab-content {
	width: 100%;
	overflow-wrap: normal;
}
</style>
