const transitionStub = () => ({
	render: function () {
		return this.$options._renderChildren;
	},
});

export default {
	transition: transitionStub,
};
