import { envConfigModule } from "@/store";

export default async () => {
	try {
		await envConfigModule.findEnvs();
	} catch (error) {
		console.error(error);
	}
};
