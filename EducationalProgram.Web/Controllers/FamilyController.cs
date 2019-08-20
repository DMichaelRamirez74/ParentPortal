using EducationalProgram.Models;
using EducationalProgram.Services;
using EducationalProgram.Web.Utilities;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Configuration;
using System.Web.Mvc;
using EducationalProgram.Models.ViewModels;
namespace EducationalProgram.Web.Controllers
{
    public class FamilyController : Controller
    {
        // GET: Family
        FamilyServices familyServices = new FamilyServices();
        CenterService centerService = new CenterService();
        YakkrRoutingServices yakkrService = new YakkrRoutingServices();
        static Guid AgencyId = Guid.Empty;
        static string base64StringLogo = null;
        static string base64Stringimg_07 = null;
        public ActionResult FamilyDetails()
        {
            AgencyId = new Guid(Request.QueryString["AgencyId"].ToString());




            return View();
        }

        public ActionResult Index()
        {
            return RedirectToAction("FamilyDetails", "Family", new { AgencyId = "97ad2fba-3239-4c75-b6fe-867ed63b06eb" });
        }

        [HttpPost]

        public ActionResult SaveFamilyDetails(FamilyViewModel familyviewModel,List<ChildViewModel> childViewModel)
        {
            bool Status = false;
            int parentId = 0;
            try
            {
                parentId = familyServices.Insert(familyviewModel,childViewModel);
                
                Status = parentId>0;
            }
            catch (Exception ex)
            {
                Status = false;
                Logger.Log(ex.Message.ToString(), "Family", "SaveFamilyDetails");
            }
            return Json(new { Status, parentId }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAddressDetail(List<int> Id)
        {
            IList<Center> lstCenter = new List<Center>();
            try
            {
                lstCenter = centerService.GetCenterAddressDetail(Id);
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "GetAddressDetail");
            }
            return Json(lstCenter);
        }

        public ActionResult Confirmation(Int64 Id)
        {
            StaffRegistrationInfo staff = null;
            if (Id != 0)
            {
                staff = familyServices.GetStaffDetailByYakkrId(Id);
            }
            return View(staff);
        }

        public ActionResult GetCenterAddressDetail()
        {
            IList<Center> lstCenter = new List<Center>();
            try
            {
                lstCenter = centerService.GetCenterDetail(AgencyId);
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "GetCenterAddressDetail");
            }
            return Json(lstCenter);
        }

