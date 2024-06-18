"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubError = exports.isHubError = void 0;
// biome-ignore lint/suspicious/noExplicitAny: legacy code, avoid using ignore for new code
const isHubError = (e) => {
    return typeof e.errCode !== "undefined";
};
exports.isHubError = isHubError;
/**
 * HubError should be used to construct all types exceptions in the Hub.
 *
 * A HubError is instantiated with a HubErrorCode that classifies the error, a context object that
 * provides additional information about the error. The context object can be a string, an Error,
 * or both and also accepts additional parameters to classify the HubError. HubErrors should never
 * be thrown directly and always be returned using neverthrow's Result type.
 */
class HubError extends Error {
    /* Hub classification of error types */
    errCode;
    /* Indicates if if error message can be presented to the user */
    presentable = false;
    /**
     * @param errCode - the HubError code for this message
     * @param context - a message, another Error, or a HubErrorOpts
     */
    constructor(errCode, context) {
        let parsedContext;
        if (typeof context === "string") {
            parsedContext = { message: context };
        }
        else if (context instanceof Error) {
            parsedContext = { cause: context, message: context.message };
        }
        else {
            parsedContext = context;
        }
        if (!parsedContext.message) {
            parsedContext.message = parsedContext.cause?.message || "";
        }
        super(parsedContext.message, { cause: parsedContext.cause });
        this.name = "HubError";
        this.errCode = errCode;
    }
}
exports.HubError = HubError;
