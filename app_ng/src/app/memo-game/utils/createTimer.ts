import { map, interval } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export function createTimer() {
  return toSignal(
    interval(1000).pipe(
      map((s) => {
        s = s + 1;
        let seconds: string | number = Math.floor((s / 1) % 60);
        let minutes: string | number = Math.floor(s / (1 * 60));

        // Pad the numbers to ensure they are shown with two digits
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${minutes}:${seconds}`;
      })
    ),
    { initialValue: "00:00" }
  );
}
