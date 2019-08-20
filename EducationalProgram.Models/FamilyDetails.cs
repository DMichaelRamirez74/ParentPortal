using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
    public class FamilyDetails
    {
        public Family family { get; set; }
        public List<Child> child { get; set; }
        public int CenterId { get; set; }
        public string PrimaryCenter { get; set; }
        public string SecondaryCenter { get; set; }
        public int ParentId { get; set; }
    }
}
