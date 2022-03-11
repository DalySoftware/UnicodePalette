/* eslint-disable @typescript-eslint/naming-convention */
export enum GeneralCategory {
    Lu = "Letter, Uppercase",
    Ll = "Letter, Lowercase",
    Lt = "Letter, Titlecase",
    Lm = "Letter, Modifier",
    Lo = "Letter, Other",
    Mn = "Mark, Nonspacing",
    Mc = "Mark, Spacing Combining",
    Me = "Mark, Enclosing",
    Nd = "Number, Decimal Digit",
    Nl = "Number, Letter",
    No = "Number, Other",
    Pc = "Punctuation, Connector",
    Pd = "Punctuation, Dash",
    Ps = "Punctuation, Open",
    Pe = "Punctuation, Close",
    Pi = "Punctuation, Initial quote",
    Pf = "Punctuation, Final quote",
    Po = "Punctuation, Other",
    Sm = "Symbol, Math",
    Sc = "Symbol, Currency",
    Sk = "Symbol, Modifier",
    So = "Symbol, Other",
    Zs = "Separator, Space",
    Zl = "Separator, Line",
    Zp = "Separator, Paragraph",
    Cc = "Other, Control",
    Cf = "Other, Format",
    Cs = "Other, Surrogate",
    Co = "Other, Private Use",
    Cn = "Other, Not Assigned",
}

export function categoryFromString(strColor: string): GeneralCategory {
    const colorKey = strColor as keyof typeof GeneralCategory;
    return GeneralCategory[colorKey];
}
