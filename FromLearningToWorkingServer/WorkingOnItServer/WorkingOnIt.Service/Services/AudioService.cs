//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FromLearningToWorking.Service.Services
//{
//    public class AudioService
//    {
//        public async Task<string> TranslateAudioAsync(IFormFile audioFile)
//        {
//            // Save the audio file temporarily
//            var filePath = Path.GetTempFileName();
//            using (var stream = new FileStream(filePath, FileMode.Create))
//            {
//                await audioFile.CopyToAsync(stream);
//            }

//            try
//            {
//                // Initialize Google Cloud Speech-to-Text client
//                var speechClient = SpeechClient.Create();

//                // Read the audio file
//                var audioBytes = await File.ReadAllBytesAsync(filePath);

//                var request = new RecognizeRequest
//                {
//                    Audio = new RecognitionAudio
//                    {
//                        Content = Google.Protobuf.ByteString.CopyFrom(audioBytes)
//                    },
//                    Config = new RecognitionConfig
//                    {
//                        Encoding = RecognitionConfig.Types.AudioEncoding.Linear16,
//                        SampleRateHertz = 16000,
//                        LanguageCode = "he-IL" // Hebrew
//                    }
//                };

//                // Perform speech-to-text
//                var response = await speechClient.RecognizeAsync(request);

//                // Extract transcription
//                var transcription = string.Join("\n", response.Results
//                    .Select(result => result.Alternatives.FirstOrDefault()?.Transcript));

//                return transcription;
//            }
//            finally
//            {
//                // Clean up the temporary file
//                if (File.Exists(filePath))
//                {
//                    File.Delete(filePath);
//                }
//            }
//        }
//    }
//}

