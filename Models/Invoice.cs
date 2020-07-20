using AspNetSpa.Models.Base;
using AspNetSpa.Enums;
using System.ComponentModel.DataAnnotations;
using System;

namespace AspNetSpa.Models
{
  public class Invoice : BaseModel
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public InvoiceTypes Type { get; set; }
    public decimal Amount { get; set; }
    public Company Company { get; set; }

    public Invoice() { }

    public Invoice(DTO.Invoice invoice, Company company)
    {
      Name = invoice.Name;
      Amount = invoice.Amount;
      Type = invoice.Type;
      Company = company;
      CreatedDate = DateTime.Now.ToString();
    }
  }
}
