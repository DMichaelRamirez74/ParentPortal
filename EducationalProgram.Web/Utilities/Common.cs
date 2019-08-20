using EducationalProgram.Models;
using EducationalProgram.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.IO;

namespace EducationalProgram.Web.Utilities
{
    public static class Common
    {
        static CenterService center;
        public static List<SelectListItem> GetCenter(Guid agencyId)
        {
            center = new CenterService();
            List<SelectListItem> items = new List<SelectListItem>();
         //   Guid AgencyId = new Guid("97ad2fba-3239-4c75-b6fe-867ed63b06eb");
            IList<Center> centerDetail= center.GetCenterDetail(agencyId);
            items.Add(new SelectListItem { Text = "Choose Center", Value = "0", Selected = true });
            foreach (Center objCenter in centerDetail)
            {
                items.Add(new SelectListItem { Text= objCenter.CenterName,Value= objCenter.CenterId.ToString() ,Selected=false});
            }
            return items;
        }

        public static List<SelectListItem> states()
        {
            List<SelectListItem> items = new List<SelectListItem>() { 
            //List<State> los = new List<State> {
            new SelectListItem { Value="0",Text= "Select State" },
            new SelectListItem {Value= "AL", Text="AL-Alabama" },
            new SelectListItem {Value="AK", Text="AK-Alaska" },new SelectListItem { Value="AB",Text= "AB-Alberta" },
            new SelectListItem {Value="AZ", Text="AZ-Arizona" },new SelectListItem { Value="AR",Text= "AR-Arakansas"},
            new SelectListItem {Value="BC", Text="BC-British Columbia" },new SelectListItem{ Value="CA",Text= "CA-California"},
            new SelectListItem {Value="CO", Text= "CO-Colorado" },new SelectListItem{ Value="CT",Text= "CT-Connecticut"},
            new SelectListItem {Value="DE",Text= "DE-Delaware" },new SelectListItem{ Value="FL",Text= "FL-Florida"},
            new SelectListItem{Value="GA", Text="GA-Georiga" },new SelectListItem{ Value="GU",Text= "GU-Guam"},
            new SelectListItem {Value= "HI",Text= "HI-Hawali" },new SelectListItem{ Value="ID",Text= "ID-Idaho"},
            new SelectListItem {Value= "IL",Text= "IL-Illinois" },new SelectListItem{ Value="UB",Text= "UB-Indiana"},
            new SelectListItem {Value="IA",Text= "IA-Iowa" },new SelectListItem{ Value="KS",Text= "KS-Kansas"},
            new SelectListItem {Value="KY",Text= "KY-Kentucky" },new SelectListItem{ Value="LA",Text= "LA-Louisiana"},
            new SelectListItem {Value="ME",Text= "ME-Maine" },new SelectListItem{ Value="MB",Text= "MB-Manitoba"},
            new SelectListItem {Value= "MD",Text= "MD-Maryland" },new SelectListItem{ Value="MA",Text= "MA-Massachusetts"},
            new SelectListItem { Value= "MI",Text= "MI-Michigan" },new SelectListItem{ Value="MN",Text= "MN-Minnesota"},
            new SelectListItem {Value= "MS", Text="MS-Mississippi" },new SelectListItem{ Value="MO",Text= "MO-Missouri"},
            new SelectListItem {Value= "MT",Text= "MT-Montana" },new SelectListItem{ Value="NE",Text= "NE-Nebraska"},
            new SelectListItem {Value= "NV",Text= "NV-Nevada" },new SelectListItem{ Value="NB",Text= "NB-New Brunswick"},
            new SelectListItem { Value="NH",Text= "NH-New Hampshire" },new SelectListItem{ Value="NJ",Text= "NJ-New Jersey"},
            new SelectListItem { Value= "NM",Text= "NM-New Mexico" },new SelectListItem{ Value="NY",Text= "NY-New York"},
            new SelectListItem { Value= "NF",Text= "NF-Newfoundland" },new SelectListItem{ Value="NC",Text= "NC-North Carolina"},
            new SelectListItem{  Value="ND", Text="ND-North Dakota" },new SelectListItem{ Value="NT",Text= "NT-Northwest Territories"},
            new SelectListItem{ Value="NS",Text= "NS-Nova Scotia" },new SelectListItem{ Value="NU",Text= "NU-Nunavut"},
            new SelectListItem { Value = "OH", Text = "OH-Ohio" },new SelectListItem{ Value="OK",Text= "OK-Oklahoma"},
            new SelectListItem { Value = "ON", Text = "ON-Ontario" },new SelectListItem{ Value="OR",Text= "OR-Oregon"},
            new SelectListItem { Value ="PA",Text = "PA-Pennsylvania" },new SelectListItem{ Value="PE",Text= "PE-Prince Edward Island"},
            new SelectListItem { Value ="PR",Text = "PR-Puerto Rico" },new SelectListItem{ Value="QC",Text= "QC-Quebec"},new SelectListItem { Value= "RI",Text= "RI-Rhode Island"},
            new SelectListItem { Value ="SK",Text = "SK-Saskatchewan" },new SelectListItem{ Value="SC", Text = "SC-South Carolina" },
            new SelectListItem { Value ="SD",Text = "SD-South Dakota" },new SelectListItem{ Value="TN", Text = "TN-Tennessee" },
            new SelectListItem { Value ="TX",Text = "TX-Texas" },new SelectListItem{ Value="UT", Text = "UT-Itah" },
            new SelectListItem { Value ="VT",Text = "VT-Vermont" },new SelectListItem{ Value="VI", Text = "VI-Virgin Islands" },
            new SelectListItem { Value ="VA",Text = "VA-Virginia" },new SelectListItem{ Value="WA", Text = "WA-Washington" },
            new SelectListItem { Value ="WV",Text = "WV-West Virginia" },new SelectListItem{ Value="WI", Text = "WI-Wisconsin" },
            new SelectListItem { Value ="WY", Text ="WY-Wyoming" },new SelectListItem{ Value="YT", Text = "YT-Yukon Territory" }
            };
            return items;
        }


