import uid from "./uid";

const getInstance = () => {
	return shallowMount(
		{
			template: "<div/>",
		},
		{
			mixins: [uid],
		}
	);
};
describe("@/mixins/uid", () => {
	it("exposes $uid on component", () => {
		expect(getInstance().vm.$uid).toBeDefined();
	});

	it("generates unique $uids for at least 5.000 components", () => {
		const totalTestComponents = 5000;
		const uids = {};
		new Array(totalTestComponents).fill(0).forEach(() => {
			const newUid = getInstance().vm.$uid;
			expect(uids[newUid]).toBeUndefined();
			uids[newUid] = true;
		});
	});
});
