```sql
-- Create Assets Table
CREATE TABLE wms_assets (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    serial_number VARCHAR2(100) NOT NULL UNIQUE,
    category VARCHAR2(50) NOT NULL,
    location VARCHAR2(255) NOT NULL,
    status VARCHAR2(20) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    specifications CLOB,
    purchase_date DATE,
    warranty_end DATE,
    value NUMBER(12,2),
    department VARCHAR2(100),
    coordinates CLOB,
    is_deleted NUMBER(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Local Content Metrics Table
CREATE TABLE wms_local_content_metrics (
    id VARCHAR2(36) DEFAULT SYS_GUID() PRIMARY KEY,
    total_percentage NUMBER(5,2) NOT NULL,
    suppliers_percentage NUMBER(5,2) NOT NULL,
    materials_percentage NUMBER(5,2) NOT NULL,
    growth_rate NUMBER(5,2),
    measurement_date DATE NOT NULL,
    notes CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_assets_category ON wms_assets(category);
CREATE INDEX idx_assets_status ON wms_assets(status);

-- Create Triggers for Updated At
CREATE OR REPLACE TRIGGER trg_assets_updated_at
BEFORE UPDATE ON wms_assets
FOR EACH ROW
BEGIN
    :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/
```