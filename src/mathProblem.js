import {putItem, getItem} from '../lib/dynamoDB.js'

export const createProblem = async (event) => {
  console.log(event)
  const body = JSON.parse(event.body.toString('utf-8'))
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
      chapter: body.chapter,
      unitName: body.unitName,
    },
  }
  return await putItem(putParams)
}

// export const getProblems = async (event) => {
  // const body = JSON.parse(event.body.toString('utf-8'))
  // const putParams = {
  //   TableName: process.env.DYNAMODB_SOOTAM_TABLE,
  //   Item: {
  //     pk : 'problem',
  //     sk : body.problemId,
  //     year: body.year,
  //     month: body.month,
  //     source: body.source,
  //     type: body.type,
  //     number: body.number,
  //   },
//   }
//   return await dynamoDb.put(putParams).promise()
// }