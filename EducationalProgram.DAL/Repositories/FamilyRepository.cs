using EducationalProgram.DAL.Extensions;
using EducationalProgram.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationalProgram.DAL.Repositories
{
    public class FamilyRepository : Repository<Family>
    {
        private DbContext _context;
        public FamilyRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }


        public int Insert(Family family)
        {
            int ParentId = 0;
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_Family";
                command.Parameters.Add(command.CreateParameter("@Command", "Insert"));
                command.Parameters.Add(command.CreateParameter("@FirstName", family.FirstName.Trim()));
                command.Parameters.Add(command.CreateParameter("@LastName", family.LastName.Trim()));
                command.Parameters.Add(command.CreateParameter("@DOB", family.DOB));
                command.Parameters.Add(command.CreateParameter("@Address", family.Address.Trim()));
                command.Parameters.Add(command.CreateParameter("@City", family.City.Trim()));
                command.Parameters.Add(command.CreateParameter("@State", family.State.Trim()));
                command.Parameters.Add(command.CreateParameter("@ZipCode", family.ZipCode.Trim()));
                command.Parameters.Add(command.CreateParameter("@PhoneNumber", family.PhoneNumber.Trim()));
                command.Parameters.Add(command.CreateParameter("@Extension", family.Extension));
                command.Parameters.Add(command.CreateParameter("@PrimaryCenterId", family.PrimaryCenterId));
                command.Parameters.Add(command.CreateParameter("@Secondarycenter", family.SecondaryCenter));
                command.Parameters.Add(command.CreateParameter("@IsHomeBased", family.IsHomeBased));
                command.Parameters.Add(command.CreateParameter("@IsPartyDay", family.IsPartyDay));
                command.Parameters.Add(command.CreateParameter("@IsFullDay", family.IsFullDay));
                command.Parameters.Add(command.CreateParameter("@ChildTransport", family.ChildTransport));
                command.Parameters.Add(command.CreateParameter("@EmailAddress", family.EmailAddress));
                command.Parameters.Add(command.CreateParameter("@IsSchoolDay", family.IsSchoolDay));
                object result = command.ExecuteScalar();
                if (result != null)
                    ParentId = Convert.ToInt32(result);
                return ParentId;
            }
        }

        public bool CheckTransportForAgency(Guid AgencyId)
        {
            bool isExist = false;
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_CheckTransportForAgency";
                command.Parameters.Add(command.CreateParameter("@AgencyId", AgencyId));
                isExist = (bool)command.ExecuteScalar();
                return isExist;
            }
        }
        public bool CheckParentNameExist(string FirstName, string LastName)
        {
            bool isExist = false;
            using ( var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_CheckParentNameExist";
                command.Parameters.Add(command.CreateParameter("@FirstName", FirstName.Trim()));
                command.Parameters.Add(command.CreateParameter("@LastName", LastName.Trim()));
                int result =(int)command.ExecuteScalar();
                if (result > 0)
                    isExist = true;
                return isExist;
            }
        }

        public bool CheckAddress(string address, string apartmentNumber,string zipCode)
        {
            bool isExist = false;

            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "USP_CheckAddress";
                command.Parameters.Add(command.CreateParameter("@Address", address.Trim()));
                command.Parameters.Add(command.CreateParameter("@ApartmentNumber", apartmentNumber.Trim()));
                command.Parameters.Add(command.CreateParameter("@ZipCode", zipCode.Trim()));
                int result = (int)command.ExecuteScalar();

                if (result > 0)
                    isExist = true;

                return isExist;
            }
        }

        

    }
}
