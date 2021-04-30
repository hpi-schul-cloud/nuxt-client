export default async ({ store }) => {
	try {
		await store.dispatch("env-config/get");
	} catch (error) {
		console.error(error);
	}
};
