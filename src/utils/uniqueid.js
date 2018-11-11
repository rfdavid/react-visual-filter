var idCounter = 0;

export function setIdCounter(value) {
  idCounter = value;
}

export function uniqueId(prefix) {
  idCounter++;
  return prefix.toString() + idCounter;
}
