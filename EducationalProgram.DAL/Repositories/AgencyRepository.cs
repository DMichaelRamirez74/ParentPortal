using EducationalProgram.DAL.Extensions;
using EducationalProgram.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.DAL.Repositories
{
    public class AgencyRepository : Repository<Agency>
    {
        private DbContext _context;
        public AgencyRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public Agency GetAgencyDetail(Guid AgencyId)
        {
            Agency agency = new Agency();
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetAgencyDetail";
                command.Parameters.Add(command.CreateParameter("@AgencyId", AgencyId));
                return this.ToList(command).FirstOrDefault();
            }
        }
    }
}
