using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AspNetSpa.Models.Base;

namespace AspNetSpa.Models
{
  public class Company : BaseModel
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Phone { get; set; }
    public ICollection<Invoice> Invoices { get; set; }

    public Company() { }

    public Company(DTO.Company company)
    {
      Name = company.Name;
      Address = company.Address;
      Phone = company.Phone;
      CreatedDate = DateTime.Now.ToString();
    }
  }
}
