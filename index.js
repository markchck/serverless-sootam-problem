import {createProblem} from './src/createProblem.js'

export const handler = async (event) => {
  // console.log(event.rawPath)
  const body = JSON.parse(event.body.toString('utf-8'))
  switch (event.rawPath) {
    case '/create-problem':
      return await createProblem(body)
    default:
      return {
        statusCode: 404,
      }
    }
}