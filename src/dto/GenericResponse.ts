export type GenericResponse<T> = {
    data: T;
    message: string;
    statusCode: number;
}