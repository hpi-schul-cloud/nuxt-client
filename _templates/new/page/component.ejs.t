---
to: "src/pages<%= route %>/index.vue"
---
<%
  const fileName = route.replace(/^.*[\\\/]/, '');
%><template>
  <div>
		<p>Page: <%= route %> </p>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: "<%= fileName %>",
		};
	},
}
</script>

<style lang="scss" scoped>
@import '@variables';

</style>
