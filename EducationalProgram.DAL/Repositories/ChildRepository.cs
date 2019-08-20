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
    public class ChildRepository : Repository<Child>
    {
        private DbContext _context;
        public ChildRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public void Insert(List<Child> child,int ParentId)
        {            
            foreach(Child objChild in child)
            {
                using (var command = _context.CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "USP_Child";
                    command.Parameters.Add(command.CreateParameter("@Command", "Insert"));
                    command.Parameters.Add(command.CreateParameter("@FirstName", objChild.FirstName.Trim()));
                    command.Parameters.Add(command.CreateParameter("@LastName", objChild.LastName.Trim()));
                    command.Parameters.Add(command.CreateParameter("@DOB", objChild.DOB));
                    command.Parameters.Add(command.CreateParameter("@Gender", objChild.Gender.Trim()));
                    command.Parameters.Add(command.CreateParameter("@Disability", objChild.Disability.Trim()));
                    command.Parameters.Add(command.CreateParameter("@ParentId", ParentId));
                    command.ExecuteNonQuery();
                }
            }
            
        }
    }
}
