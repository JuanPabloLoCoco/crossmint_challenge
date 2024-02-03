async function throttledPromises(
  promises: (() => Promise<boolean>)[],
  interval: number
) {
  let promisesToRun: (() => Promise<boolean>)[] = [...promises];
  while (promisesToRun.length > 0) {
    const promiseToHandle = promisesToRun.shift();
    if (!promiseToHandle) throw new Error("Invalid queue");

    const promiseSucceed = await promiseToHandle();
    if (!promiseSucceed) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      promisesToRun.push(promiseToHandle);
    }
  }
}
