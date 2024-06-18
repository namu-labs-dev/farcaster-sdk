"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexStringToBytes = void 0;
const neverthrow_1 = require("neverthrow");
const errors_1 = require("./errors");
const viem_1 = require("viem");
const hexStringToBytes = (hex) => {
    return neverthrow_1.Result.fromThrowable((hex) => (0, viem_1.hexToBytes)(hex.startsWith("0x") ? hex : `0x${hex}`), (e) => new errors_1.HubError("unknown", e))(hex);
};
exports.hexStringToBytes = hexStringToBytes;
