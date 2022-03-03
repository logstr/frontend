const STORAGE_PREFIX = "logstr-";

const getKey = (key) => `${STORAGE_PREFIX}${key}`;

function save(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  sessionStorage.setItem(getKey(key), value);
}

function get(key) {
  let value = sessionStorage.getItem(getKey(key));
  if (value) {
    try {
      value = JSON.parse(value);
    } catch (e) {}
  }

  return value;
}

export default {
  save,
  get,
  remove: (key) => sessionStorage.removeItem(getKey(key)),
};
