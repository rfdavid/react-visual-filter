var defaultLanguage = 'en'; 

const LANGUAGE = {
  pt_br: {
    eq: "é igual",
    ne: "é diferente de",
    ct: "contém",
    nct: "não contém",
    in: "é vazio",
    nn: "não é vazio",
    sw: "começa com",
    fw: "termina com",
    gt: "maior que",
    lt: "menor que",
  },

  en: {
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
}

export function i18n(k) {
  return LANGUAGE[defaultLanguage][k];
}

export function setLang(value) {
  defaultLanguage = value;
}
