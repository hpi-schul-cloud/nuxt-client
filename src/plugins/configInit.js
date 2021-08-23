import EnvConfigModule from "@/store/env-config";

export default async () => {
	try {
		await EnvConfigModule.findEnvs();
	} catch (error) {
		console.error(error);
	}
};
