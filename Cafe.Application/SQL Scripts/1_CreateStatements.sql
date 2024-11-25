Create database Foodie;
Go

use Foodie;
Go

create table Category
(
	CategoryID int identity(1,1) primary key,
	CategoryName nvarchar(100),
);

create table Foods
(
	FoodID int identity(1,1),
	FoodName nvarchar(100),
	FoodDescription nvarchar(200),
	CategoryID int,
	primary key(FoodID),
	foreign key(CategoryID) references Category(CategoryID)

);

