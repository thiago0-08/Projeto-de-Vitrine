namespace Vitrine.Utils
{
    public class PaginationResponse<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
