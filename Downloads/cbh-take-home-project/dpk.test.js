const { deterministicPartitionKey, createHash, getCanditateFromEvent, convertToString } = require("./dpk");

const longCandidate = '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e258540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2'

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal 'foo' when given input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "foo"});
    expect(trivialKey).toBe("foo");
  });
  it("Returns the hash when given input but no partitionKey", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: null });
    const hashString = '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2'
    expect(trivialKey).toBe(hashString);
  });
   it("Returns a longer hash when a candidate is greate than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: longCandidate });
    const hashString = '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e258540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2'
    expect(trivialKey).toBe(hashString);
  });
});
  
describe("createHash", () => {
  it("creates a hash when a string is passed", () => {
    const trivialKey = createHash('foo');
    const hashString = '4bca2b137edc580fe50a88983ef860ebaca36c857b1f492839d6d7392452a63c82cbebc68e3b70a2a1480b4bb5d437a7cba6ecf9d89f9ff3ccd14cd6146ea7e7'
    expect(trivialKey).toBe(hashString);
  });
});

describe("getCanditateFromEvent", () => {
  it("returns candidate when an event with partitionKey is passed", () => {
    const trivialKey = getCanditateFromEvent({partitionKey: "foo"});
    expect(trivialKey).toBe('foo');
  });
  it("returns undefined when an event is not passed", () => {
    const trivialKey = getCanditateFromEvent();
    expect(trivialKey).toBe(undefined);
  });
});

describe("convertToString", () => {
  it("returns candidate when an event with partitionKey is passed", () => {
    const trivialKey = convertToString("foo");
    expect(trivialKey).toBe('foo');
  });
  it("returns undefined when an event is not passed", () => {
    const trivialKey = convertToString(0);
    expect(trivialKey).toBe('0');
  });
});