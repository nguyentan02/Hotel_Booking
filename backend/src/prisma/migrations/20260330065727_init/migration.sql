BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(100) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [phone] NVARCHAR(20),
    [role] NVARCHAR(20) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'customer',
    [avatar_url] NVARCHAR(500),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[hotels] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max),
    [address] NVARCHAR(500) NOT NULL,
    [city] NVARCHAR(100) NOT NULL,
    [latitude] DECIMAL(10,8),
    [longitude] DECIMAL(11,8),
    [rating] DECIMAL(2,1) NOT NULL CONSTRAINT [hotels_rating_df] DEFAULT 0,
    [star_rating] INT NOT NULL CONSTRAINT [hotels_star_rating_df] DEFAULT 3,
    [image_url] NVARCHAR(500),
    [phone] NVARCHAR(20),
    [email] NVARCHAR(100),
    [is_featured] BIT NOT NULL CONSTRAINT [hotels_is_featured_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [hotels_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [hotels_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[hotel_images] (
    [id] INT NOT NULL IDENTITY(1,1),
    [hotel_id] INT NOT NULL,
    [image_url] NVARCHAR(500) NOT NULL,
    [caption] NVARCHAR(200),
    CONSTRAINT [hotel_images_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[amenities] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [icon] NVARCHAR(50),
    CONSTRAINT [amenities_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[hotel_amenities] (
    [hotel_id] INT NOT NULL,
    [amenity_id] INT NOT NULL,
    CONSTRAINT [hotel_amenities_pkey] PRIMARY KEY CLUSTERED ([hotel_id],[amenity_id])
);

-- CreateTable
CREATE TABLE [dbo].[rooms] (
    [id] INT NOT NULL IDENTITY(1,1),
    [hotel_id] INT NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(max),
    [price] DECIMAL(12,2) NOT NULL,
    [capacity] INT NOT NULL CONSTRAINT [rooms_capacity_df] DEFAULT 2,
    [total_rooms] INT NOT NULL CONSTRAINT [rooms_total_rooms_df] DEFAULT 1,
    [image_url] NVARCHAR(500),
    [status] NVARCHAR(20) NOT NULL CONSTRAINT [rooms_status_df] DEFAULT 'available',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [rooms_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [rooms_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[bookings] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT,
    [room_id] INT NOT NULL,
    [check_in] DATE NOT NULL,
    [check_out] DATE NOT NULL,
    [num_rooms] INT NOT NULL CONSTRAINT [bookings_num_rooms_df] DEFAULT 1,
    [total_price] DECIMAL(12,2) NOT NULL,
    [status] NVARCHAR(20) NOT NULL CONSTRAINT [bookings_status_df] DEFAULT 'pending',
    [guest_name] NVARCHAR(100) NOT NULL,
    [guest_email] NVARCHAR(100) NOT NULL,
    [guest_phone] NVARCHAR(20),
    [payment_method] NVARCHAR(20) NOT NULL CONSTRAINT [bookings_payment_method_df] DEFAULT 'credit_card',
    [payment_status] NVARCHAR(20) NOT NULL CONSTRAINT [bookings_payment_status_df] DEFAULT 'pending',
    [special_requests] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [bookings_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [bookings_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[reviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [hotel_id] INT NOT NULL,
    [rating] INT NOT NULL,
    [comment] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [reviews_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [reviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [hotels_city_idx] ON [dbo].[hotels]([city]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [rooms_hotel_id_idx] ON [dbo].[rooms]([hotel_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [bookings_user_id_idx] ON [dbo].[bookings]([user_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [bookings_room_id_idx] ON [dbo].[bookings]([room_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [bookings_check_in_check_out_idx] ON [dbo].[bookings]([check_in], [check_out]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [reviews_hotel_id_idx] ON [dbo].[reviews]([hotel_id]);

-- AddForeignKey
ALTER TABLE [dbo].[hotel_images] ADD CONSTRAINT [hotel_images_hotel_id_fkey] FOREIGN KEY ([hotel_id]) REFERENCES [dbo].[hotels]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[hotel_amenities] ADD CONSTRAINT [hotel_amenities_hotel_id_fkey] FOREIGN KEY ([hotel_id]) REFERENCES [dbo].[hotels]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[hotel_amenities] ADD CONSTRAINT [hotel_amenities_amenity_id_fkey] FOREIGN KEY ([amenity_id]) REFERENCES [dbo].[amenities]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[rooms] ADD CONSTRAINT [rooms_hotel_id_fkey] FOREIGN KEY ([hotel_id]) REFERENCES [dbo].[hotels]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[bookings] ADD CONSTRAINT [bookings_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[bookings] ADD CONSTRAINT [bookings_room_id_fkey] FOREIGN KEY ([room_id]) REFERENCES [dbo].[rooms]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reviews] ADD CONSTRAINT [reviews_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[reviews] ADD CONSTRAINT [reviews_hotel_id_fkey] FOREIGN KEY ([hotel_id]) REFERENCES [dbo].[hotels]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
