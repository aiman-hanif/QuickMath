const commify = value => {
    if (value === "0") return value;
    let output = "";
    let decimal = "";
    let isNeg = false;
    if (value.includes('.')) {
        output = value.substring(0, value.indexOf('.'));
        decimal = value.substring(value.indexOf("."));
    }
    else {
        output = value;
    }
    if (parseFloat(output) < 0) {
        isNeg = true;
    }
    return parseFloat(output).toLocaleString() + decimal;

}

export default commify;