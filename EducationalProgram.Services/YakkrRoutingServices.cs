using EducationalProgram.DAL;
using EducationalProgram.DAL.Repositories;
using EducationalProgram.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Services
{
    public class YakkrRoutingServices
    {
        private IConnectionFactory connectionFactory;

        public Int64 Insert(YakkrRoutingLEAD yakkr)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var yakkrRepository = new YakkrRouting(context);
            return yakkrRepository.Insert(yakkr);
        }
    }
}
