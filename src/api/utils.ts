export const enhanceResponse = <T, R, Result>(
  requestFunction: (...args: R[]) => Promise<T>,
  enhancer: (response: T) => Result
): ((...args: R[]) => Promise<Result>) => {
  return async (...args: R[]): Promise<Result> => {
    const response = await requestFunction(...args);

    return enhancer(response);
  };
};
