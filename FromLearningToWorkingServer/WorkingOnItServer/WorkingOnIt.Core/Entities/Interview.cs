using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.Entities
{
    public class Interview
    {
        [Key]
        public int Id { get; set; }
        public DateTime InterviewDate { get; set; }

        // קשרים
        public int UserId { get; set; }
        public User User { get; set; }

        public List<InterviewQuestion> Questions { get; set; }

        public List<TotalResultInterview> TotalResultInterview { get; set; }
        public int?
            Mark
        { get; set; } // ציון אופציונלי
        public TimeOnly? Time { get; set; }
        public string? Feedback { get; set; }
    }
}
