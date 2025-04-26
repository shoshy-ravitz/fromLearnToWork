using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FromLearningToWorking.Data.Migrations
{
    /// <inheritdoc />
    public partial class changenameoffinterviewQuestionvalue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserAnswer",
                table: "InterviewQuestions",
                newName: "Feedback");

            migrationBuilder.RenameColumn(
                name: "AiFeedback",
                table: "InterviewQuestions",
                newName: "Answer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Feedback",
                table: "InterviewQuestions",
                newName: "UserAnswer");

            migrationBuilder.RenameColumn(
                name: "Answer",
                table: "InterviewQuestions",
                newName: "AiFeedback");
        }
    }
}
