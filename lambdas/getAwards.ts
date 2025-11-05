import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand,QueryCommand,ScanCommand, ScanCommandInput} from "@aws-sdk/lib-dynamodb";
import { QueryParameterMatch } from "aws-cdk-lib/aws-appmesh";
import { Table } from "aws-cdk-lib/aws-dynamodb";

const ddbDocClient = createDDbDocClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {     
  try {
    console.log("[EVENT]", JSON.stringify(event));
    const queryParams = event.queryStringParameters;
    const movieId = queryParams?.movie ? parseInt(queryParams.movie) : undefined;
    const actorId = queryParams?.actor ? parseInt(queryParams.actor) : undefined;
    const awardBody = queryParams?.awardBody;

    if (!movieId && !actorId && !awardBody) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Missing movie id and actor Id" }),
      };
    }

    let commandInput: ScanCommandInput={
        TableName: process.env.AWARDS_TABLE,
    };

    if (movieId&&awardBody){
        commandInput = {
            ...commandInput,
            FilterExpression: "awardId=:a AND body =:b",
            ExpressionAttributeValues:{
                ":a" :movieId,
                ":b":awardBody,
            },
        };
    } else if (actorId&&awardBody){
        commandInput = {
            ...commandInput,
            FilterExpression: "awardId=:a AND body =:b",
            ExpressionAttributeValues:{
                ":a" :actorId,
                ":b":awardBody,
            },
        };

    }else if (awardBody)  {
        commandInput = {
            ...commandInput,
            FilterExpression: "body =:b",
            ExpressionAttributeValues:{
                ":b":awardBody,
            },
        };

    }

    const commandOutput=await ddbDocClient.send(new ScanCommand(commandInput));

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
