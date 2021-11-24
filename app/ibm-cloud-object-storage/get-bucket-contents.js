const IBM = require('ibm-cos-sdk');

module.exports = async (config, params = {}, debug = false) => {
	const objectStorage = new IBM.S3(config);

	if (debug) {
		console.log(`Retrieving bucket contents from: ${params.Bucket}`);
	}

	return objectStorage.listObjects(params)
		.promise()
		.then((data) => {
			if ((debug) && (data != null && data.Contents != null)) {
				data.Contents.forEach((content) => {
					const itemKey = content.Key;
					const itemSize = content.Size;
					console.log(`Item: ${itemKey} (${itemSize} bytes).`);
				});
			}

			return data.Contents;
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
