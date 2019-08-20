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
    public class CenterService
    {
        private IConnectionFactory connectionFactory;
        public IList<Center> GetCenterDetail(Guid AgencyId)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var userRep = new CenterRepository(context);

            return userRep.GetCenterDetail(AgencyId);
        }

        public IList<Center> GetCenterAddressDetail(List<int> Ids)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var userRep = new CenterRepository(context);

            return userRep.GetCenterAddressDetail(Ids);
        }

    }
}
