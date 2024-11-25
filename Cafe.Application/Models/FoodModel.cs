using Cafe.Application.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cafe.Application.Models
{
    public class FoodModel
    {
        public int FoodID { get; set; }
        public string FoodName { get; set; }
        public string FoodDescription { get; set; }
        public CategoryType CategoryType { get; set; }
        public decimal FoodPrice { get; set; }
        public string FoodImg { get; set; }
        
    }
}