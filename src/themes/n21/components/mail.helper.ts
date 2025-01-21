import { envConfigModule } from "@/store";

export const getSupportMail = () => {
	const contactEmail = envConfigModule.env.SC_CONTACT_EMAIL;
	const fallbackEmail = "support@dbildungscloud.de";
	const isValidMailAddress = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+$/gm.test(
		contactEmail
	);

	const supportMail = isValidMailAddress ? contactEmail : fallbackEmail;
	return {
		supportMail,
		mailtoSupportMail: `mailto:${supportMail}`,
	};
};
