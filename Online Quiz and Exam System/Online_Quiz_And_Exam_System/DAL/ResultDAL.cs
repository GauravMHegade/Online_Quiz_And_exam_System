using Microsoft.Data.SqlClient;
using Online_Quiz_And_Exam_System.Models;
using Online_Quiz_And_Exam_System.Models;
using System.Collections.Generic;

namespace Online_Quiz_API.DAL
{
    public class ResultDAL
    {
        private readonly DbConnection _db;

        public ResultDAL(DbConnection db)
        {
            _db = db;
        }

        // =========================
        // SAVE RESULT
        // =========================
        public void SaveResult(TestResult result)
        {
            using SqlConnection con = _db.GetConnection();

            SqlCommand cmd = new SqlCommand(
                @"INSERT INTO TestResults 
                  (UserId, ModuleId, Score, TestDate)
                  VALUES (@u,@m,@s,GETDATE())", con);

            cmd.Parameters.AddWithValue("@u", result.UserId);
            cmd.Parameters.AddWithValue("@m", result.ModuleId);
            cmd.Parameters.AddWithValue("@s", result.Score);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        // =========================
        // GET USER RESULTS (DASHBOARD)
        // =========================
        public List<TestResult> GetResultsByUser(int userId)
        {
            List<TestResult> list = new();

            using SqlConnection con = _db.GetConnection();
            SqlCommand cmd = new SqlCommand(
                "SELECT * FROM TestResults WHERE UserId=@u", con);

            cmd.Parameters.AddWithValue("@u", userId);

            con.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                list.Add(new TestResult
                {
                    ResultId = (int)dr["ResultId"],
                    UserId = (int)dr["UserId"],
                    ModuleId = (int)dr["ModuleId"],
                    Score = (int)dr["Score"],
                    TestDate = (DateTime)dr["TestDate"]
                });
            }
            return list;
        }
    }
}
