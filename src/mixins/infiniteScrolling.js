export default {
	data() {
		return {
			$_bottom: false,
			$_scrollY: 0,
		};
	},
	created() {
		window.scrollTo({ top: 0, behavior: "smooth" });
		window.addEventListener("scroll", () => {
			this.$_bottom = this.$_bottomVisible();
			this.$_scrollY = window.scrollY;
		});
	},
	beforeDestroy() {
		window.removeEventListener("scroll", () => {
			this.$_bottom = this.$_bottomVisible();
			this.$_scrollY = window.scrollY;
		});
	},
	methods: {
		$_bottomVisible() {
			const { scrollY } = window;
			const visibleHeight = document.documentElement.clientHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const bottomOfPage = visibleHeight + scrollY >= pageHeight - 2;
			return bottomOfPage || pageHeight < visibleHeight;
		},
		$_backToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
};
