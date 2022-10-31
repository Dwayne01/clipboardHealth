const {deterministicPartitionKey} = require("./dpk");

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey({ partitionKey: "foo" }));
console.log(deterministicPartitionKey({partitionKey: null}));