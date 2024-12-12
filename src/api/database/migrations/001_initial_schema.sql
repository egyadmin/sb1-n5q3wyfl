```sql
-- Initial schema migration
BEGIN
    -- Create sequences
    EXECUTE IMMEDIATE 'CREATE SEQUENCE seq_assets START WITH 1 INCREMENT BY 1';
    
    -- Create tables
    @../schema/init.sql
    
    -- Insert initial data
    INSERT INTO wms_local_content_metrics (
        total_percentage, suppliers_percentage, materials_percentage,
        growth_rate, measurement_date
    ) VALUES (
        67, 100, 33, 5.2, CURRENT_DATE
    );
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
```