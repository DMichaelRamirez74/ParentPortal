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
    public class StaffRegistrationInfoRepository : Repository<StaffRegistrationInfo>
    {
        private DbContext _context;
        public StaffRegistrationInfoRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public List<StaffRegistrationInfo> GetEmailByCenterId(int CenterId, Guid AgencyId, Guid RoleId)
        {
            string Email = string.Empty;
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetEmailByCenter";
                command.Parameters.Add(command.CreateParameter("@CenterId", CenterId));
                command.Parameters.Add(command.CreateParameter("@AgencyId", AgencyId));
                command.Parameters.Add(command.CreateParameter("@RoleId", RoleId));
                return this.ToList(command).ToList();
            }
        }

        public Guid GetLastStaffId(int CenterId)
        {
            Guid staffId = Guid.Empty;
            string Email = string.Empty;
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetLastStaffId";
                command.Parameters.Add(command.CreateParameter("@CenterId", CenterId));
                object result = command.ExecuteScalar();
                if (result != null)
                    staffId = new Guid(result.ToString());
                return staffId;
            }
        }

        public StaffRegistrationInfo GetStaffDetailByYakkrId(Int64 YakkrId)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetStaffDetailByYakkrId";
                command.Parameters.Add(command.CreateParameter("@YakkrId", YakkrId));
                return this.ToList(command).FirstOrDefault();
            }
        }
    }
}
