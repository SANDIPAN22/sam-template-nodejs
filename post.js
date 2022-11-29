const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1'})
const ddb = new AWS.DynamoDB.DocumentClient()

const tableName = process.env.TABLE_NAME

exports.handler = async(event) =>{
    

    
    const userid = event.pathParameters.userid
    const {firstname, lastname, email, age} = JSON.parse(event.body)

    var params = {
        TableName: tableName,
        Item: {
            userid,
            firstname,
            lastname,
            email,
            age
        }
    }

    await ddb.put(params).promise()
    
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data inserted/updated successfully"
        })
    }
}

