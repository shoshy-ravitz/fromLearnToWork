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
        public static string GeneratePresignedUrl(string objectKey, int expirationInMinutes, HttpVerb verb)
        {
            var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
            var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
            var region = Environment.GetEnvironmentVariable("AWS_REGION") ?? "us-east-1";
            var bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");

            var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));

            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = objectKey,
                Verb = verb, 
                Expires = DateTime.UtcNow.AddMinutes(expirationInMinutes)
            };

            var presignedUrl = s3Client.GetPreSignedURL(request);

            Console.WriteLine($"Generated Presigned URL: {presignedUrl}");

            return presignedUrl;
        }
    }
}