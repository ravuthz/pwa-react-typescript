export const progressPromise = (promises: Promise<any>[], tickCallback: any) => {
  const total = promises.length;
  let completed = 0;

  const tick = (promise: Promise<any>) => {
    promise.then(function () {
      completed++;
      const progress = Math.round(completed / total * 100)
      tickCallback(progress, completed, total);
    });
    return promise;
  }

  return Promise.all(promises.map(tick));
}