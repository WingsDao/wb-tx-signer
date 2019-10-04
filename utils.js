const sortObject = function sortObject(obj) {
    if (obj === null) {
        return null;
    }

    if (typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(v => sortObject(v));
    }

    const sortedKeys = Object.keys(obj).sort();
    const result = {};

    sortedKeys.forEach(key => {
        result[key] = sortObject(obj[key]);
    });

    return result;
};

module.exports = exports = {
    sortObject,
};
