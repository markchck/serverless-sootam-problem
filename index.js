import {
  createProblem,
  getSimilarProblems,
  getSingleProblem,
} from "./src/mathProblem.js"

export const handler = async (event) => {
  // console.log(event)
  let response
  try {
    switch (event.routeKey) {
      case "POST /problem":
        response = await createProblem(event)
        break
      case "GET /getSimilarProblems":
        response = await getSimilarProblems(event)
        break
      case "GET /getSingleProblem":
        response = await getSingleProblem(event)
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
