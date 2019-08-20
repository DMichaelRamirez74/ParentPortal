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
    public class YakkrRouting : Repository<YakkrRoutingLEAD>
    {
        private DbContext _context;
        public YakkrRouting(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public Int64 Insert(YakkrRoutingLEAD yakkr)
        {
            int InsertedId = 0;
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_YakkrRoutingLEAD";
                command.Parameters.Add(command.CreateParameter("@Agencyid", yakkr.Agencyid));
                command.Parameters.Add(command.CreateParameter("@StaffID", yakkr.StaffID));
                command.Parameters.Add(command.CreateParameter("@CenterID", yakkr.CenterID));
                command.Parameters.Add(command.CreateParameter("@ParentId", yakkr.ParentId));
                object result = command.ExecuteScalar();
                if (result != null)
                    InsertedId = Convert.ToInt32(result);
                return InsertedId;
            }
        }

    }
}
