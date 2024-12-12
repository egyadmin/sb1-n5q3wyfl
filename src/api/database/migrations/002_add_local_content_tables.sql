```sql
-- Add local content related tables
BEGIN
    -- Create Local Content Categories Table
    EXECUTE IMMEDIATE '
    CREATE TABLE wms_local_content_categories (
        id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
        name VARCHAR2(255) NOT NULL,
        target_percentage NUMBER(5,2) NOT NULL,
        description CLOB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )';
    
    -- Create Local Content Requirements Table
    EXECUTE IMMEDIATE '
    CREATE TABLE wms_local_content_requirements (
        id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
        category_id VARCHAR2(36) NOT NULL,
        name VARCHAR2(255) NOT NULL,
        minimum_percentage NUMBER(5,2) NOT NULL,
        effective_date DATE NOT NULL,
        description CLOB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_requirement_category FOREIGN KEY (category_id) 
        REFERENCES wms_local_content_categories(id)
    )';
    
    -- Insert initial categories
    INSERT INTO wms_local_content_categories (name, target_percentage, description)
    VALUES ('المواد الأولية', 40, 'المواد الخام والمكونات الأساسية');
    
    INSERT INTO wms_local_content_categories (name, target_percentage, description)
    VALUES ('المعدات والآلات', 25, 'المعدات والآلات المستخدمة في الإنتاج');
    
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
```