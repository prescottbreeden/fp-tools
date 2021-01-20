export interface Mappable {
  map: Function;
}

export interface Reducable {
  reduce: Function;
}
export type ReduceFunction = (prev: any, curr: any) => any;
export interface Filterable {
  filter: Function;
}
