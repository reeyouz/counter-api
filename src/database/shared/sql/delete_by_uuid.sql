DELETE FROM __schema__.__table__
WHERE uuid = __uuid__
RETURNING __return_columns__;