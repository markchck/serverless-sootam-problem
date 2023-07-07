import AWS from 'aws-sdk'

export const createProblem = async (body) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const putParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    Item: {
      pk : 'problem',
      sk : body.problemId,
      year: body.year,
      month: body.month,
      source: body.source,
      type: body.type,
      number: body.number,
    },
  }
  await dynamoDb.put(putParams).promise()
  return {
    statusCode: 201,
  } 
}