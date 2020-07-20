using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetSpa.DTO.Base;

namespace AspNetSpa.Repositories.Interfaces.Base
{
  public interface IRepositoryBase<D>
    where D : BaseDTO
  {
    public Task AddAsync(D dto);
    public Task UpdateAsync(D dto);
    public Task DeleteAsync(int id);
    public Task<List<D>> GetAllAsync();
    public Task<D> GetAsync(int id);
  }
}