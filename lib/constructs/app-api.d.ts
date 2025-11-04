import { Construct } from "constructs";
type AppApiProps = {
    userPoolId: string;
    userPoolClientId: string;
};
export declare class AppApi extends Construct {
    constructor(scope: Construct, id: string, props: AppApiProps);
}
export {};
