declare type AsyncDatabaseResponse<T> =
    Promise<
        { is_error: true, error: Error } |
        { is_error: false, data: T }
    >;

declare interface IPropertyValidationError {
    property_name: string;
    errors: string[];
}
