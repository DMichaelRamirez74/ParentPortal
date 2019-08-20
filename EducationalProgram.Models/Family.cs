using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.Models
{
    public class Family
    {
        public int ParentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public byte[] ProfilePicture { get; set; }
        public int PrimaryLanguageSpoken { get; set; }
        public string ProfilePictureName { get; set; }
        public string ProfilePictureExtension { get; set; }
        public string ApartmentNo { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber {  get; set; }
        public string Extension { get; set; }
        public Int64? PrimaryCenterId { get; set; }
        public Int64? SecondaryCenter { get; set; }
        public bool IsHomeBased { get; set; }
        public bool IsPartyDay { get; set; }
        public bool IsFullDay { get; set; }
        public bool? ChildTransport { get; set; }
        public string EmailAddress { get; set; }

        public bool IsSchoolDay { get; set; }
        public bool? IncomeStatement { get; set; }

        public bool? ReceivedChildSupport { get; set; }

    }
}
