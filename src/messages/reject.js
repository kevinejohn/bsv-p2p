const {
  utils: { BufferReader },
} = require("bsv-minimal");

function read(payload) {
  const br = new BufferReader(payload);
  const o = {};
  o.message = br.readVarintNum().toString();
  o.ccode = br.readUInt8();
  o.reason = br.readVarintNum().toString();
  if (!br.eof()) {
    o.data = br.readReverse(32);
  }

  return o;
}

module.exports = {
  read,
};
