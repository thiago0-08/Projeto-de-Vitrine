using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vitrine.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarLancamentosEstoqueEAtualizarProdutosCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string[]>(
                name: "Tamanhos",
                table: "Produtos",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(double[]),
                oldType: "double precision[]");

            migrationBuilder.AlterColumn<string>(
                name: "Imagem_categoria",
                table: "Categorias",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double[]>(
                name: "Tamanhos",
                table: "Produtos",
                type: "double precision[]",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]");

            migrationBuilder.AlterColumn<string>(
                name: "Imagem_categoria",
                table: "Categorias",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
