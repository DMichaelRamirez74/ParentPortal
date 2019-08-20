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
    public class CenterRepository : Repository<Center>
    {
        private DbContext _context;
        public CenterRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public IList<Center> GetCenterDetail(Guid AgencyId)
        {
            using ( var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetCenterDetail";
                command.Parameters.Add(command.CreateParameter("@AgencyId", AgencyId));
                return this.ToList(command).ToList();
            }
        }

        public IList<Center> GetCenterAddressDetail(List<int> Ids)
        {
            using (var command = _context.CreateCommand())
            {                
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetCenterAddress";
                command.Parameters.Add(command.CreateParameter("@PrimaryCenterId", Ids[0]));
                command.Parameters.Add(command.CreateParameter("@SecondaryCenterId", Ids[1]));
                return this.ToList(command).ToList();
            }
        }
    }
}
