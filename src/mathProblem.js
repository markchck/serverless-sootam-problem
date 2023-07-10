import { putItem } from "../lib/dynamoDB.js"

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

import AWS from "aws-sdk"
const docClient = new AWS.DynamoDB.DocumentClient()

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
    IndexName: "unitNameIndex",
    KeyConditionExpression: "#unitName = :unitName",
    ExpressionAttributeNames: {
      "#unitName": "unitName",
    },
    ExpressionAttributeValues: {
      ":unitName": unitName,
    },
  }

  docClient
    .query(getParams)
    .promise()
    .then((res) => {
      res.Items.forEach(function (item) {
        console.log(item)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
