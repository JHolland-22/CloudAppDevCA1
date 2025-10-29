import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
export declare class CognitoStack extends cdk.Stack {
    private auth;
    private userPoolId;
    private userPoolClientId;
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
    private addAuthRoute;
}
