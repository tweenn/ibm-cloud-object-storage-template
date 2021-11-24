require('dotenv-flow').config();
const config = require('config');

const ibmCloudObjectStorage = require('./ibm-cloud-object-storage');

const ibmCloudObjectStorageConfig = {
	endpoint: config.get('object-storage.configuration.endpoint'),
	apiKeyId: config.get('object-storage.configuration.apiKeyId'),
	ibmAuthEndpoint: config.get('object-storage.configuration.ibmAuthEndpoint'),
	serviceInstanceId: config.get('object-storage.configuration.serviceInstanceId')
};

(async () => {
	const buckets = await ibmCloudObjectStorage.getBuckets(ibmCloudObjectStorageConfig);
	console.log(buckets);

	const bucketContents = await ibmCloudObjectStorage.getBucketContents(ibmCloudObjectStorageConfig, {
		Bucket: config.get('object-storage.bucket')
	});
	console.log(bucketContents);

	console.log('finished');
})();
