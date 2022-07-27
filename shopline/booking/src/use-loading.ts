/* eslint-disable no-param-reassign */
export default function useLoading() {
  let isLoading = false;
  const run = <T = any>(promise: Promise<T>, timeout = 0) => {
    isLoading = true;
    let timer: any = null;
    if (timeout) {
      timer = setTimeout(() => {
        isLoading = false;
      }, timeout);
    }

    const cleanup = () => {
      isLoading = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    promise = promise
      .then((res) => {
        cleanup();
        return res;
      })
      .catch((err) => {
        cleanup();
        throw err;
      });

    return promise;
  };

  return {
    isLoading,
    run,
  };
}
