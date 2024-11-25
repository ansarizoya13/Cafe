use Foodie
Go

create procedure usp_GetFoods
as 
begin
	select 
		FoodID, 
		FoodName, 
		FoodDescription,
		CategoryID,
		Price,
		FoodImg
	FROM Foods
end