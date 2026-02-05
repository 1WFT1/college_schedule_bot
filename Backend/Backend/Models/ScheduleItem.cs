namespace Backend.API.Models
{
    public class ScheduleItem
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string Subject { get; set; }
        public string Teacher { get; set; }
        public string Room { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsEvent { get; set; }
    }
}
