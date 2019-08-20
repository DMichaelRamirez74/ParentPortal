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
    public class LocationRepository:Repository<ZipReports>
    {


        private DbContext _context;
        public LocationRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }


        public List<ZipReports> GetLocationInformationBy(string zipCode)
        {

            LocationDetails location = new LocationDetails();

            DataSet _dataSet = new DataSet();
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_GetLocationDetails";
                command.Parameters.Add(command.CreateParameter("@ZipCode", zipCode.Trim()));
                return this.ToList(command).ToList();

            }
        }
    }
}
