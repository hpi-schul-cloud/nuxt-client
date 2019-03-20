let uid = 0;

const uidMixin = {
	beforeCreate() {
		this.$uid = ++uid;
	},
};

export default uidMixin;
