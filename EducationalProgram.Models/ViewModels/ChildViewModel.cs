using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models.ViewModels
{
    public class ChildViewModel
    {
        public int ChildId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public string Disability { get; set; }
        public int ParentId { get; set; }
        public string Base64ProfilePicture { get; set; }
        public byte[] ProfilePicture { get; set; }

        public string ProfilePictureName { get; set; }
        public string ProfilePictureExtension { get; set; }

        public bool ShotRecordsAvailable { get; set; }

    }
}
