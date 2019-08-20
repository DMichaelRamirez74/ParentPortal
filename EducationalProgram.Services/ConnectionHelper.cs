using EducationalProgram.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Services
{
    public static class ConnectionHelper
    {
        public static IConnectionFactory GetConnection()
        {
            return new DbConnectionFactory("MyConString");
        }
    }
}
