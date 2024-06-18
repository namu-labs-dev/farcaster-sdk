import { Result } from "neverthrow";
import { HubError, HubResult } from "./errors";
import { hexToBytes } from 'viem';

export const hexStringToBytes = (hex: string): HubResult<Uint8Array> => {
    return Result.fromThrowable(
      (hex: string) => hexToBytes(hex.startsWith("0x") ? (hex as `0x${string}`) : `0x${hex}`),
      (e) => new HubError("unknown", e as Error),
    )(hex);
  };