import { SchoolFeature, SchoolResponse } from "@/serverApi/v3";
import { School } from "@/store/types/schools";

const SCHOOL_FEATURES = Object.values(SchoolFeature);

type SchoolFeatureObject = Record<SchoolFeature, boolean>;

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

export const mapSchoolServerToClient = (school: SchoolResponse): School => {
	const featureObject: Partial<School["features"]> = {};

	SCHOOL_FEATURES.forEach((schoolFeature) => {
		if (school.features?.includes(schoolFeature)) {
			featureObject[schoolFeature] = true;
		} else {
			featureObject[schoolFeature] = false;
		}
	});

	return { ...school, features: featureObject as Required<School["features"]> };
};
