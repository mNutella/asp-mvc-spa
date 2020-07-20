using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetSpa.Repositories;
using AspNetSpa.DTO;
using AspNetSpa.Exceptions;
using Microsoft.AspNetCore.Http;

namespace AspNetSpa.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CompanyController : ControllerBase
  {
    private readonly ILogger<CompanyController> _logger;
    private readonly CompanyRepository _companyRepository;

    public CompanyController(ILogger<CompanyController> logger, CompanyRepository companyRepository)
    {
      _logger = logger;
      _companyRepository = companyRepository;
    }

    [HttpPost]
    public async Task<ActionResult> PostCompany(Company companyDTO)
    {
      try
      {
        await _companyRepository.AddAsync(companyDTO);
        return StatusCode(StatusCodes.Status201Created);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpPut]
    public async Task<ActionResult> PutCompany(Company companyDTO)
    {
      try
      {
        await _companyRepository.UpdateAsync(companyDTO);
        return Ok();
      }
      catch (DBNotFoundException)
      {
        return NotFound();
      }
      catch (Exception)
      {
        return BadRequest();
      }
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteCompany(int id)
    {
      try
      {
        await _companyRepository.DeleteAsync(id);
        return Ok();
      }
      catch (DBNotFoundException)
      {
        return NotFound();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
    {
      try
      {
        return await _companyRepository.GetAllAsync();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
      try
      {
        return await _companyRepository.GetAsync(id);
      }
      catch (DBNotFoundException)
      {
        return NotFound();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
  }
}
