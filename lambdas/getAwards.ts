import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand,QueryCommand } from "@aws-sdk/lib-dynamodb";
import { QueryParameterMatch } from "aws-cdk-lib/aws-appmesh";

const ddbDocClient = createDDbDocClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {     
  try {
    console.log("[EVENT]", JSON.stringify(event));

    const parameters = event.pathParameters;
    const movieId = parameters?.movieId ? parseInt(parameters.movieId) : undefined;
    const actorId = parameters?.actorId ? parseInt(parameters.actorId) : undefined;
    const award = QueryParams.award 


    if (!movieId || !actorId||!award) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Missing movie id and actor Id" }),
      };
    }


    const commandOutput = await ddbDocClient.send(
      new QueryCommand({
      TableName: process.env.CAST_TABLE_NAME,
      KeyConditionExpression: "movieId = :movieId",
      FilterExpression: "actorId = :actorId AND award =:award",
      ExpressionAttributeValues: {
        ":movieId": movieId,
        ":actorId": actorId,
        ":award": award
          } 
      })
    );


    console.log("GetCommand response: ", commandOutput);
    if (!commandOutput.Items) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Invalid actor Id" }),
      };
    }
    const body = {
      data: commandOutput.Items,
    };


    // Return Response
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ error }),
    };
  }
};

function createDDbDocClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = {
    wrapNumbers: false,
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
