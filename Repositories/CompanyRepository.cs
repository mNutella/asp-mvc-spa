using AspNetSpa.Data;
using AspNetSpa.Exceptions;
using AspNetSpa.Models;
using AspNetSpa.Repositories.Interfaces.Base;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetSpa.Repositories
{
  public class CompanyRepository : IRepositoryBase<DTO.Company>
  {
    private readonly AspNetSpaContex _dbContext;
    public CompanyRepository(AspNetSpaContex dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task AddAsync(DTO.Company companyDTO)
    {
      var company = new Company(companyDTO);
      await _dbContext.Companies.AddAsync(company);
      await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(DTO.Company companyDTO)
    {
      var companyEntity = await _dbContext.Companies.FindAsync(companyDTO.Id);
      if (companyEntity == null)
      {
        throw new DBNotFoundException();
      }

      companyEntity.Name = companyDTO.Name;
      companyEntity.Address = companyDTO.Address;
      companyEntity.Phone = companyDTO.Phone;

      try
      {
        await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
        when (!_dbContext.Companies.Any(x => x.Id == companyDTO.Id))
      {
        throw new DBNotFoundException();
      }
    }

    public async Task DeleteAsync(int id)
    {
      var companyEntity = await _dbContext.Companies
        .Include(c => c.Invoices)
        .SingleOrDefaultAsync(c => c.Id == id);
      if (companyEntity == null)
      {
        throw new DBNotFoundException();
      }

      var invoices = await _dbContext.Invoices
        .Where(i => i.Company.Id == id)
        .ToListAsync();

      _dbContext.RemoveRange(invoices);
      _dbContext.Remove(companyEntity);

      try
      {
        await _dbContext.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
        when (!_dbContext.Companies.Any(c => c.Id == id))
      {
        throw new DBNotFoundException();
      }
    }

    public async Task<List<DTO.Company>> GetAllAsync()
    {
      var companies = await _dbContext.Companies.ToListAsync();

      return companies.Select(c => new DTO.Company(c)).ToList();
    }

    public async Task<DTO.Company> GetAsync(int id)
    {
      var company = await _dbContext.Companies.FindAsync(id);
      if (company == null)
      {
        throw new DBNotFoundException();
      }

      return new DTO.Company(company);
    }
  }
}