using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace _315HealthCareProject.Models
{
    [Table("CHINHANH")]
    public class ChiNhanh
    {
        [Key]
        [Column("IDCHINHANH")]
        public int IdChiNhanh { get; set; }

        [Column("MACHINHANH")]
        public string MaChiNhanh { get; set; }

        [Column("TENCHINHANH")]
        public string TenChiNhanh { get; set; }

        [Column("DIENTHOAI")]
        public string DienThoai { get; set; }

        [Column("DIACHI")]
        public string DiaChi { get; set; }

        [Column("IDTINH")]
        public int IdTinh { get; set; }

        [Column("IDQUAN")]
        public int IdQuan { get; set; }

        [Column("IDPHUONG")]
        public int IdPhuong { get; set; }

        [Column("IDNVQUANLY")]
        public int IdNhanVienQuanLy { get; set; }

        [Column("IDCT")]
        public int IdCongTy { get; set; }

        [Column("IDCHUYENKHOA")]
        public int IdChuyenKhoa { get; set; }

        [Column("GHICHU")]
        public string GhiChu { get; set; }

        [Column("NGAYKHAITRUONG")]
        public DateTime NgayKhaiTruong { get; set; }

        [Column("TENTINH")]
        public string TenTinh { get; set; }

        [Column("TENQUAN")]
        public string TenQuan { get; set; }

        [Column("TENPHUONG")]
        public string TenPhuong { get; set; }

        [Column("CHUYENKHOA")]
        public string ChuyenKhoa { get; set; }
    }
}
