using ProductManagerApi.Models;
using System.Data.Entity;

namespace ProductManagerApi.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext() : base("name=ProductDbConnection")
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}