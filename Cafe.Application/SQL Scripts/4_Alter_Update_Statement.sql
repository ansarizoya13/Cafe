use Foodie
Go

alter table Foods
	add Price Decimal(4,2)
GO

Alter table Foods
	add FoodImg nvarchar(1000);
GO

Update Foods
	SET FoodImg = 'https://www.theseasonedmom.com/wp-content/uploads/2024/08/crockpot-spaghetti-8.jpg'
where FoodID = 1
