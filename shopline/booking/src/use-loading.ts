/* eslint-disable no-param-reassign */
export default function useLoading(
  options: { before?: Function; after?: Function; error?: Function } = {}
) {
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

    if (options.before) options.before();
    promise = promise
      .then((res) => {
        if (options.after) options.after();
        cleanup();
        return res;
      })
      .catch((err) => {
        if (options.after) options.after();
        if (options.error) options.error();
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
