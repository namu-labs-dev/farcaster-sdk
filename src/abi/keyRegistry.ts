export const keyRegistryAbi = [{ "type": "constructor", "inputs": [{ "name": "_idRegistry", "type": "address", "internalType": "address" }, { "name": "_migrator", "type": "address", "internalType": "address" }, { "name": "_initialOwner", "type": "address", "internalType": "address" }, { "name": "_maxKeysPerFid", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "REMOVE_TYPEHASH", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "VERSION", "inputs": [], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, { "type": "function", "name": "acceptOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "add", "inputs": [{ "name": "fidOwner", "type": "address", "internalType": "address" }, { "name": "keyType", "type": "uint32", "internalType": "uint32" }, { "name": "key", "type": "bytes", "internalType": "bytes" }, { "name": "metadataType", "type": "uint8", "internalType": "uint8" }, { "name": "metadata", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "addGuardian", "inputs": [{ "name": "guardian", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "bulkAddKeysForMigration", "inputs": [{ "name": "items", "type": "tuple[]", "internalType": "struct IKeyRegistry.BulkAddData[]", "components": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "keys", "type": "tuple[]", "internalType": "struct IKeyRegistry.BulkAddKey[]", "components": [{ "name": "key", "type": "bytes", "internalType": "bytes" }, { "name": "metadata", "type": "bytes", "internalType": "bytes" }] }] }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "bulkResetKeysForMigration", "inputs": [{ "name": "items", "type": "tuple[]", "internalType": "struct IKeyRegistry.BulkResetData[]", "components": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "keys", "type": "bytes[]", "internalType": "bytes[]" }] }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "domainSeparatorV4", "inputs": [], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "eip712Domain", "inputs": [], "outputs": [{ "name": "fields", "type": "bytes1", "internalType": "bytes1" }, { "name": "name", "type": "string", "internalType": "string" }, { "name": "version", "type": "string", "internalType": "string" }, { "name": "chainId", "type": "uint256", "internalType": "uint256" }, { "name": "verifyingContract", "type": "address", "internalType": "address" }, { "name": "salt", "type": "bytes32", "internalType": "bytes32" }, { "name": "extensions", "type": "uint256[]", "internalType": "uint256[]" }], "stateMutability": "view" }, { "type": "function", "name": "freezeKeyGateway", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "gatewayFrozen", "inputs": [], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "gracePeriod", "inputs": [], "outputs": [{ "name": "", "type": "uint24", "internalType": "uint24" }], "stateMutability": "view" }, { "type": "function", "name": "guardians", "inputs": [{ "name": "guardian", "type": "address", "internalType": "address" }], "outputs": [{ "name": "isGuardian", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "hashTypedDataV4", "inputs": [{ "name": "structHash", "type": "bytes32", "internalType": "bytes32" }], "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }], "stateMutability": "view" }, { "type": "function", "name": "idRegistry", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "contract IdRegistryLike" }], "stateMutability": "view" }, { "type": "function", "name": "isMigrated", "inputs": [], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "keyAt", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }, { "name": "index", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }], "stateMutability": "view" }, { "type": "function", "name": "keyDataOf", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "key", "type": "bytes", "internalType": "bytes" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct IKeyRegistry.KeyData", "components": [{ "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }, { "name": "keyType", "type": "uint32", "internalType": "uint32" }] }], "stateMutability": "view" }, { "type": "function", "name": "keyGateway", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "keys", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "key", "type": "bytes", "internalType": "bytes" }], "outputs": [{ "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }, { "name": "keyType", "type": "uint32", "internalType": "uint32" }], "stateMutability": "view" }, { "type": "function", "name": "keysOf", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }], "outputs": [{ "name": "", "type": "bytes[]", "internalType": "bytes[]" }], "stateMutability": "view" }, { "type": "function", "name": "keysOf", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }, { "name": "startIdx", "type": "uint256", "internalType": "uint256" }, { "name": "batchSize", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "page", "type": "bytes[]", "internalType": "bytes[]" }, { "name": "nextIdx", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "maxKeysPerFid", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "migrate", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "migratedAt", "inputs": [], "outputs": [{ "name": "", "type": "uint40", "internalType": "uint40" }], "stateMutability": "view" }, { "type": "function", "name": "migrator", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "nonces", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "pause", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "paused", "inputs": [], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "pendingOwner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "remove", "inputs": [{ "name": "key", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "removeFor", "inputs": [{ "name": "fidOwner", "type": "address", "internalType": "address" }, { "name": "key", "type": "bytes", "internalType": "bytes" }, { "name": "deadline", "type": "uint256", "internalType": "uint256" }, { "name": "sig", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "removeGuardian", "inputs": [{ "name": "guardian", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setIdRegistry", "inputs": [{ "name": "_idRegistry", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setKeyGateway", "inputs": [{ "name": "_keyGateway", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setMaxKeysPerFid", "inputs": [{ "name": "_maxKeysPerFid", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setMigrator", "inputs": [{ "name": "_migrator", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "setValidator", "inputs": [{ "name": "keyType", "type": "uint32", "internalType": "uint32" }, { "name": "metadataType", "type": "uint8", "internalType": "uint8" }, { "name": "validator", "type": "address", "internalType": "contract IMetadataValidator" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "totalKeys", "inputs": [{ "name": "fid", "type": "uint256", "internalType": "uint256" }, { "name": "state", "type": "uint8", "internalType": "enum IKeyRegistry.KeyState" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "transferOwnership", "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "unpause", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "useNonce", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "validators", "inputs": [{ "name": "keyType", "type": "uint32", "internalType": "uint32" }, { "name": "metadataType", "type": "uint8", "internalType": "uint8" }], "outputs": [{ "name": "validator", "type": "address", "internalType": "contract IMetadataValidator" }], "stateMutability": "view" }, { "type": "event", "name": "Add", "inputs": [{ "name": "fid", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "keyType", "type": "uint32", "indexed": true, "internalType": "uint32" }, { "name": "key", "type": "bytes", "indexed": true, "internalType": "bytes" }, { "name": "keyBytes", "type": "bytes", "indexed": false, "internalType": "bytes" }, { "name": "metadataType", "type": "uint8", "indexed": false, "internalType": "uint8" }, { "name": "metadata", "type": "bytes", "indexed": false, "internalType": "bytes" }], "anonymous": false }, { "type": "event", "name": "Add", "inputs": [{ "name": "guardian", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "AdminReset", "inputs": [{ "name": "fid", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "key", "type": "bytes", "indexed": true, "internalType": "bytes" }, { "name": "keyBytes", "type": "bytes", "indexed": false, "internalType": "bytes" }], "anonymous": false }, { "type": "event", "name": "EIP712DomainChanged", "inputs": [], "anonymous": false }, { "type": "event", "name": "FreezeKeyGateway", "inputs": [{ "name": "keyGateway", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "Migrated", "inputs": [{ "name": "migratedAt", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferStarted", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "Paused", "inputs": [{ "name": "account", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "Remove", "inputs": [{ "name": "fid", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "key", "type": "bytes", "indexed": true, "internalType": "bytes" }, { "name": "keyBytes", "type": "bytes", "indexed": false, "internalType": "bytes" }], "anonymous": false }, { "type": "event", "name": "Remove", "inputs": [{ "name": "guardian", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "SetIdRegistry", "inputs": [{ "name": "oldIdRegistry", "type": "address", "indexed": false, "internalType": "address" }, { "name": "newIdRegistry", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "SetKeyGateway", "inputs": [{ "name": "oldKeyGateway", "type": "address", "indexed": false, "internalType": "address" }, { "name": "newKeyGateway", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "SetMaxKeysPerFid", "inputs": [{ "name": "oldMax", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "newMax", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "SetMigrator", "inputs": [{ "name": "oldMigrator", "type": "address", "indexed": false, "internalType": "address" }, { "name": "newMigrator", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "SetValidator", "inputs": [{ "name": "keyType", "type": "uint32", "indexed": false, "internalType": "uint32" }, { "name": "metadataType", "type": "uint8", "indexed": false, "internalType": "uint8" }, { "name": "oldValidator", "type": "address", "indexed": false, "internalType": "address" }, { "name": "newValidator", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "event", "name": "Unpaused", "inputs": [{ "name": "account", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false }, { "type": "error", "name": "AlreadyMigrated", "inputs": [] }, { "type": "error", "name": "ExceedsMaximum", "inputs": [] }, { "type": "error", "name": "GatewayFrozen", "inputs": [] }, { "type": "error", "name": "InvalidAccountNonce", "inputs": [{ "name": "account", "type": "address", "internalType": "address" }, { "name": "currentNonce", "type": "uint256", "internalType": "uint256" }] }, { "type": "error", "name": "InvalidKeyType", "inputs": [] }, { "type": "error", "name": "InvalidMaxKeys", "inputs": [] }, { "type": "error", "name": "InvalidMetadata", "inputs": [] }, { "type": "error", "name": "InvalidMetadataType", "inputs": [] }, { "type": "error", "name": "InvalidShortString", "inputs": [] }, { "type": "error", "name": "InvalidSignature", "inputs": [] }, { "type": "error", "name": "InvalidState", "inputs": [] }, { "type": "error", "name": "OnlyGuardian", "inputs": [] }, { "type": "error", "name": "OnlyMigrator", "inputs": [] }, { "type": "error", "name": "PermissionRevoked", "inputs": [] }, { "type": "error", "name": "SignatureExpired", "inputs": [] }, { "type": "error", "name": "StringTooLong", "inputs": [{ "name": "str", "type": "string", "internalType": "string" }] }, { "type": "error", "name": "Unauthorized", "inputs": [] }, { "type": "error", "name": "ValidatorNotFound", "inputs": [{ "name": "keyType", "type": "uint32", "internalType": "uint32" }, { "name": "metadataType", "type": "uint8", "internalType": "uint8" }] }]