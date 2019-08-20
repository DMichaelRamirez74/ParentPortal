using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
    public class YakkrRoutingLEAD
    {
        public Int64 YakkrId { get; set; }
        public Guid? Agencyid { get; set; }
        public Int64? Householdid { get; set; }
        public Guid StaffID { get; set; }
        public Guid? StaffIDR { get; set; }
        public int CenterID { get; set; }
        public int RouteCode { get; set; }
        public char Status { get; set; }
        public DateTime? DateEntered { get; set; }
        public DateTime? DateModified { get; set; }
        public int ParentId { get; set; }

    }
}
