using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FromLearningToWorking.Data.Migrations
{
    /// <inheritdoc />
    public partial class addfeedbackandmark : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Interviews",
                newName: "Mark");

            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "Interviews",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "Time",
                table: "Interviews",
                type: "time(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Interviews");

            migrationBuilder.RenameColumn(
                name: "Mark",
                table: "Interviews",
                newName: "Score");
        }
    }
}
