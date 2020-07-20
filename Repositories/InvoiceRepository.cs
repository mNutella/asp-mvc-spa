using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetSpa.Data;
using AspNetSpa.Exceptions;
using AspNetSpa.Models;
using AspNetSpa.Repositories.Interfaces.Base;
using Microsoft.EntityFrameworkCore;

namespace AspNetSpa.Repositories
{
  public class InvoiceRepository : IRepositoryBase<DTO.Invoice>
  {
    private readonly AspNetSpaContex _dbContext;
    public InvoiceRepository(AspNetSpaContex dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task AddAsync(DTO.Invoice invoiceDTO)
    {
      var companyEntity = await _dbContext.Companies
        .FindAsync(invoiceDTO.Company.Id);
      if (companyEntity == null)
      {
        throw new DBNotFoundException();
      }

      var invoice = new Invoice(invoiceDTO, companyEntity);
      await _dbContext.Invoices.AddAsync(invoice);
      await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(DTO.Invoice invoiceDTO)
    {
      var invoiceEntity = await _dbContext.Invoices.FindAsync(invoiceDTO.Id);
      if (invoiceEntity == null)
      {
        throw new DBNotFoundException();
      }
      var companyEntity = await _dbContext.Companies
        .FindAsync(invoiceDTO.Company.Id);
      if (companyEntity == null)
      {
        throw new DBNotFoundException();
      }

      invoiceEntity.Name = invoiceDTO.Name;
      invoiceEntity.Type = invoiceDTO.Type;
      invoiceEntity.Amount = invoiceDTO.Amount;
      invoiceEntity.Company = companyEntity;

      try
      {
        await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
        when (
          !_dbContext.Invoices.Any(x => x.Id == invoiceDTO.Id) ||
          !_dbContext.Companies.Any(x => x.Id == invoiceDTO.Company.Id))
      {
        throw new DBNotFoundException();
      }
    }

    public async Task DeleteAsync(int id)
    {
      var invoiceEntity = await _dbContext.Invoices
        .SingleOrDefaultAsync(c => c.Id == id);
      if (invoiceEntity == null)
      {
        throw new DBNotFoundException();
      }

      _dbContext.Remove(invoiceEntity);

      try
      {
        await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
        when (!_dbContext.Invoices.Any(i => i.Id == id))
      {
        throw new DBNotFoundException();
      }
    }

    public async Task<List<DTO.Invoice>> GetAllAsync()
    {
      var invoices = await _dbContext.Invoices
        .Include(i => i.Company)
        .Where(c => c.Company != null)
        .ToListAsync();

      return invoices.Select(c => new DTO.Invoice(c)).ToList();
    }

    public async Task<DTO.Invoice> GetAsync(int id)
    {
      var invoiceEntity = await _dbContext.Invoices
        .Include(i => i.Company)
        .SingleOrDefaultAsync(i => i.Id == id);
      if (invoiceEntity == null)
      {
        throw new DBNotFoundException();
      }

      return new DTO.Invoice(invoiceEntity);
    }
  }
}
