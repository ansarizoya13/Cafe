using Cafe.Application.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data;

namespace Cafe.Application.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var foods = GetFoods();
            ViewBag.foods = foods;

            return View();
        }

        public ActionResult CartScreen()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Payment(string name, string email, string contact, string address, string totalPrice)
        {
            var details = new
            {
                name,
                email,
                contact,
                address,
            };

            ViewBag.StripePublishKey = ConfigurationManager.AppSettings["StripePublishableKey"].ToString();
            ViewBag.totalPrice = Convert.ToDecimal(totalPrice);

            return View();
        }

        #region Helper Methods
        public List<FoodModel> GetFoods()
        {
            try
            {
                List<FoodModel> foods = new List<FoodModel>();
                string connectionString = ConfigurationManager.ConnectionStrings["SQLConnectionString"].ToString();

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = new SqlCommand("usp_GetFoods", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        connection.Open();

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                FoodModel food = new FoodModel()
                                {
                                    FoodID = Convert.ToInt32(reader["FoodID"].ToString()),
                                    FoodName = reader["FoodName"].ToString(),
                                    FoodDescription = reader["FoodDescription"].ToString(),
                                    FoodPrice = Convert.ToDecimal(reader["Price"].ToString()),
                                    CategoryType = (Constants.CategoryType)Convert.ToInt32(reader["CategoryID"].ToString()),
                                    FoodImg = reader["FoodImg"].ToString()
                                };

                                foods.Add(food);
                            }
                        }
                    }
                }

                return foods;
            }
            catch
            {
                throw;
            }
        }
        #endregion
    }
}