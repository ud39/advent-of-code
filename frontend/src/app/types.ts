
type NumericRange<
    START extends number,
    END extends number,
    ARR extends unknown[] = [],
    ACC extends number = never
> = ARR['length'] extends END
    ? ACC | START | END
    : NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>


type CardContent = { code: string, language: string, language_id: number};
type CardContents = {[day: number]: Array<CardContent> }
type AvailableSolutions = {[day: number]: string[]} 

export { NumericRange, CardContents, CardContent, AvailableSolutions}
