const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
  
exports.deterministicPartitionKey = (event) => {

  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = getCanditateFromEvent(event);

  if (candidate) {
    candidate = convertToString(candidate)
  } else {
    return TRIVIAL_PARTITION_KEY;
  }

 if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};



 const getCanditateFromEvent = (event) => { 
  if (event) {
    if (event.partitionKey) {
      return event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      return createHash(data);
    }
  }
}

 const convertToString = (candidate) => { 
    if (typeof candidate !== "string") {
      return JSON.stringify(candidate);
    } else {
      return candidate
    }
}

 const createHash = (data) => { 
   return crypto.createHash("sha3-512").update(data).digest("hex");
 }


exports.createHash = createHash;
exports.getCanditateFromEvent = getCanditateFromEvent;
exports.convertToString = convertToString;