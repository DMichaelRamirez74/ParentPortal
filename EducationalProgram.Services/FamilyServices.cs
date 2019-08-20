using EducationalProgram.DAL;
using EducationalProgram.DAL.Repositories;
using EducationalProgram.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EducationalProgram.Models.ViewModels;

namespace EducationalProgram.Services
{
    public class FamilyServices
    {
        private IConnectionFactory connectionFactory;

        public int Insert(FamilyViewModel familyViewModel,List<ChildViewModel> childViewModel)
        {


            

            AutoMapper.Mapper.Initialize(cfg => cfg.CreateMap<FamilyViewModel, Family>());
            var family = AutoMapper.Mapper.Map<FamilyViewModel, Family>(familyViewModel);


            AutoMapper.Mapper.Initialize(cfg => cfg.CreateMap<List<ChildViewModel>, List<Child>>());

            var children = AutoMapper.Mapper.Map<List<ChildViewModel>, List<Child>>(childViewModel);

            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var familyRepository = new FamilyRepository(context);
            var childRepository = new ChildRepository(context);
            int ParentId = familyRepository.Insert(family);
            childRepository.Insert(children, ParentId);
            return ParentId;         
        }

        public List<StaffRegistrationInfo> GetEmailByCenterId(int CenterId,Guid AgencyId,Guid RoleId)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var staffRepository = new StaffRegistrationInfoRepository(context);
            return staffRepository.GetEmailByCenterId(CenterId, AgencyId, RoleId);
        }

        public bool CheckParentNameExist(string FirstName, string LastName)
        {
             connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
             var familyRepository = new FamilyRepository(context);
            return familyRepository.CheckParentNameExist(FirstName,LastName);
        }

        public Guid GetLastStaffId(int CenterId)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var staffRepository = new StaffRegistrationInfoRepository(context);
            return staffRepository.GetLastStaffId(CenterId);
        }

        public bool CheckTransportForAgency(Guid AgencyId)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var familyRepository = new FamilyRepository(context);
            return familyRepository.CheckTransportForAgency(AgencyId);
        }
        public Agency GetAgencyDetail(Guid AgencyId)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var agencyRepository = new AgencyRepository(context);
            return agencyRepository.GetAgencyDetail(AgencyId);
        }
        public StaffRegistrationInfo GetStaffDetailByYakkrId(Int64 YakkrId)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);
            var staffRepository = new StaffRegistrationInfoRepository(context);
            return staffRepository.GetStaffDetailByYakkrId(YakkrId);
        }

        public bool CheckAddress(string address,string apartmentNo,string zipCode)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);
            var familyRepository = new FamilyRepository(context);
            return familyRepository.CheckAddress(address, apartmentNo, zipCode);
            
        }

        public List<ZipReports> GetLocationInformationBy(string zipcode)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);
            var locationRepository = new LocationRepository(context);
            return locationRepository.GetLocationInformationBy(zipcode);

           // var locationDetails = new LocationDetails();

            //if(zipReports!=null && zipReports.Count>0)
            //{
            //    var states = zipReports.Select(x => x.State).Distinct().ToList().FirstOrDefault();

            //    var counties = zipReports.Where(x => x.State == states).Select(x => x.County).ToList();

            //    locationDetails.StateDetails = new State
            //    {
            //        StateName = states
            //    }

            //}

        }
    }
}
