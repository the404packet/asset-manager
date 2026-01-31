-- LAPTOPS
CREATE TABLE laptops (
    id SERIAL PRIMARY KEY,
    hostname VARCHAR(100),
    vendor VARCHAR(100),
    model VARCHAR(100),
    cpu VARCHAR(100),
    ram_gb INT,
    storage_gb INT,
    os VARCHAR(100),
    serial_number VARCHAR(100),
    status VARCHAR(50)
);

INSERT INTO laptops VALUES
(1,'lap-01','Dell','Latitude','i5',16,512,'Ubuntu','SN123','active'),
(2,'lap-02','HP','EliteBook','i7',32,1024,'Windows','SN124','spare');

-- SERVERS
CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    hostname VARCHAR(100),
    vendor VARCHAR(100),
    model VARCHAR(100),
    cpu VARCHAR(100),
    ram_gb INT,
    storage_gb INT,
    os VARCHAR(100),
    ip_address VARCHAR(50),
    status VARCHAR(50)
);

INSERT INTO servers VALUES
(1,'srv-01','Dell','R740','Xeon',128,4096,'Ubuntu','10.0.0.10','active');

-- SWITCHES
CREATE TABLE switches (
    id SERIAL PRIMARY KEY,
    hostname VARCHAR(100),
    vendor VARCHAR(100),
    model VARCHAR(100),
    ports INT,
    firmware VARCHAR(100),
    management_ip VARCHAR(50),
    status VARCHAR(50)
);

-- FIREWALLS
CREATE TABLE firewalls (
    id SERIAL PRIMARY KEY,
    vendor VARCHAR(100),
    model VARCHAR(100),
    firmware VARCHAR(100),
    throughput_gbps DECIMAL,
    management_ip VARCHAR(50),
    status VARCHAR(50)
);

-- ACCESS POINTS
CREATE TABLE access_points (
    id SERIAL PRIMARY KEY,
    vendor VARCHAR(100),
    model VARCHAR(100),
    standard VARCHAR(50),
    management_ip VARCHAR(50),
    status VARCHAR(50)
);
