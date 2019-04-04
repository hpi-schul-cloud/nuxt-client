<template>
	<div>
		<label class="boarder">
			<div class="label">
				{{ $attrs.label }}
			</div>
			<input v-model="content" v-bind="$attrs" :type="$attrs.type" />
		</label>
		<!-- Is below needed?
		<small v-if="hint || $slots.hint" class="hint">
			<template v-if="hint">{{ hint }}</template>
			<slot v-else name="hint" />
		</small>
		-->
	</div>
</template>
<script>
export default {
	data() {
		return {
			content: "",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.boarder {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
}
input {
	@extend %typography-small;

	box-sizing: boarder-box;
	display: block;
	width: 90%;
	margin: 10px;
	color: $color-text;
	border: 0;
	&::placeholder {
		color: lighten($color-text, 40%);
	}
}
.label {
	@extend %typography-small;

	position: relative;
	margin: $size-padding;
	margin-top: 0;
}
.hint {
	display: block;
	margin-top: -0.75em;
	margin-bottom: 1em;
	margin-left: 12px;
}
</style>
