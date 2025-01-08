export function compoundInterest({ duaration, principal, roipm }:{duaration: number, principal:number, roipm: number}){
  let amount = 0;
  let interest = 0;
  if(duaration>0) {
    amount = principal * Math.pow((1 + roipm * 0.12), duaration);
    interest = amount - principal;
}
  return Math.floor(interest).toFixed(0) as unknown as number;
}

export function simpleInterest({ time, principal, roipm }:{time: number, principal:number, roipm: number}){
  let interest = 0;
  if(time>0) {
    interest = (principal * time * roipm) / 100;
}
  return Math.floor(interest).toFixed(0) as unknown as number;
}
