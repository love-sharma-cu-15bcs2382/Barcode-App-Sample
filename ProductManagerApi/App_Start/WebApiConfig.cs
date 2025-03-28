using System.Web.Http;
using ProductManagerApi.Filters;
using System.Web.Http.Cors;
using System.Net.Http;

namespace ProductManagerApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Enable CORS globally for the application.
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors); // Apply CORS globally for all controllers

            // Register the API key filter globally
            config.Filters.Add(new ApiKeyAuthFilter());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
