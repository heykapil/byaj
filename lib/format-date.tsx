import { format } from "date-fns";
import { hi } from "date-fns/locale";
export function formateDate(date: any, hideDay?: boolean) {
  try {
    if (!date) return '';
    let final;
    const dateStamp = new Date(date.toISOString());
    if (hideDay === true) {
      final = `${format(dateStamp, 'dd MMMM, yyyy', { locale: hi })}`
    } else {
      final = `${format(dateStamp, 'EEEE, dd MMMM yyyy', { locale: hi })}`
    }
    return final
  } catch{
    return null
  }
}
