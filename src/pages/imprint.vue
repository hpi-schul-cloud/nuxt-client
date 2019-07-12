<template>
	<section class="section">
		<div class="columns is-mobile">
			<h1>Imprint - {{ $theme.short_name }}</h1>
		</div>
		<pulsating-dot class="alert-dot"></pulsating-dot>
	</section>
</template>
<script>
import PulsatingDot from "@components/PulsatingDot";
export default {
	components: { PulsatingDot },
};
</script>