        public ActionResult SendEmailForFSW(FamilyDetails family)
        {
            Int64 Id = 0;
            StaffRegistrationInfo staff = new StaffRegistrationInfo();
            bool isSent = false;
            try
            {
                Guid RoleId = new Guid("94CDF8A2-8D81-4B80-A2C6-CDBDC5894B6D");
                List<StaffRegistrationInfo> staffInfo = familyServices.GetEmailByCenterId(family.CenterId, AgencyId, RoleId);
                if (staffInfo.Count() > 0)
                {
                    int index = 0;
                    Guid staffId = familyServices.GetLastStaffId(family.CenterId);
                    if (staffInfo.Count > 1 && staffId != Guid.Empty)
                    {
                        index = staffInfo.FindIndex(a => a.Id == staffId);
                        if (index < staffInfo.Count - 1 && index != -1)
                            index = index + 1;
                        else
                            index = 0;
                    }
                    staff = staffInfo.ElementAt(index);
                    //TempData["ConfirmationDetail"] = staff;
                    string MailContent = GetMailContent(family);
                    isSent = Common.SendMessage(staff.EmailAddress, "Educational Center", MailContent);
                    if (isSent)
                    {
                        YakkrRoutingLEAD yakkr = new YakkrRoutingLEAD();
                        yakkr.Agencyid = AgencyId;
                        yakkr.StaffID = staff.UserId;
                        yakkr.CenterID = family.CenterId;
                        yakkr.ParentId = family.ParentId;
                        Id = yakkrService.Insert(yakkr);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "SendEmailForFSW");
            }
            return Json(Id);
        }

        public string GetMailContent(FamilyDetails family)
        {
            Agency agency = new Agency();
            agency = familyServices.GetAgencyDetail(AgencyId);
            string[] logoName = agency.AgencyName.Split(' ');
            string siteURI = Request.Url.OriginalString;
            Uri uriResource = new Uri(siteURI);
            agency.AgencyName = agency.AgencyName.Replace(" ", "%20");
            agency.AgencyName = agency.AgencyName.Replace("+", "%20");
            base64StringLogo = "https://" + uriResource.Authority + "/Content/images/" + agency.AgencyName + ".png";
            base64Stringimg_07 = "https://" + uriResource.Authority + "/Content/images/img_07.jpg";
            string EMailTemplate = string.Empty;
            StreamReader reader = new StreamReader(Server.MapPath("~/Template/email.html"));
            EMailTemplate = reader.ReadToEnd();
            //Parent Info
            EMailTemplate = EMailTemplate.Replace("##ParentName##", family.family.FirstName + " " + family.family.LastName);
            EMailTemplate = EMailTemplate.Replace("##DOB##", family.family.DOB.ToShortDateString());
            EMailTemplate = EMailTemplate.Replace("##ADDRESS##", family.family.Address);
            EMailTemplate = EMailTemplate.Replace("##ADDRESS##", family.family.Address);
            EMailTemplate = EMailTemplate.Replace("##CITY##", family.family.City);
            EMailTemplate = EMailTemplate.Replace("##STATE##", family.family.State);
            EMailTemplate = EMailTemplate.Replace("##ZIPCODE##", family.family.ZipCode);
            EMailTemplate = EMailTemplate.Replace("##EMAIL##", !string.IsNullOrEmpty(family.family.EmailAddress) ? family.family.EmailAddress : " ");
            EMailTemplate = EMailTemplate.Replace("##TRANSPORT##", family.family.ChildTransport == null || family.family.ChildTransport == false ? "No" : "Yes");
            EMailTemplate = EMailTemplate.Replace("##PHONE##", family.family.PhoneNumber);
            EMailTemplate = EMailTemplate.Replace("##IMAGELOGO##", base64StringLogo);
            EMailTemplate = EMailTemplate.Replace("##IMAGELINE##", base64Stringimg_07);
            if (logoName.Length == 2)
            {
                EMailTemplate = EMailTemplate.Replace("##LOGOFIRST##", logoName[0].ToString());
                EMailTemplate = EMailTemplate.Replace("##LOGOLAST##", logoName[1].ToString());
            }
            else
            {
                EMailTemplate = EMailTemplate.Replace("##LOGOFIRST##", logoName[0].ToString());
            }
            string Location = Convert.ToBoolean(family.family.IsHomeBased) == true ? "Home Based " : "";
            Location += Convert.ToBoolean(family.family.IsPartyDay) == true ? "- Party Day " : "";
            Location += Convert.ToBoolean(family.family.IsFullDay) == true ? "- Full Day " : "";
            Location = Location.TrimStart('-').TrimEnd('-').Trim();

            //Location Info
            EMailTemplate = EMailTemplate.Replace("##LOCATION##", Location);
            EMailTemplate = EMailTemplate.Replace("##PRIMARYCENTER##", family.PrimaryCenter);
            EMailTemplate = EMailTemplate.Replace("##SECONDARYCENTER##", family.SecondaryCenter);

            //Child Info
            StreamReader childreader = new StreamReader(Server.MapPath("~/Template/email_child.html"));
            string ChildTemplate = childreader.ReadToEnd();
            string tempChildTemplate = string.Empty;
            StringBuilder sbChild = new StringBuilder();
            foreach (Child objChild in family.child)
            {
                tempChildTemplate = ChildTemplate;
                tempChildTemplate = tempChildTemplate.Replace("##CHILDNAME##", objChild.FirstName + " " + objChild.LastName);
                tempChildTemplate = tempChildTemplate.Replace("##CHILDDOB##", objChild.DOB.ToShortDateString());
                tempChildTemplate = tempChildTemplate.Replace("##CHILDGENDER##", objChild.Gender);
                tempChildTemplate = tempChildTemplate.Replace("##CHILDDISABILITY##", objChild.Disability);
                tempChildTemplate = tempChildTemplate.Replace("##IMAGELINE##", base64Stringimg_07);
                sbChild.Append(tempChildTemplate);
            }
            EMailTemplate = EMailTemplate.Replace("##CHILDTEMPLATE##", sbChild.ToString());
            return EMailTemplate;
        }

        public ActionResult ValidateCaptcha(string response)
        {
            string secret = WebConfigurationManager.AppSettings["recaptchaPrivateKey"];
            var client = new WebClient();
            var reply = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, response));
            return Json(reply, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckTransportForAgency()
        {
            bool isExist = false;
            try
            {
                isExist = familyServices.CheckTransportForAgency(AgencyId);
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "CheckParentNameExist");
            }
            return Json(isExist);
        }

        public ActionResult GetAgencyDetail()
        {
            Agency agency = new Agency();
            try
            {
                agency = familyServices.GetAgencyDetail(AgencyId);

                if (agency.Logo != null)
                {
                    var path = Path.Combine(Server.MapPath("~/Content/images/"), agency.AgencyName + ".png");
                    MemoryStream ms = new MemoryStream(agency.Logo);
                    Image image = Image.FromStream(ms);
                    // Save the file into folder 
                    image.Save(path);
                }


            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "CheckParentNameExist");
            }
            return Json(agency);
        }

        public ActionResult CheckParentNameExist(string FirstName, string LastName)
        {
            bool isExist = false;
            try
            {
                isExist = familyServices.CheckParentNameExist(FirstName, LastName);
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "CheckParentNameExist");
            }
            return Json(isExist);
        }


        public ActionResult CheckAddress(string address, string apartmentNumber, string zipCode)
        {
            bool isExists = false;

            try
            {
                isExists = familyServices.CheckAddress(address, apartmentNumber, zipCode);

            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "CheckAddress");
            }

            return Json(isExists, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLocationInformationByZipCode(string zipCode)
        {
            var zipReports = new List<ZipReports>();
            try
            {
                zipReports = familyServices.GetLocationInformationBy(zipCode);
            }
            catch (Exception ex)
            {
                Logger.Log(ex.Message.ToString(), "Family", "GetLocationInformationByZipCode");
            }

            return Json(zipReports, JsonRequestBehavior.AllowGet);
        }
    }
}