using Amazon.S3.Model;
using Amazon.S3;
using Amazon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class UrlForAwsService
    {
        public string GeneratePresignedUrl(string bucketName, string objectKey, int expirationInMinutes)
        {
            // קריאת נתוני AWS מקובץ .env
            var accessKey = Environment.GetEnvironmentVariable("AWS:AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS:SecretKey");
            var region = Environment.GetEnvironmentVariable("AWS:Region") ?? "us-east-1"; // ברירת מחדל ל-us-east-1

            // יצירת לקוח S3 עם נתוני AWS
            var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));

            // יצירת בקשה ל-URL חתום
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = objectKey, // כאן צריך להיות רק שם הקובץ או הנתיב היחסי בתוך ה-Bucket
                Expires = DateTime.UtcNow.AddMinutes(expirationInMinutes)
            };

            var presignedUrl = s3Client.GetPreSignedURL(request);

            // הדפסת ה-URL החתום לצורך בדיקה
            Console.WriteLine($"Generated Presigned URL: {presignedUrl}");

            return presignedUrl;
        }
    }
}
