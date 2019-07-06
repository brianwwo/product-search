const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        try {
            if (!event.queryStringParameters || !event.queryStringParameters.key) {
                resolve([]);
            } else {
                const key = event.queryStringParameters.key;
                docClient.scan({
                    TableName: 'Products',
                    FilterExpression: 'contains( #val, :v )',
                    ExpressionAttributeNames: {
                        '#val': 'value'
                    },
                    ExpressionAttributeValues: {
                        ':v': key
                    }
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            statusCode: 200,
                            body: JSON.stringify(data.Items),
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                            }
                        });
                    }
                })
            }
        } catch (e) { reject(e); }
    })
};
