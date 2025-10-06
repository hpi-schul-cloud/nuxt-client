import { FederalStateResponse, SchoolFeature, SchoolResponse, SchoolYearResponse } from "@/serverApi/v3";

export interface Year extends SchoolYearResponse {}

export interface FederalState extends FederalStateResponse {}

export type SchoolFeatureObject = Record<SchoolFeature, boolean>;

export interface School extends SchoolResponse {
	featureObject: SchoolFeatureObject;
}
