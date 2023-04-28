function convertNumber(n, fromBase, toBase) {
    if (fromBase === void 0) {
      fromBase = 10;
    }
    if (toBase === void 0) {
      toBase = 10;
    }
    return parseInt(n.toString(), fromBase).toString(toBase);
  }
  console.log(
    convertNumber("f", 16, 10),
    convertNumber("f", 16, 2),
    convertNumber("1111", 2, 10),
    convertNumber("1111", 2, 16)
  );

  console.log('convertNamber: ', convertNumber("2",16,2))