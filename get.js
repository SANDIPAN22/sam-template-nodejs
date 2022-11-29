const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1'})
const ddb = new AWS.DynamoDB.DocumentClient()

const tableName = process.env.TABLE_NAME

exports.handler = async(event) =>{

    const userid = event.pathParameters.userid

    var res = await ddb.get({
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise()

    if (res.Item){
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: res.Item
            })
        }
    }
    else{
        throw new Error ("User not found!!")
    }
    
}

