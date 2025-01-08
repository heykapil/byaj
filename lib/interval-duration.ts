import { intervalToDuration } from "date-fns";

export function IntervalToDuration(fromDate:Date, endDate:Date){
  const duration = intervalToDuration({
    start: fromDate,
    end: endDate
  })
  const years = duration?.years ? (`${duration?.years} साल`) : '';
  const months = duration?.months ? (`${duration.months} महीने`) : '';
  const days = duration?.days ? (`${duration.days} दिन`) : '';
  const object = {
    days: duration?.days || 0,
    months: duration?.months || 0,
    years: duration?.years || 0,
    text: `${years} ${months} ${days}`
  }
  return object
}
