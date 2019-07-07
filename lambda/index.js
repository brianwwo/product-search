const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        try {
            if (!event.queryStringParameters || !event.queryStringParameters.key) {
                resolve([]);
            } else {
                const key = event.queryStringParameters.key;
                docClient.query({
                    TableName: 'ProductCatelog',
                    KeyConditionExpression: 'Category = :v',
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