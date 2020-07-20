using AspNetSpa.Enums;
using System.ComponentModel.DataAnnotations;
using AspNetSpa.DTO.Base;

namespace AspNetSpa.DTO
{
  public class Invoice : BaseDTO
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public InvoiceTypes Type { get; set; }
    public decimal Amount { get; set; }
    public Company Company { get; set; }

    public Invoice() { }

    public Invoice(Models.Invoice invoice)
    {
      Id = invoice.Id;
      Name = invoice.Name;
      Type = invoice.Type;
      Amount = invoice.Amount;
      Company = new Company(invoice.Company);
      CreatedDate = invoice.CreatedDate;
    }
  }
}
