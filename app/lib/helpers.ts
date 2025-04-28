import { wokringHours } from "./data";

export function calculateInWorkingHours(
  d: any,
  p: any,
  dropoffTime: any,
  pickupTime: any
) {
  const dropoffDay = new Date(d).getDay();
  const pickupDay = new Date(p).getDay();

  const dropoffWorkingHour = wokringHours[dropoffDay];
  const pickupWorkingHour = wokringHours[pickupDay];

  let notInWorkingHours = true;

  if (
    +dropoffTime.split(":")[0] * 60 + +dropoffTime.split(":")[1] >
      +dropoffWorkingHour.from.split(":")[0] * 60 +
        +dropoffWorkingHour.from.split(":")[1] &&
    +dropoffTime.split(":")[0] * 60 + +dropoffTime.split(":")[1] <
      +dropoffWorkingHour.to.split(":")[0] * 60 +
        +dropoffWorkingHour.to.split(":")[1] &&
    +pickupTime.split(":")[0] * 60 + +pickupTime.split(":")[1] >
      +pickupWorkingHour.from.split(":")[0] * 60 +
        +pickupWorkingHour.from.split(":")[1] &&
    +pickupTime.split(":")[0] * 60 + +pickupTime.split(":")[1] <
      +pickupWorkingHour.to.split(":")[0] * 60 +
        +pickupWorkingHour.to.split(":")[1]
  ) {
    notInWorkingHours = false;
  }

  return notInWorkingHours;
}
