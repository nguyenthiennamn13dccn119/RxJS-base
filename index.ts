const btnjsThrottle = document.querySelector('#jsThrottle');
const btnrxjsThrottle = document.querySelector('#rxjsThrottle');

let count: number = 0;
let rate: number = 500;
let lastClick = Date.now() - count;

// Pure js version

btnjsThrottle.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Click ${++count} times`);
    lastClick = Date.now();
  }
});

//Rxjs version

import { fromEvent, interval, Observable } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

fromEvent(btnrxjsThrottle, 'click')
  .pipe(
    throttleTime(500),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`RxJS click ${count} times`));

// Creating Observable

const observable = new Observable(function subscribe(observer) {
  const id = setTimeout(() => {
    observer.next('Hello Nam, Wellcome to RxJS.');
    observer.complete();
  }, 1000);
  debugger;
  return function unsubscrible() {
    clearTimeout(id);
  };
});

// Invoking Observable

const subscription = observable.subscribe({
  next: (value) => {
    console.log(` this is value: ${value}`);
  },
  error: (err) => {
    console.log(` something is wrong, ${err}`);
  },
  complete: () => {
    console.log(`completed`);
  },
});

// Disposing Observable Executions

setTimeout(() => {
  subscription.unsubscribe();
}, 500);

// Subscription

const observable1 = interval(1000);
const subscription1 = observable1.subscribe((x) => {
  console.log(x);
});
setTimeout(() => subscription1.unsubscribe(), 5000);

console.log(subscription1);

// Child Subscription

const observable2 = interval(500);
const observable3 = interval(900);

const subscription3 = observable2.subscribe((x) => {
  console.log(`First + ${x}`);
});

const childSub = observable3.subscribe((x) => {
  console.log(`Second + ${x}`);
});

subscription3.add(childSub);

setTimeout(() => {
  subscription3.unsubscribe();
}, 2000);
