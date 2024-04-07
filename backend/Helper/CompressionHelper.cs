using System;
using System.IO;
using System.IO.Compression;
namespace _315HealthCareProject.Helper

{


    public static class CompressionHelper
    {
        public static byte[] Compress(byte[] data)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (DeflateStream deflateStream = new DeflateStream(memoryStream, CompressionMode.Compress))
                {
                    deflateStream.Write(data, 0, data.Length);
                }
                return memoryStream.ToArray();
            }
        }

        public static byte[] Decompress(byte[] data)
        {
            using (MemoryStream memoryStream = new MemoryStream(data))
            using (DeflateStream deflateStream = new DeflateStream(memoryStream, CompressionMode.Decompress))
            using (MemoryStream decompressedStream = new MemoryStream())
            {
                deflateStream.CopyTo(decompressedStream);
                return decompressedStream.ToArray();
            }
        }
    }

}
