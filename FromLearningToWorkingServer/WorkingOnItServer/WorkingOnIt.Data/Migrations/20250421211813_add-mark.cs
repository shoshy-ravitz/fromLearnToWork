using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FromLearningToWorking.Data.Migrations
{
    /// <inheritdoc />
    public partial class addmark : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Mark",
                table: "InterviewQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mark",
                table: "InterviewQuestions");
        }
    }
}
