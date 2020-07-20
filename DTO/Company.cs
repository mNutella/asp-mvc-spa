using System.Collections.Generic;
using AspNetSpa.DTO.Base;

namespace AspNetSpa.DTO
{
  public class Company : BaseDTO
  {
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public ICollection<Invoice> Invoices { get; set; }

    public Company() { }

    public Company(Models.Company company)
    {
      Id = company.Id;
      CreatedDate = company.CreatedDate;
      Name = company.Name;
      Address = company.Address;
      Phone = company.Phone;
    }
  }
}