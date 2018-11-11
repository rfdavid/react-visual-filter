const LANGUAGE = {
  eq: "is",
  ne: "is not",
  ct: "contains",
  nct: "doesn't contain",
  in: "is empty",
  nn: "is not empty",
  sw: "starts with",
  fw: "finishes with",
  gt: "greater than",
  lt: "less than",
}

export default function(k) {
  return LANGUAGE[k];
}
