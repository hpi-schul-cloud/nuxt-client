<template>
	<max-width>
		<impressum />
	</max-width>
</template>

<script>
import Impressum from "@components/templates/impressum";
import MaxWidth from "@components/atoms/MaxWidth";

export default {
	components: { Impressum, MaxWidth },
	meta: {
		isPublic: true,
	},
};
</script>
