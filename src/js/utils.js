export function camelCaseToLabel(str) {
  return str[0].toUpperCase() + str.substring(1).replace(/([A-Z])/g, " $1");
}

export async function rateLimited(name, delay, fn) {
  const lastCallKey = `lastCall_${name}`;
  const lastValueKey = `lastValue_${name}`;
  const lastCallTime = localStorage.getItem(lastCallKey);
  const now = Date.now();

  if (!lastCallTime || now - lastCallTime > delay) {
    const result = await fn();
    localStorage.setItem(lastCallKey, now);
    localStorage.setItem(
      lastValueKey,
      typeof result === "object" ? JSON.stringify(result) : result
    );
    return result;
  } else {
    const waitTime = delay - (now - lastCallTime);
    console.log(
      `Function ${name} is rate limited. Please wait ${waitTime} ms.`
    );

    let lastValue = localStorage.getItem(lastValueKey);
    try {
      var value = JSON.parse(lastValue);
    } catch (error) {
      var value = lastValue;
    }
    // console.log(value);
    return value;
  }
}

export function detectType(value) {
  if (value === "true" || value === "false")
    return { type: "boolean", value: value === "true" };
  else if (/^-?\d+$/.test(value))
    return { type: "integer", value: parseInt(value) };
  else if (/^-?\d+\.\d+$/.test(value))
    return { type: "float", value: parseFloat(value) };
  else return { type: "string", value: value };
}

export function parseVars(stdout, forcedType) {
  return stdout
    .trim()
    .replace(/^#.+\s|^\s/gm, "")
    .replace(/(^[^#]+)#.+\s/gm, "$1\n")
    .split("\n")
    .map((item) => {
      const [match, key, value] = item.match(/^\$(.+)\s*=\s*(.*)/);
      const type = detectType(value.trim());
      return {
        key: key.trim(),
        value: type.value,
        type: forcedType || type.type,
      };
    });
}
