import { createProblem, getSimilarProblems } from "./src/mathProblem.js"

export const handler = async (event) => {
  // console.log(event)
  let response
  try {
    switch (event.routeKey) {
      case "POST /problem":
        response = await createProblem(event)
        break
      case "GET /problem":
        response = await getSimilarProblems(event)
        break
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`)
    }
    return response
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
}