        public static bool SendMessage(string toAddress, string subjectText, string bodyText)
        {
            bool isSent = false;
            string message = "";
            string smtpServerAddress = "";
            string smtpUserName = "";
            string smtpPassword = "";
            string fromAddress = "";
            int smtpPort = 0;
            try
            {
                MailMessage mailMessage = new MailMessage();

                smtpServerAddress = ConfigurationManager.AppSettings["SMTPServer"];
                smtpUserName = ConfigurationManager.AppSettings["SMTPUser"].ToString();
                smtpPassword = ConfigurationManager.AppSettings["SMTPPassword"].ToString();
                fromAddress = ConfigurationManager.AppSettings["SMTPUser"].ToString();
                smtpPort = Convert.ToInt32(ConfigurationManager.AppSettings["SMTPPort"].ToString());

                mailMessage.IsBodyHtml = true;

                mailMessage.From = new MailAddress(fromAddress);

                mailMessage.To.Clear();
                mailMessage.To.Add(new MailAddress(toAddress));

                mailMessage.Subject = subjectText;

                mailMessage.Body = bodyText;

                var client = new SmtpClient(smtpServerAddress, smtpPort)
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(smtpUserName, smtpPassword),
                    EnableSsl = true
                };

                client.Send(mailMessage);
                message = "Mail successfully sent to registered email id";
                isSent = true;
                Logger.Log(message, "SendMail", "SendMessage");
            }
            catch (SmtpException smptex)
            {
                message = "SMTP Exception caught" + smptex.Message.ToString();
                Logger.Log(message, "SendMail", "SendMessage");
            }
            catch (Exception ex)
            {
                message = "Exception caught" + ex.Message.ToString();
                Logger.Log(message, "SendMail", "SendMessage");
            }

            return isSent;
        }

        public static string ConvertImageIntoBase64(string path)
        {
            string base64String = string.Empty;
            //string path = Server.MapPath("~/Content/images/logo.png");
            using (System.Drawing.Image image = System.Drawing.Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();
                    base64String = Convert.ToBase64String(imageBytes);                   
                }
            }
            return base64String;
        }
    }
    
}