using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
    public class Agency
    {
        public string AgencyName { get; set; }
        public byte[] Logo { get; set; }
        public bool? ChildTransport { get; set; }
        public string LogoName { get; set; }

    }
}
