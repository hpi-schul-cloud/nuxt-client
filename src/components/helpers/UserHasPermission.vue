<template>
	<div v-if="$_hasPermission" class="user-has-permission">
		<slot />
		<slot name="true" />
	</div>
	<div v-else class="user-has-no-permission">
		<slot name="false" />
	</div>
</template>

<script>
import UserHasPermission from "@/mixins/UserHasPermission";
export default {
	mixins: [UserHasPermission],
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>
