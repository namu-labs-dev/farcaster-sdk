import { Result } from "neverthrow";
interface HubErrorOpts {
    message: string;
    cause: Error | HubError;
    presentable: boolean;
}
export declare const isHubError: (e: any) => e is HubError;
/**
 * HubError should be used to construct all types exceptions in the Hub.
 *
 * A HubError is instantiated with a HubErrorCode that classifies the error, a context object that
 * provides additional information about the error. The context object can be a string, an Error,
 * or both and also accepts additional parameters to classify the HubError. HubErrors should never
 * be thrown directly and always be returned using neverthrow's Result type.
 */
export declare class HubError extends Error {
    readonly errCode: HubErrorCode;
    readonly presentable: boolean;
    /**
     * @param errCode - the HubError code for this message
     * @param context - a message, another Error, or a HubErrorOpts
     */
    constructor(errCode: HubErrorCode, context: Partial<HubErrorOpts> | string | Error);
}
/**
 * HubErrorCode defines all the types of errors that can be raised in the Hub.
 *
 * A string union type is chosen over an enumeration since TS enums are unusual types that generate
 * javascript code and may cause downstream issues. See:
 * https://www.executeprogram.com/blog/typescript-features-to-avoid
 */
export type HubErrorCode = "unauthenticated" | "unauthorized" | "bad_request" | "bad_request.parse_failure" | "bad_request.invalid_param" | "bad_request.validation_failure" | "bad_request.duplicate" | "bad_request.conflict" | "bad_request.prunable" | "not_found" | "not_implemented" | "not_implemented.deprecated" | "unavailable" | "unavailable.network_failure" | "unavailable.storage_failure" | "unknown";
/** Type alias for shorthand when handling errors */
export type HubResult<T> = Result<T, HubError>;
export type HubAsyncResult<T> = Promise<HubResult<T>>;
export {};
