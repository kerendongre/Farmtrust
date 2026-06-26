# Farms Table

The Farms table stores detailed information about each farm owned by a farmer.

| Field Name | Data Type | Description |
|------------|-----------|-------------|
| farm_id | UUID | Unique farm ID |
| farmer_id | UUID | Linked farmer |
| farm_name | VARCHAR(150) | Name of the farm |
| farm_type | ENUM | Organic, Natural, Conventional |
| total_area | DECIMAL | Farm size in acres/hectares |
| address | TEXT | Farm address |
| village | VARCHAR(100) | Village |
| district | VARCHAR(100) | District |
| state | VARCHAR(100) | State |
| country | VARCHAR(100) | Country |
| latitude | DECIMAL | GPS Latitude |
| longitude | DECIMAL | GPS Longitude |
| soil_type | VARCHAR(100) | Soil type |
| irrigation_type | VARCHAR(100) | Irrigation method |
| organic_certified | BOOLEAN | Organic certification status |
| certification_number | VARCHAR(100) | Organic certificate number |
| created_at | TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | Last updated |

## Relationship

- One Farmer can own multiple Farms.
- One Farm can produce many Harvests.
