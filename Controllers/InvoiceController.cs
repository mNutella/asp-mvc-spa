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
  public class InvoiceController : ControllerBase
  {
    private readonly ILogger<InvoiceController> _logger;
    private readonly InvoiceRepository _invoiceRepository;

    public InvoiceController(ILogger<InvoiceController> logger, InvoiceRepository invoiceRepository)
    {
      _logger = logger;
      _invoiceRepository = invoiceRepository;
    }

    [HttpPost]
    public async Task<ActionResult> PostInvoice(Invoice invoiceDTO)
    {
      try
      {
        await _invoiceRepository.AddAsync(invoiceDTO);
        return StatusCode(StatusCodes.Status201Created);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpPut]
    public async Task<ActionResult> PutInvoice(Invoice invoiceDTO)
    {
      try
      {
        await _invoiceRepository.UpdateAsync(invoiceDTO);
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

    [HttpDelete]
    public async Task<ActionResult> DeleteInvoice(int id)
    {
      try
      {
        await _invoiceRepository.DeleteAsync(id);
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
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
      try
      {
        return await _invoiceRepository.GetAllAsync();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
      try
      {
        return await _invoiceRepository.GetAsync(id);
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
