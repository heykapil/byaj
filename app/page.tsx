'use client'
import { formateDate } from '@/lib/format-date';
import { InterestTable } from '@/lib/InterestTable';
import { IntervalToDuration } from '@/lib/interval-duration';
import { N2WHindi } from '@/lib/N2Whindi';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
type FormData = {
  currency: number,
  duration: JSON,
  fromdate: Date,
  todate: Date,
  roi: number,
}
export default function ButtonBarDemo() {
    const [table, setTable] = useState<boolean>(false)
    const [duration, setDuration] = useState({});
    const [words, setwords] = useState('');
    const [formData, setFormData] = useState({});
    const { control, setValue, watch, reset, handleSubmit, } = useForm<FormData>({ mode: 'onChange'})
    const onSubmit = (data: any) => {
            setFormData(data);
            alert(JSON.stringify(formData))
            // console.log(JSON.stringify(data))
            // reset();
        };
    const watchAll = watch();

    useEffect(()=> {
     const interval = IntervalToDuration(watchAll?.fromdate, watchAll.todate)
     setDuration(interval)
    }, [watchAll.fromdate, watchAll.todate,])
  useEffect(() => {
    const word = N2WHindi.convert(`${watchAll.currency}`)
    setwords(word + ` रुपये`)
  }, [watchAll.currency])

    return (
      <div>
    <form className='hideprint mb-10' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-2'>
            <Controller name="currency" control={control} render={({ field }) => (
              <InputNumber
                  id='currency'
                  required
                  inputId='currency'
                  className='w-fit border-gray-300 border-2'
                  placeholder="₹ "
                  currency="INR"
                  value={field.value}
                  locale="en-IN"
                  min={0}
                  // suffix=' /-'
                  maxFractionDigits={0}
                  mode='currency'
                  onChange={(e) => { field.onChange(e.value); setTable(false) }}
              />
            )}/>
        <span className='font-medium text-medium text-blue-700 my-2'>{watchAll.currency > 0 ? words : ''}</span>
        </div>
        <div className='flex flex-row gap-6'>
        <div className='card flex justify-content-center flex-col w-[200px] lg:w-[256px]  space-y-1'>
        <Controller name="fromdate" control={control} render={({ field }) => (
                  <Calendar required id='fromdate' placeholder='कब से(तारीख़)' value={field.value} inputId="कब से" dateFormat='dd/mm/yy' locale='en' className='border-rounded-md font-medium border-2 border-gray-300' onChange={(e) => { setTable(false); field.onChange(e.value) }} showButtonBar /> )}  />
          <label htmlFor="कब से" className='font-medium text-medium text-blue-700'>{watchAll.fromdate ? <><p>{formateDate(watchAll.fromdate)}</p><p>तारीख़ से</p></> : ''}</label>
        </div>
        <div className='card flex justify-content-center flex-col w-[200px] lg:w-[256px] space-y-1'>
         <Controller name="todate" control={control} render={({ field }) => (
                  <Calendar required id='todate' placeholder='कब तक(तारीख़)' value={field.value} inputId="कब तक" dateFormat='dd/mm/yy' locale='en' className='border-2 font-medium border-gray-300 border-rounded-md' onChange={(e) => { setTable(false); field.onChange(e.value) }} showButtonBar />)} />
          <label htmlFor="कब तक" className='font-medium text-medium text-blue-700'>{watchAll.todate ? <><p>{formateDate(watchAll.todate)}</p><p>तारीख़ तक</p></> : ''}</label>
        </div>
        </div>
        <div className='card flex justify-content-center flex-col w-fit min-w-[256px] space-y-1'>
          <p className='border-2 border-gray-300 py-[5px] bg-white px-1'>
            {/* @ts-ignore */}
            <span className='text-normal font-medium'>समय अवधि: </span><span className='font-medium text-medium text-blue-700'>{duration.text || 'समय अवधि'}</span>
          </p>
        </div>
        <div className='card flex justify-content-center flex-col w-fit space-y-1'>
            <Controller name="roi" control={control} render={({ field }) => (
              <InputNumber
                  inputId='roi'
                  required
                  id='roi'
                  className='w-fit border-gray-300 font-medium border-2'
                  placeholder="ब्याज दर (% प्रति माह)"
                  suffix="% प्रति माह"
                  prefix={`ब्याज दर: `}
                  // defaultValue={2}
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={(e) => { setTable(false); field.onChange(e.value) }}
              />)} />

            <Controller name="duration" control={control} render={() => (
              <input id='duration' readOnly className='hidden w-0 h-0' hidden value={JSON.stringify(duration)} />
            )} />
        </div>
        <div className='flex flex-row justify-between w-xs max-w-lg font-medium text-medium'>
          <button className='bg-indigo-600 text-white px-4 py-2 rounded-md w-fit' type='submit' onClick={() => { setValue('duration', duration as unknown as JSON); setTable(true); }}>Submit</button>
          <button className='text-indigo-600 bg-white px-4 py-2 border-2 border-gray-300 rounded-md w-fit' onClick={() => { setTable(false);  reset(); }}>Reset</button>
      </div>
      </div>
    </form>
    {/* @ts-ignore */}
    {table ? <InterestTable roi={formData?.roi} currency={formData.currency} fromdate={formData.fromdate} todate={formData.todate} duration={duration} /> : ''}
      </div>
    )
}
