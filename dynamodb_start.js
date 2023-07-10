import AWS from "aws-sdk"
AWS.config.update({
  region: "ap-northeast-2",
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com",
})
const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

//! GSI 조회
const params = {
  TableName: "sampleTable",
  IndexName: "IndexOrderCount",
  KeyConditionExpression: "#type = :type and #oc >= :orderCount",
  ExpressionAttributeNames: {
    "#type": "type",
    "#oc": "orderCount",
  },
  ExpressionAttributeValues: {
    ":type": "Western",
    ":orderCount": 2,
  },
}
docClient
  .query(params)
  .promise()
  .then((res) => {
    res.Items.forEach(function (item) {
      console.log(item.type, item.name, item.price, item.orderCount)
    })
  })
  .catch((err) => {
    console.log(err)
  })

//! GSI 생성 (기존 테이블에서 업데이트)
// const params = {
//   TableName: "sampleTable",
//   AttributeDefinitions: [
//     { AttributeName: "type", AttributeType: "S" },
//     { AttributeName: "orderCount", AttributeType: "N" },
//   ],
//   GlobalSecondaryIndexUpdates: [
//     // 글로벌 인덱스를 정의합니다.
//     {
//       Create: {
//         IndexName: "IndexOrderCount", // 인덱스 이름을 정합니다.
//         KeySchema: [
//           { AttributeName: "type", KeyType: "HASH" },
//           { AttributeName: "orderCount", KeyType: "RANGE" },
//         ],
//         Projection: {
//           ProjectionType: "ALL",
//         },
//         ProvisionedThroughput: {
//           ReadCapacityUnits: 1,
//           WriteCapacityUnits: 1,
//         },
//       },
//     },
//   ],
// }

// dynamodb
//   .updateTable(params)
//   .promise() // 테이블을 업데이트합니다. 새로 만들지 않습니다.
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//! query
// const params = {
//   TableName: "sampleTable",
//   KeyConditionExpression: "#type = :type",
//   ExpressionAttributeNames: {
//     "#type": "type",
//   },
//   ExpressionAttributeValues: {
//     ":type": "Western",
//   },
// }
// docClient
//   .query(params)
//   .promise()
//   .then((req) => {
//     console.log(req)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//! get
// const params = {
//   TableName: "sampleTable",
//   Key: {
//     type: "Western",
//     name: "Carbonara",
//   },
// }
// docClient
//   .get(params)
//   .promise()
//   .then((req) => {
//     console.log(req)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//! put
// const tableName = "sampleTable"
// const params = {
//   TableName: tableName,
//   Items: {
//     type: "Western",
//     name: "Carbonara",
//     price: 13000,
//     ingredients: {
//       egg: "1",
//       spaghetti: "90g",
//       garlic: "1",
//       bacon: "50g",
//     },
//   },
// }

// docClient
//   .put(params)
//   .promise()
//   .then((req) => {
//     console.log(req)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
