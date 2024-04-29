import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { dateFnsLocalizer } from "react-big-calendar";
// import { getHours } from "date-fns";
// import { startOfHour } from "date-fns";

const locales = {
  "en-US": enUS,
};

// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 8);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
