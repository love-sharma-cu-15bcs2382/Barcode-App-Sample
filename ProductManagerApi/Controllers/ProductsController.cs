using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ProductManagerApi.Data;
using ProductManagerApi.Filters;
using ProductManagerApi.Models;

namespace ProductManagerApi.Controllers
{
    [ApiKeyAuthFilter]
    public class ProductsController : ApiController
    {
        private readonly ProductDbContext _context = new ProductDbContext();

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_context.Products.ToList());
        }

        // New method to get product by Id
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id); // Find the product by ID

            if (product == null)
            {
                return NotFound(); // If product is not found, return a 404 status
            }

            return Ok(product); // Return the product with a 200 OK status
        }

        public IHttpActionResult Post([FromBody] Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Products.Add(product);
            _context.SaveChanges();

            var responseMessage = new
            {
                message = "Barcode Info saved successfully",
                barcodeData = product
            };

            return Created(Request.RequestUri + "/" + product.Id, responseMessage);
        }

        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] Product product)
        {
            var existing = _context.Products.Find(id);
            if (existing == null) return NotFound();
            existing.Name = product.Name;
            existing.Price = product.Price;
            existing.Barcode = product.Barcode;
            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
