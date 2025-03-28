using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ProductManagerApi.Filters
{
    public class ApiKeyAuthFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var request = actionContext.Request;
            var apiKeyHeader = request.Headers.Authorization;

            // Check if Authorization header exists and matches the expected API key
            string expectedApiKey = ConfigurationManager.AppSettings["ApiKey"];
            if (apiKeyHeader == null || apiKeyHeader.Scheme != "Bearer" || apiKeyHeader.Parameter != expectedApiKey)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized)
                {
                    Content = new StringContent("Invalid or missing API key.")
                };
                return;
            }

            base.OnActionExecuting(actionContext);
        }
    }
}