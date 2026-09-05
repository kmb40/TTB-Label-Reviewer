// Regulation citations for TTB label compliance fields.
// Verified against the eCFR structure API (Title 27, Chapter I, Subchapter A) —
// not model-generated, since a wrong CFR number is worse than no citation at all.
// Health warning wording is governed by Part 16 regardless of beverage class;
// the other fields fall under the part specific to the beverage type.

export const CITATIONS = {
  WINE: {
    brandName: "27 CFR 4.33",
    classType: "27 CFR 4.34",
    alcoholContent: "27 CFR 4.36",
    netContents: "27 CFR 4.37",
    bottlerInfo: "27 CFR 4.35",
    countryOfOrigin: "27 CFR 4.35; 19 CFR 134 (Customs origin marking)",
    governmentWarning: "27 CFR 16.21",
  },
  DISTILLED_SPIRITS: {
    brandName: "27 CFR 5.64",
    classType: "27 CFR 5.63 (see Subpart I, § 5.141 et seq. for standards of identity)",
    alcoholContent: "27 CFR 5.65",
    netContents: "27 CFR 5.70",
    bottlerInfo: "27 CFR 5.66–5.68 (varies by domestic/imported origin)",
    countryOfOrigin: "27 CFR 5.69",
    governmentWarning: "27 CFR 16.21",
  },
  MALT_BEVERAGE: {
    brandName: "27 CFR 7.64",
    classType: "27 CFR 7.63 (see Subpart I, § 7.141 for class designations)",
    alcoholContent: "27 CFR 7.65",
    netContents: "27 CFR 7.70",
    bottlerInfo: "27 CFR 7.66–7.68 (varies by domestic/imported origin)",
    countryOfOrigin: "27 CFR 7.69",
    governmentWarning: "27 CFR 16.21",
  },
};

// Used only when the model can't determine beverage type from the label —
// shows every part that could apply rather than guessing wrong.
const UNKNOWN = {
  brandName: "27 CFR 4.33 / 5.64 / 7.64",
  classType: "27 CFR 4.34 / 5.63 / 7.63",
  alcoholContent: "27 CFR 4.36 / 5.65 / 7.65",
  netContents: "27 CFR 4.37 / 5.70 / 7.70",
  bottlerInfo: "27 CFR 4.35 / 5.66–8 / 7.66–8",
  countryOfOrigin: "27 CFR 5.69 / 7.69; 19 CFR 134 for wine",
  governmentWarning: "27 CFR 16.21",
};

export function citationFor(beverageType, field) {
  const table = CITATIONS[beverageType] || UNKNOWN;
  return table[field] || UNKNOWN[field] || null;
}
