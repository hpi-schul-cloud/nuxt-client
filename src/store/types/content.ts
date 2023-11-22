/**
 *
 */
/* eslint-disable @typescript-eslint/ban-types */
export type Query = {
	$limit: number;
	$skip: number;
	searchQuery: string;
};

export type Resource = {
	remote: any;
	content: {
		url: string;
		hash: null;
		version: string;
	};
	license: {
		icon: string;
		url: null;
	};
	isDirectory: boolean;
	commentCount: number;
	rating: {
		overall: {
			sum: number;
			count: number;
			rating: number;
		};
		affiliation: {};
		user: number;
	};
	usedInCollections: any[];
	ref: {
		repo: string;
		id: string;
		archived: boolean;
		isHomeRepo: boolean;
	};
	parent: {
		repo: string;
		id: string;
		archived: boolean;
		isHomeRepo: boolean;
	};
	type: string;
	aspects: string[];
	name: string;
	title: string;
	metadataset: string;
	repositoryType: string;
	createdAt: string;
	createdBy: {
		profile: null;
		firstName: null;
		lastName: null;
		mailbox: null;
	};
	modifiedAt: string;
	modifiedBy: {
		profile: null;
		firstName: null;
		lastName: null;
		mailbox: null;
	};
	access: string[];
	downloadUrl: null;
	properties: {
		"cm:creator": string[];
		"cm:autoVersion": string[];
		"ccm:replicationsourcehash": string[];
		"ccm:original": string[];
		"cm:versionLabel": string[];
		"cm:created": string[];
		"cclom:aggregationlevel": string[];
		"ccm:lom_relation": string[];
		"cclom:version": string[];
		"cm:created_LONG": string[];
		virtual: {
			primaryparent_nodeid: string[];
		};
		"ccm:objecttype": string[];
		"sys:node-uuid": string[];
		"ccm:lifecyclecontributer_publisher": string[];
		"ccm:userdefined_preview": string[];
		"ccm:replicationsourceid": string[];
		"ccm:replicationsource": string[];
		"ccm:hpi_lom_relation": string[];
		"sys:locale": string[];
		"cclom:general_description": string[];
		"cm:modified": string[];
		"cm:edu_forcemetadataset": string[];
		"cclom:rights_description": string[];
		"cm:modifier": string[];
		"ccm:educationallearningresourcetype_DISPLAYNAME": string[];
		"cm:autoVersionOnUpdateProps": string[];
		"cclom:location": string[];
		"ccm:replicationsourceuuid": string[];
		"cclom:title": string[];
		"ccm:educontextname": string[];
		"sys:store-protocol": string[];
		"sys:store-identifier": string[];
		"ccm:hpi_searchable": string[];
		"cm:modified_LONG": string[];
		"ccm:version_comment": string[];
		"cclom:format": string[];
		"ccm:educationallearningresourcetype": string[];
		"cm:automaticUpdate": string[];
		"cm:name": string[];
		"ccm:create_version": string[];
		"sys:node-dbid": string[];
		"ccm:wwwurl": string[];
		"cm:initialVersion": string[];
		"cm:edu_metadataset": string[];
		"cclom:general_keyword": string[];
		"ccm:commonlicense_key": string[];
		"ccm:objecttype_DISPLAYNAME": string[];
	};
	mimetype: string;
	mediatype: string;
	size: null;
	preview: {
		isIcon: boolean;
		isGenerated: boolean;
		type: string;
		mimetype: string;
		data: string;
		width: null;
		height: null;
	};
	iconURL: string;
	collection: null;
	owner: {
		profile: null;
		firstName: string;
		lastName: string;
		mailbox: null;
	};
};

export type Resources = {
	total: number;
	limit: number;
	skip: number;
	data: Resource[];
	pagination: undefined;
};

export type Elements = {
	data: any[];
	limit: number;
	skip: number;
	total: number;
	pagination: undefined;
};

export type Lesson = {
	contents: any[];
	courseId: string;
	createdAt: string;
	date: string;
	hidden: boolean;
	isCopyFrom: any;
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
	event: {};
	material: {
		client: string;
		merlinReference: string;
		title: string;
		url: string;
	};
};
