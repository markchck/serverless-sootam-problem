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
  return await putItem(putParams)
}

export const getProblems = async (event) => {
  const queryStringParameters = event.queryStringParameters
  const {
    year = undefined,
    month = undefined,
    source = undefined,
    type = undefined,
    number = undefined,
    chapter = undefined,
    unitName = undefined,
  } = queryStringParameters || {}

  let lastKey = null
  const getParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    IndexName: unitNameIndex,
    keyConditionExpression: "unitName = :pk and capter = :sk",
    ExpressionAttributeNames: {
      ":pk": unitName,
      ":sk": chapter,
    },
    ExclusiveStartKey: lastKey,
  }

  let request = []
  do {
    const { Items: items, LastEvaluatedKey: key } = await query(getParams)
    request.push(...items)
    lastKey = key
  } while (lastKey)
  console.log(request)
}
