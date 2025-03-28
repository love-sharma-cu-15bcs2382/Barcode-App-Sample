namespace ProductManagerApi.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ProductManagerApi.Data.ProductDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ProductManagerApi.Data.ProductDbContext context)
        {
            // Optional seed data
        }
    }
}