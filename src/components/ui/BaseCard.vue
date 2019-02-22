<template>
  <section :style="styles" class="card">
    <div class="customcard-header">
      <slot name="header"/>
    </div>
    <div class="customcard-content">
      <slot>
        <!-- CONTENT -->
      </slot>
    </div>
    <div class="customcard-footer">
      <slot name="footer"/>
    </div>
  </section>
</template>

<script>
export default {
	name: "BaseCard",
	props: {
		styles: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.card {
	padding: $size-padding;
	overflow: hidden;
	background: #fff;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
	box-shadow: $shadow-1;
	transition: box-shadow ($duration-animation-base * 0.5) ease-in;
	&:hover {
		box-shadow: $shadow-2;
	}
}
</style>
