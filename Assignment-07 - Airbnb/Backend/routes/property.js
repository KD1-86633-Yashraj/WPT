// - add a property
// - list the properties
// - show similar properties
// - search properties
// - book a property
// - cancel a booking
// - rate (feedback) a property
// - get my bookings
// - get my rented properties
// - show property details

// +------------------+---------------+------+-----+-------------------+-------------------+
// | Field            | Type          | Null | Key | Default           | Extra             |
// +------------------+---------------+------+-----+-------------------+-------------------+
// | id               | int           | NO   | PRI | NULL              | auto_increment    |
// | categoryId       | int           | YES  |     | NULL              |                   |
// | title            | varchar(100)  | YES  |     | NULL              |                   |
// | details          | varchar(1000) | YES  |     | NULL              |                   |
// | address          | varchar(1000) | YES  |     | NULL              |                   |
// | contactNo        | varchar(15)   | YES  |     | NULL              |                   |
// | ownerName        | varchar(50)   | YES  |     | NULL              |                   |
// | isLakeView       | int           | YES  |     | 0                 |                   |
// | isTV             | int           | YES  |     | 0                 |                   |
// | isAC             | int           | YES  |     | 0                 |                   |
// | isWifi           | int           | YES  |     | 0                 |                   |
// | isMiniBar        | int           | YES  |     | 0                 |                   |
// | isBreakfast      | int           | YES  |     | 0                 |                   |
// | isParking        | int           | YES  |     | 0                 |                   |
// | guests           | int           | YES  |     | NULL              |                   |
// | bedrooms         | int           | YES  |     | NULL              |                   |
// | beds             | int           | YES  |     | NULL              |                   |
// | bathrooms        | int           | YES  |     | NULL              |                   |
// | rent             | float         | YES  |     | NULL              |                   |
// | profileImage     | varchar(100)  | YES  |     | NULL              |                   |
// | createdTimestamp | datetime      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
// +------------------+---------------+------+-----+-------------------+-------------------+