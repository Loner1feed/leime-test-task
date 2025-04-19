export type PartialNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type AllFieldsToType<T, S> = { [K in keyof T]: S };
