package com.catalog.gateway.controller;

import com.catalog.gateway.dto.MovieDetailDto;
import com.catalog.gateway.dto.OmdbResponse;
import com.catalog.gateway.service.ConsultaFilmeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/filmes")
public class MovieController {

    @Autowired
    private ConsultaFilmeService consultaFilmeService;

    @GetMapping("/buscar")
    public OmdbResponse buscar(
            @RequestParam String titulo,
            @RequestParam(required = false) String ano,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false, defaultValue = "1") Integer pagina) {
                log.info("Requisição recebida - Busca: '{}' | Filtros: Ano: {}, Tipo: {}, Página: {}", titulo, ano, tipo, pagina);
                return consultaFilmeService.pesquisar(titulo, ano, tipo, pagina);
    }

    @GetMapping("/{id}")
    public MovieDetailDto detalhes(
            @PathVariable String id,
            @RequestParam(defaultValue = "short") String plot){
        log.info("Requisição recebida - Detalhes do ID: {} | Formato do Plot: {}", id, plot);
        return consultaFilmeService.buscarDetalhes(id, plot);
    }
}
