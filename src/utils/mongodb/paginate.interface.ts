export interface Paginate<T>{
    items:T;
    total:number;
    totalPages:number;
    nextPage:number;
    pageNumber:number;
}