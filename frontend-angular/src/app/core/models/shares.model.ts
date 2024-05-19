export interface IResponseDataCommon<T> {
    data: T;
    message: string;
    page: number;
    totalRecords: number;
}