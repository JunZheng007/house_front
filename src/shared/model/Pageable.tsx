export default interface Pageable<T = {}> {
    content: T[],
    empty: boolean,
    first: boolean,
    last: boolean,
    totalElements: number,
    totalPages: number,
    number: number,
    size: number,
    numberOfElements: number
}