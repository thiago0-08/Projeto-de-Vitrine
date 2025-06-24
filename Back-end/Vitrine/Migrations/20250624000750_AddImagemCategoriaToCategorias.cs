using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vitrine.Migrations
{
    /// <inheritdoc />
    public partial class AddImagemCategoriaToCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Imagem_categoria",
                table: "Categorias",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imagem_categoria",
                table: "Categorias");
        }
    }
}
