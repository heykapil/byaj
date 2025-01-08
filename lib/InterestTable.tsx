'use client'
import { add } from 'date-fns';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { N2WHindi } from './N2Whindi';
import { formateDate } from './format-date';
import { currencytoWords, durationInterest, INR, totalAfterDuration, totalbyaj } from './interest';
export function InterestTable({
  roi,
  fromdate,
  currency,
  todate,
  duration
}: {roi: number, currency: number, fromdate: Date, todate: Date, duration: any}) {
  const value: any[] = [];
  let i;
  for (i = 0; i < duration?.years; i++)  {
    const year_wise_interest = durationInterest({
      lasttotal: value[i-1]?.total_after_duration || currency,
      roi: roi,
      time: 12
    })
  value.push({
    id: `year_${i +1}`,
    duration: `1 साल`,
    from: add(fromdate, {years: i}),
    to: add(fromdate, {years: i +1}),
    duration_interest: year_wise_interest,
    total_after_duration: totalAfterDuration({
      lasttotal: value[i-1]?.total_after_duration || currency,
      currentInterest: year_wise_interest
    })
  })}
  const days: number = duration?.days || 0;
  const monthFloat = Math.floor(+days / 3);
  const daystime = +monthFloat / 10;
  const months: number = duration?.months || 0;
  const monthdaytime = +daystime + +months
  const months_interest = durationInterest({
    lasttotal: value[duration?.years - 1]?.total_after_duration || currency,
    roi: roi,
    time: monthdaytime,
  })
  value.push({
    id: `months_${duration?.months}_days_${duration?.days}`,
    duration: `${monthdaytime} माह`,
    from: add(fromdate, {years: duration?.years || 0}),
    to: add(fromdate, {years: duration?.years||0, months: months, days: +daystime*30}),
    duration_interest: months_interest,
    total_after_duration: totalAfterDuration({
      lasttotal: value[duration?.years-1]?.total_after_duration || currency,
      currentInterest: months_interest
    })
  })
  const length = value?.length || 0;

  const header = (
         <div className='flex shadow-none drop-shadow-none'>
           <div className='m-0 space-y-4'>
             <p className='text-md font-medium'>नाम: </p>
             <p className='text-md font-medium'>मूलधन: <span className='text-blue-700'>{INR.format(currency)} | {currency> 0 ? N2WHindi.convert(`${currency}`): ''} रुपये
           </span>
           </p>
           <p className='text-md font-medium'>समय: <span className='text-blue-700'>{formateDate(fromdate, false)} </span> से <span className='text-blue-700'>{formateDate(todate, false)} तक
           </span>
           </p>
        <p className='text-md font-medium'>अवधि: <span className='text-md font-medium border-b border-blue-700 text-blue-700'>{duration.text}
        </span></p>
        <p className='text-md font-medium'>ब्याज दर: <span className='text-md font-medium border-b border-blue-700 text-blue-700'>{roi} % प्रति माह
        </span></p>
           </div>
           </div>
     );
  const kulbyaj = totalbyaj(value[length-1]?.total_after_duration || '', currency)
  const kulamount = value[length-1]?.total_after_duration || ''
  const footer = (
    <div className='flex shadow-none drop-shadow-none'>
      <div className='m-0 space-y-4'>
   <p className='text-md font-medium'>समय: <span className='text-blue-700'>{formateDate(fromdate, false)} </span> से <span className='text-blue-700'>{formateDate(value[length-1].to, false)} तक
   </span></p>
   <p className='text-md font-medium'>कुल ब्याज: <span className='text-blue-700'>{kulbyaj} | {' '}
     {currencytoWords(kulbyaj)} रुपये
   </span></p>
        <p className='text-md font-medium'>कुल (मूलधन + कुल ब्याज): <span className='text-large font-semibold border-b border-blue-700 text-blue-700'>{kulamount} | {' '}
          {currencytoWords(kulamount)} रुपये
   </span></p>
      </div>
      </div>
  )
const fromtoTempl = (value: any) => {
return <div>
<p>
  {formateDate(value.from, true)}
  <span> से</span>
</p>
<p>
  {formateDate(value.to, true)}
<span> तक</span>
</p>
</div>
}
 return (
     <DataTable showGridlines size='large' value={value} header={header} footer={footer} tableStyle={{  maxWidth: '50rem' }}>
        <Column style={{ width: '15%' }} header="कब से - कब तक" body={fromtoTempl}></Column>
        <Column style={{ width: '10%' }} header='अवधि ' field='duration'></Column>
        <Column style={{ width: '10%' }} header='ब्याज (वर्णित अवधि)' field='duration_interest'></Column>
        <Column style={{ width: '10%' }} header='कुल(अवधि के अंत तक)' field='total_after_duration'></Column>
    </DataTable>
 )
}
