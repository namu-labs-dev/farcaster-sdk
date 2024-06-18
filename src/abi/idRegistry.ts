export const idRegistryAbi = [{"type":"constructor","inputs":[{"name":"_migrator","type":"address","internalType":"address"},{"name":"_initialOwner","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"CHANGE_RECOVERY_ADDRESS_TYPEHASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"TRANSFER_AND_CHANGE_RECOVERY_TYPEHASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"TRANSFER_TYPEHASH","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"VERSION","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"acceptOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"bulkRegisterIds","inputs":[{"name":"ids","type":"tuple[]","internalType":"struct IIdRegistry.BulkRegisterData[]","components":[{"name":"fid","type":"uint24","internalType":"uint24"},{"name":"custody","type":"address","internalType":"address"},{"name":"recovery","type":"address","internalType":"address"}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"bulkRegisterIdsWithDefaultRecovery","inputs":[{"name":"ids","type":"tuple[]","internalType":"struct IIdRegistry.BulkRegisterDefaultRecoveryData[]","components":[{"name":"fid","type":"uint24","internalType":"uint24"},{"name":"custody","type":"address","internalType":"address"}]},{"name":"recovery","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"bulkResetIds","inputs":[{"name":"ids","type":"uint24[]","internalType":"uint24[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"changeRecoveryAddress","inputs":[{"name":"recovery","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"changeRecoveryAddressFor","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"recovery","type":"address","internalType":"address"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"custodyOf","inputs":[{"name":"fid","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"custody","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"domainSeparatorV4","inputs":[],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"eip712Domain","inputs":[],"outputs":[{"name":"fields","type":"bytes1","internalType":"bytes1"},{"name":"name","type":"string","internalType":"string"},{"name":"version","type":"string","internalType":"string"},{"name":"chainId","type":"uint256","internalType":"uint256"},{"name":"verifyingContract","type":"address","internalType":"address"},{"name":"salt","type":"bytes32","internalType":"bytes32"},{"name":"extensions","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},{"type":"function","name":"freezeIdGateway","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"gatewayFrozen","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"gracePeriod","inputs":[],"outputs":[{"name":"","type":"uint24","internalType":"uint24"}],"stateMutability":"view"},{"type":"function","name":"guardians","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[{"name":"isGuardian","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"hashTypedDataV4","inputs":[{"name":"structHash","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"idCounter","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"idGateway","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"idOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"fid","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"isMigrated","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"migrate","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"migratedAt","inputs":[],"outputs":[{"name":"","type":"uint40","internalType":"uint40"}],"stateMutability":"view"},{"type":"function","name":"migrator","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"nonces","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"paused","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"pendingOwner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"recover","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"recoverFor","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"recoveryDeadline","type":"uint256","internalType":"uint256"},{"name":"recoverySig","type":"bytes","internalType":"bytes"},{"name":"toDeadline","type":"uint256","internalType":"uint256"},{"name":"toSig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"recoveryOf","inputs":[{"name":"fid","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"recovery","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"register","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"recovery","type":"address","internalType":"address"}],"outputs":[{"name":"fid","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"removeGuardian","inputs":[{"name":"guardian","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setIdCounter","inputs":[{"name":"_counter","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setIdGateway","inputs":[{"name":"_idGateway","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setMigrator","inputs":[{"name":"_migrator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferAndChangeRecovery","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"recovery","type":"address","internalType":"address"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferAndChangeRecoveryFor","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"recovery","type":"address","internalType":"address"},{"name":"fromDeadline","type":"uint256","internalType":"uint256"},{"name":"fromSig","type":"bytes","internalType":"bytes"},{"name":"toDeadline","type":"uint256","internalType":"uint256"},{"name":"toSig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferFor","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"fromDeadline","type":"uint256","internalType":"uint256"},{"name":"fromSig","type":"bytes","internalType":"bytes"},{"name":"toDeadline","type":"uint256","internalType":"uint256"},{"name":"toSig","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unpause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"useNonce","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"verifyFidSignature","inputs":[{"name":"custodyAddress","type":"address","internalType":"address"},{"name":"fid","type":"uint256","internalType":"uint256"},{"name":"digest","type":"bytes32","internalType":"bytes32"},{"name":"sig","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"isValid","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"Add","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"AdminReset","inputs":[{"name":"fid","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ChangeRecoveryAddress","inputs":[{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"recovery","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"EIP712DomainChanged","inputs":[],"anonymous":false},{"type":"event","name":"FreezeIdGateway","inputs":[{"name":"idGateway","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Migrated","inputs":[{"name":"migratedAt","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferStarted","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Recover","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Register","inputs":[{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"recovery","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Remove","inputs":[{"name":"guardian","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SetIdCounter","inputs":[{"name":"oldCounter","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newCounter","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"SetIdGateway","inputs":[{"name":"oldIdGateway","type":"address","indexed":false,"internalType":"address"},{"name":"newIdGateway","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"SetMigrator","inputs":[{"name":"oldMigrator","type":"address","indexed":false,"internalType":"address"},{"name":"newMigrator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"error","name":"AlreadyMigrated","inputs":[]},{"type":"error","name":"GatewayFrozen","inputs":[]},{"type":"error","name":"HasId","inputs":[]},{"type":"error","name":"HasNoId","inputs":[]},{"type":"error","name":"InvalidAccountNonce","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"currentNonce","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"InvalidShortString","inputs":[]},{"type":"error","name":"InvalidSignature","inputs":[]},{"type":"error","name":"OnlyGuardian","inputs":[]},{"type":"error","name":"OnlyMigrator","inputs":[]},{"type":"error","name":"PermissionRevoked","inputs":[]},{"type":"error","name":"SignatureExpired","inputs":[]},{"type":"error","name":"StringTooLong","inputs":[{"name":"str","type":"string","internalType":"string"}]},{"type":"error","name":"Unauthorized","inputs":[]}]