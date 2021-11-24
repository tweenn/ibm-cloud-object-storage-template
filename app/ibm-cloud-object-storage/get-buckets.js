const IBM = require('ibm-cos-sdk');

module.exports = async (config, debug = false) => {
	const objectStorage = new IBM.S3(config);

	if (debug) {
		console.log('Retrieving list of buckets');
	}

	return objectStorage.listBuckets()
		.promise()
		.then((data) => {
			if ((debug) && (data.Buckets != null)) {
				data.Buckets.forEach((bucket) => {
					console.log(`Bucket Name: ${bucket.Name}`);
				});
			}
			return data.Buckets;
		})
		.catch((error) => {
			if (debug) {
				console.error(`ERROR: ${error.code} - ${error.message}\n`);
				console.log('------------');
				console.log(error);
			}
			return [];
		});
};
