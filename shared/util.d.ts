import { Movie } from "./types";
export declare const generateMovieItem: (movie: Movie) => {
    PutRequest: {
        Item: Record<string, import("@aws-sdk/client-dynamodb").AttributeValue>;
    };
};
export declare const generateBatch: (data: Movie[]) => {
    PutRequest: {
        Item: Record<string, import("@aws-sdk/client-dynamodb").AttributeValue>;
    };
}[];
