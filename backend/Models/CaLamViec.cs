namespace _315HealthCareProject.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("CALAMVIEC")]
public class CaLamViec
{
    [Key]
    [Column("IDCALAMVIEC")]
    public int? IdCalamViec { get; set; }

    [Column("MACA")]
    public string? MaCa { get; set; }

    [Column("TENCA")]
    public string? TenCa { get; set; }

    [Column("BATDAU")]
    public string? BatDau { get; set; } 

    [Column("KETTHUC")]
    public string? KetThuc { get; set; } 

    [Column("SUDUNG")]
    public int? SuDung { get; set; } 

    [Column("GHICHU")]
    public string? GhiChu { get; set; }
}