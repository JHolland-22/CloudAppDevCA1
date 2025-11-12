import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
const ddbDocClient = createDDbDocClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {

  console.log("### DELETE LAMBDA CALLED ###");
  console.log("event:", event);
  try {
    // Print Event
 const parameters  = event?.pathParameters;
    const movieId = parameters?.movieId ;

    if (!movieId) {
      return {
        statusCode: 500,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message: "Missing movie id" }),
      };
    }


    const commandOutput = await ddbDocClient.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: {PK: `m.${movieId}`,
      SK: "xxxx" }
      })
    );
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: "Movie deleted" }),
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
