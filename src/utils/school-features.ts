import { SchoolFeature } from "@/serverApi/v3";

const SCHOOL_FEATURES = Object.values(SchoolFeature);

export type SchoolFeatureObject = Record<SchoolFeature, boolean>;

export const mapSchoolFeatureObjectToArray = (f: SchoolFeatureObject) => {
	const features: SchoolFeature[] = [];
	for (const [key, value] of Object.entries(f)) {
		const valueOfFeatureKey = key as SchoolFeature; // Convert key to SchoolFeature enum value
		if (value && SCHOOL_FEATURES.includes(valueOfFeatureKey)) {
			features.push(valueOfFeatureKey);
		}
	}
	return features;
};

export const mapFeaturesToFeaturesObject = (features: SchoolFeature[]): SchoolFeatureObject => {
	const featureObject: SchoolFeatureObject = {} as SchoolFeatureObject; // Initialize featureObject

	SCHOOL_FEATURES.forEach((schoolFeature) => {
		if (features.includes(schoolFeature)) {
			featureObject[schoolFeature] = true;
		} else {
			featureObject[schoolFeature] = false;
		}
	});

	return featureObject;
};
