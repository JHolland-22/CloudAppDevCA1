import { APIGatewayRequestAuthorizerEvent, APIGatewayAuthorizerEvent, PolicyDocument, APIGatewayProxyEvent, StatementEffect } from "aws-lambda";
export type CookieMap = {
    [key: string]: string;
} | undefined;
export type JwtToken = {
    sub: string;
    email: string;
} | null;
export type Jwk = {
    keys: {
        alg: string;
        e: string;
        kid: string;
        kty: string;
        n: string;
        use: string;
    }[];
};
export declare const parseCookies: (event: APIGatewayRequestAuthorizerEvent | APIGatewayProxyEvent) => {
    [key: string]: string;
};
export declare const verifyToken: (token: string, userPoolId: string | undefined, region: string) => Promise<JwtToken>;
export declare const createPolicy: (event: APIGatewayAuthorizerEvent, effect: StatementEffect) => PolicyDocument;
