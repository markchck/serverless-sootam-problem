import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb"
const dynamoDb = new DynamoDBClient()

export const query = async (params) => {
  const command = new QueryCommand(params)
  return await dynamoDb.send(command)
}

export const putItem = async (params) => {
  const command = new PutCommand(params)
  return await dynamoDb.send(command)
}

export const getItem = async (params) => {
  const command = new GetCommand(params)
  const data = await dynamoDb.send(command)
  if (!Object.keys(data).length) {
    return null
  }
  return data.Item
}
