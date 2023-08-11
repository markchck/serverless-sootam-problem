import { putItem, query } from "../lib/dynamoDB.js"

export const createProblem = async (event) => {
  // console.log(event)
  const body = JSON.parse(event.body.toString("utf-8"))
  const putParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    Item: {
      pk: "problem",
      sk: `problemId#${problemId}`,
      year: body?.year,
      month: body?.month,
      number: body?.number,
      successRate: body?.successRate,
      problemImage: body?.problemImage,
      solutionImage: body?.solutionImage,
      answer: body?.answer,
      testType: body?.testType,
      copyright: body?.copyright,
      unitId: body?.unitId,
      unitName: body?.unitName,
      chapter: body?.chapter,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
  await putItem(putParams)
  return {
    statusCode: 201,
    body: "create success",
  }
}

export const getSimilarProblems = async (event) => {
  const { queryStringParameters = undefined } = event
  const { chapter = "", unitName = "" } = queryStringParameters

  const getParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    IndexName: "unitNameIndex",
    KeyConditionExpression: "#unitName = :unitName and #chapter = :chapter",
    ExpressionAttributeNames: {
      "#unitName": "unitName",
      "#chapter": "chapter",
    },
    ExpressionAttributeValues: {
      ":unitName": unitName,
      ":chapter": chapter,
    },
  }
  const { Items } = await query(getParams)

  return {
    statusCode: 200,
    body: JSON.stringify(Items),
  }
}

export const getSingleProblem = async (event) => {
  const { queryStringParameters = undefined } = event
  const {
    year = "",
    month = "",
    copyright = "",
    testType = "",
    number = "",
  } = queryStringParameters

  const getParams = {
    TableName: process.env.DYNAMODB_SOOTAM_TABLE,
    KeyConditionExpression: "pk = :pk",
    FilterExpression:
      "#problemYear = :year AND #problemMonth = :month AND #problemNumber = :number AND testType = :testType AND copyright = :copyright",
    ExpressionAttributeNames: {
      "#problemYear": "year",
      "#problemMonth": "month",
      "#problemNumber": "number",
    },
    ExpressionAttributeValues: {
      ":pk": "problem",
      ":year": year,
      ":month": month,
      ":number": number,
      ":testType": testType,
      ":copyright": copyright,
    },
  }
  const { Items } = await query(getParams)

  return {
    statusCode: 200,
    body: JSON.stringify(Items),
  }
}
