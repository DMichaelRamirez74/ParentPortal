using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace EducationalProgram.Web.Utilities
{
    public class Logger
    {
        public static void Log(string Message, string ClassName, string FunctionName)
        {
            string ERROR_MESSAGE = string.Empty;

            ERROR_MESSAGE = System.Environment.NewLine;
            ERROR_MESSAGE += "[" + DateTime.Now.ToString() + "] : " + Message + "    [" + ClassName + "]     [" + FunctionName + "]";

            FileStream fileStream = null;
            StreamWriter streamWriter = null;
            try
            {
                string logFilePath = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\";

                logFilePath += DateTime.Now.ToString("MM-dd-yyyy") + "_Logs" + "." + "txt";

                if (logFilePath.Equals(""))
                {
                    return;
                }

                DirectoryInfo logDirInfo = null;
                FileInfo logFileInfo = new FileInfo(logFilePath);
                logDirInfo = new DirectoryInfo(logFileInfo.DirectoryName);
                if (!logDirInfo.Exists)
                {
                    logDirInfo.Create();
                }
                if (!logFileInfo.Exists)
                {
                    fileStream = logFileInfo.Create();
                }
                else
                {
                    fileStream = new FileStream(logFilePath, FileMode.Append);
                }
                streamWriter = new StreamWriter(fileStream);
                streamWriter.WriteLine(ERROR_MESSAGE);
            }
            finally
            {
                if (streamWriter != null) streamWriter.Close();
                if (fileStream != null) fileStream.Close();
            }
        }
    }
}