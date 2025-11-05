import { Movie, MovieCast, Award } from "./types";
type Entity = Movie | MovieCast | Award;
export declare const generateItem: (entity: Entity) => {
    PutRequest: {
        Item: Record<string, import("@aws-sdk/client-dynamodb").AttributeValue>;
    };
};
export declare const generateBatch: (data: Entity[]) => {
    PutRequest: {
        Item: Record<string, import("@aws-sdk/client-dynamodb").AttributeValue>;
    };
}[];
export {};
