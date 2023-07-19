// @ts-nocheck

function calculateDigit (cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
        if (factor > 1) total += digit * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
}

export function validate (str) {
	if (!str) return false;
    if (str.length < 11 || str.length > 14) return false;
    str=str.replace('.','').replace('.','').replace('-','').replace(" ","");  
    if (str.split("").every(c => c === str[0])) return false;
    const dg1 = calculateDigit(str, 10);
    const dg2 = calculateDigit(str, 11);
    let nDigVerific = str.substring(str.length-2, str.length);  
    const nDigResult = "" + dg1 + "" + dg2;  
    return nDigVerific == nDigResult;
}