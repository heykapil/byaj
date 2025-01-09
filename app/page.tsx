'use client'
import { formateDate } from '@/lib/format-date';
import { InterestTable } from '@/lib/InterestTable';
import { IntervalToDuration } from '@/lib/interval-duration';
import { N2WHindi } from '@/lib/N2Whindi';
import { useSearchParams } from 'next/navigation';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';
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
    const searchParams = useSearchParams()
    const searchRoi = searchParams.get('roi')
    const searchto= searchParams.get('to');
    const searchfrom= searchParams.get('from');
    const searchamount= searchParams.get('amount');
    console.log(searchRoi, searchfrom, searchto, searchamount)
    const [table, setTable] = useState<boolean>(false)
    const [duration, setDuration] = useState({});
    const [words, setwords] = useState('');
    const [formData, setFormData] = useState({});
    const { control, setValue, watch,  formState: { errors, isValid, isSubmitting }, reset, handleSubmit, } = useForm<FormData>({ mode: 'onChange'})
    const onSubmit = (data: any) => {
            setFormData(data);
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
      <>
         <div className='container mx-auto justify-center flex items-center md:justify-normal md:items-normal md:mx-4'>
           {/* for centering form */}
           {/* <div className='container mx-auto flex items-center justify-center md:justify-normal mt-6'> */}

        {/* <h1 className='text-blue-700 font-bold text-lg text-center mb-10'>ब्याज</h1> */}
    <form className='hideprint mb-10 md:mx-0' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-6 mb-4'>
        <div className='flex flex-col space-y-2'>
            <Controller name="currency"         rules={{ required: true }}
 control={control} render={({ field }) => (
   <>
            <InputNumber
                  id='currency'
                  required
                  inputId='currency'
                  className='w-fit min-w-[258px] rounded-md border-gray-300 font-medium border-2'
                  currency="INR"
                  placeholder='रुपये (₹)'
                  value={field.value}
                  locale="en-IN"
                  min={0}
                  maxFractionDigits={0}
                  mode='currency'
                  onChange={(e) => { field.onChange(e.value); setTable(false) }}
              />
              {errors.currency && <Message className='w-[258px]' severity="error" text="Principal is required" />}
   </>

            )}/>
        <span className='font-medium text-medium text-blue-700 my-2'>{watchAll.currency > 0 ? words : ''}</span>
        </div>
        <div className='flex lg:flex-row flex-col gap-6 lg:gap-10'>
        <div className='card flex justify-content-center flex-col w-[258px]  space-y-1'>
        <Controller name="fromdate"         rules={{ required: true }}
 control={control} render={({ field }) => (
                 <> <Calendar required id='fromdate' placeholder='कब से(तारीख़)' value={field.value} inputId="कब से" dateFormat='dd/mm/yy' locale='en' className='rounded-md font-medium border-2 border-gray-300' onChange={(e) => { setTable(false); field.onChange(e.value) }} showButtonBar />
     {errors.fromdate && <Message className='w-[258px]' severity="error" text="From date is required" />}
                 </>
                 )}  />
          <label htmlFor="कब से" className='font-medium text-medium text-blue-700'>{watchAll.fromdate ? <p>{formateDate(watchAll.fromdate)} <span className='text-black'> तारीख़ से</span></p> : ''}</label>
        </div>
        <div className='card flex justify-content-center flex-col w-[258px] space-y-1'>
         <Controller name="todate"  defaultValue={new Date(Date.now())}        rules={{ required: true }}
 control={control} render={({ field }) => (
        <>
        <Calendar required id='todate' placeholder='कब तक(तारीख़)' value={field.value || new Date(Date.now())} inputId="कब तक" dateFormat='dd/mm/yy' locale='en' className='border-2 rounded-md font-medium border-gray-300 border-rounded-md' onChange={(e) => { setTable(false); field.onChange(e.value) }} showButtonBar />
          {errors.todate && <Message className='w-[258px]' severity="error" text="To date is required" />}</>
          )} />
          <label htmlFor="कब तक" className='font-medium text-medium text-blue-700'>{watchAll.todate ? <p>{formateDate(watchAll.todate)}<span className='text-black'> तारीख़ तक</span></p> : ''}</label>
        </div>
        </div>
        <div className='card flex justify-content-center flex-col w-fit min-w-[258px] h-10 space-y-1'>
          <p className='border-2 border-gray-300 py-[5px] bg-white rounded-md px-1'>
            {/* @ts-ignore */}
            <span className='text-normal font-medium'>समय अवधि: </span><span className='font-medium text-medium text-blue-700'>{duration.text || ''}</span>
          </p>
        </div>
        <div className='card flex justify-content-center flex-col w-fit max-w-[258px] space-y-1'>
            <Controller name="roi" defaultValue={2}    rules={{ required: true }}
                control={control} render={({ field }) => (
              <>
                <div className="p-inputgroup flex-1">
                   <span className="p-inputgroup-addon h-10 bg-gray-50 text-black border-gray-300 border-r-0 font-medium border-2">ब्याज दर: </span>
                  <InputNumber
                  inputId='roi'
                  required
                  id='roi'
                  className='max-w-[120px] h-10 flex justify-items-center items-align-center border-2 border-x-0 border-gray-300 text-blue-700 font-medium'
                  placeholder=""
                  // suffix=""
                  // prefix={`ब्याज दर: `}
                  min={0}
                  max={100}
                  defaultValue={2}
                  value={field.value || 2}
                  onChange={(e) => { setTable(false); field.onChange(e.value) }}
              />
              <span className="p-inputgroup-addon h-10 bg-gray-50 text-black border-gray-300 border-l-0 font-medium border-2">% प्रति माह</span>
                </div>

              {errors.roi && <Message className='w-[258px]' severity="error" text="Interest Rate is required" />}
              </>
              )} />

            <Controller name="duration" control={control} render={() => (
              <input id='duration' readOnly className='hidden w-0 h-0' hidden value={JSON.stringify(duration)} />
            )} />
        </div>
        <div className='flex pt-6 flex-row justify-between w-xs max-w-[258px] font-medium text-medium'>
          <button disabled={!isValid || isSubmitting || !errors} className='bg-indigo-600 disabled:bg-gray-600 text-white px-4 py-1 rounded-md w-fit' type='submit' onClick={() => { setValue('duration', duration as unknown as JSON);  if(isValid){setTable(true)} }}>Submit</button>
          <button className='text-indigo-600 bg-white px-4 py-1 border-2 border-gray-300 rounded-md w-fit' onClick={() => { setTable(false);  reset(); }}>Reset</button>
      </div>
      </div>
    </form>
      </div>
      <div className='container space-y-4'>
    {/* @ts-ignore */}
    {table ? <InterestTable roi={formData?.roi} currency={formData.currency} fromdate={formData.fromdate} todate={formData.todate} duration={duration} /> : ''}
      </div>
      </>
    )
}
