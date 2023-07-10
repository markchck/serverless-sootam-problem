import { putItem, query } from "../lib/dynamoDB.js"

export const createProblem = async (event) => {
  // console.log(event)
  const body = JSON.parse(event.body.toString("utf-8"))
  const putParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    Item: {
      pk: "problem",
      sk: body?.problemId,
      year: body?.year,
      month: body?.month,
      source: body?.source,
      type: body?.type,
      number: body?.number,
      chapter: body?.chapter,
      unitName: body?.unitName,
    },
  }
  await putItem(putParams)
  return {
    statusCode: 201,
    body: "create success",
  }
}

export const getProblems = async (event) => {
  const { queryStringParameters = undefined } = event
  const {
    year = undefined,
    month = undefined,
    source = undefined,
    type = undefined,
    number = undefined,
    chapter = undefined,
    unitName = undefined,
  } = queryStringParameters

  const getParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    IndexName: "unitNameIndex",
    KeyConditionExpression: "#unitName = :unitName",
    ExpressionAttributeNames: {
      "#unitName": "unitName",
    },
    ExpressionAttributeValues: {
      ":unitName": unitName,
    },
  }
  const { Items } = await query(getParams)

  return {
    statusCode: 200,
    body: JSON.stringify(Items),
  }
}
