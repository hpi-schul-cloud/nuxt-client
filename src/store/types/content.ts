/**
 *
 */
export type Query = {
	$limit: number;
	$skip: number;
	searchQuery: string;
};

export type Resource = {
	access: string[];
	aspects: string[];
	commentCount: number | null;
	content: object;
	createdBy: object;
	downloadUrl: string | null;
	iconURL: string | null;
	isDirectory: boolean;
	license: object;
	mediatype: string;
	metadataset: string;
	mimetype: string;
	modifiedBy: object;
	name: string;
	owner: object;
	parent: object;
	preview: object;
	properties: ResourceProperties;
	ref: { id?: string };
	repositoryType: string;
	size: string;
	title: string;
	type: string;
	stateSelected?: boolean;
};

export type ResourceProperties = {
	"cclom:aggregationlevel": string[];
	"cclom:format": string[];
	"cclom:general_description": string[];
	"cclom:general_keyword": string[];
	"cclom:location": string[];
	"cclom:title": string[];
	"cclom:version": string[];
	"ccm:commonlicense_cc_version": string[];
	"ccm:commonlicense_key": string[];
	"ccm:create_version": string[];
	"ccm:educontextname": string[];
	"ccm:hpi_lom_relation": string[];
	"ccm:hpi_searchable": string[];
	"ccm:lom_relation": string[];
	"ccm:objecttype": string[];
	"ccm:objecttype_DISPLAYNAME": string[];
	"ccm:original": string[];
	"ccm:replicationsource": string[];
	"ccm:replicationsourcehash": string[];
	"ccm:replicationsourceid": string[];
	"ccm:replicationsourceuuid": string[];
	"ccm:taxonid": string[];
	"ccm:taxonid_DISPLAYNAME": string[];
	"ccm:userdefined_preview": string[];
	"ccm:version_comment": string[];
	"ccm:wwwurl": string[];
	"cm:autoVersion": string[];
	"cm:autoVersionOnUpdateProps": string[];
	"cm:automaticUpdate": string[];
	"cm:created": string[];
	"cm:created_LONG": string[];
	"cm:creator": string[];
	"cm:edu_forcemetadataset": string[];
	"cm:edu_metadataset": string[];
	"cm:initialVersion": string[];
	"cm:modified": string[];
	"cm:modified_LONG": string[];
	"cm:modifier": string[];
	"cm:name": string[];
	"cm:versionLabel": string[];
	"sys:locale": string[];
	"sys:node-dbid": string[];
	"sys:node-uuid": string[];
	"sys:store-identifier": string[];
	"sys:store-protocol": string[];
	"virtual:primaryparent_nodeid": string[];
};

export type Resources = {
	total: number;
	limit: number;
	skip: number;
	data: Resource[];
	pagination: undefined;
};

export type Elements = {
	data: Resource[];
	limit: number;
	skip: number;
	total: number;
	pagination: undefined;
};

export type Lesson = {
	courseId: string;
	createdAt: string;
	date: string;
	hidden: boolean;
	materialIds: string[];
	name: string;
	position: number;
	time: string;
	updatedAt: string;
	_id: string;
};

export type Lessons = {
	data: Lesson[];
	limit: number;
	skip: number;
	total: number;
};

export type AddToLessonQuery = {
	lessonId: string;
	event: object;
	material: {
		client: string;
		merlinReference: string;
		title: string;
		url: string;
	};
};
