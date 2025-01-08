import { simpleInterest } from "./calc-interest";
import { N2WHindi } from "./N2Whindi";

export const INR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
});

export function currencytoNumber(currency: any){
return Number(currency?.replace(/[^0-9.-]+/g,""));
}

export function addNum(num1: any, num2: any){
  return (+num1 + +num2).toFixed(0) as unknown as number;
}

export function subNum(num1: any, num2: any){
  return (+num1 - +num2).toFixed(0) as unknown as number;
}

export function durationInterest({lasttotal, roi, time}: {lasttotal: any, roi: number, time:number}){
  const principal = typeof lasttotal === 'number' ? lasttotal : currencytoNumber(lasttotal)
  const roipm = roi;
  const interest = simpleInterest({time, principal, roipm})
  return INR.format(interest)
}

export function totalAfterDuration({lasttotal, currentInterest}: {lasttotal: any, currentInterest:any}) {
  const lasttotalnumber = typeof lasttotal === 'number' ? lasttotal : currencytoNumber(lasttotal);
  const currentInterestNumber = typeof currentInterest === 'number' ? currentInterest : currencytoNumber(currentInterest)
  const totalNumber = addNum(lasttotalnumber, currentInterestNumber)
  return INR.format(totalNumber)
}

export function currencytoWords(currency:any){
  if (!currency) return ''
  let input;
  if(typeof currency === 'number') {
    input = currency.toString()
  } else {
    input = currencytoNumber(currency).toString()
  }
  const output = N2WHindi.convert(input);
  return output;
}

export function totalbyaj(amount: any, principal: number) {
  if (!amount || !principal) return 0;
  const amountno = currencytoNumber(amount)
  const outputno = subNum(amountno, principal)
  return INR.format(outputno)
}
