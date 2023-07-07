import {createProblem} from './src/mathProblem.js'

export const handler = async (event) => {
  // console.log(event)
  let body
  try{
    switch (event.routeKey) {
      case 'POST /problem':
        await createProblem(event)
        return {
          statusCode: 201,
          body: "create success"
        }
      case 'GET /problem':
          body = await getProblems(event)
          break
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`)
      }
   
  }catch(error){
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }
}