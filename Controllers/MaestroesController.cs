using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Examen2;

namespace Examen2.Controllers
{
    public class MaestroesController : ApiController
    {
        private UniversidadEntities db = new UniversidadEntities();

        // GET: api/Maestroes
        public IQueryable<Maestro> GetMaestroes()
        {
            return db.Maestroes;
        }

        // GET: api/Maestroes/5
        [ResponseType(typeof(Maestro))]
        public async Task<IHttpActionResult> GetMaestro(int id)
        {
            Maestro maestro = await db.Maestroes.FindAsync(id);
            if (maestro == null)
            {
                return NotFound();
            }

            return Ok(maestro);
        }

        // PUT: api/Maestroes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMaestro(int id, Maestro maestro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != maestro.NCuenta)
            {
                return BadRequest();
            }

            db.Entry(maestro).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaestroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Maestroes
        [ResponseType(typeof(Maestro))]
        public async Task<IHttpActionResult> PostMaestro(Maestro maestro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Maestroes.Add(maestro);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MaestroExists(maestro.NCuenta))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = maestro.NCuenta }, maestro);
        }

        // DELETE: api/Maestroes/5
        [ResponseType(typeof(Maestro))]
        public async Task<IHttpActionResult> DeleteMaestro(int id)
        {
            Maestro maestro = await db.Maestroes.FindAsync(id);
            if (maestro == null)
            {
                return NotFound();
            }

            db.Maestroes.Remove(maestro);
            await db.SaveChangesAsync();

            return Ok(maestro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MaestroExists(int id)
        {
            return db.Maestroes.Count(e => e.NCuenta == id) > 0;
        }
    }
}