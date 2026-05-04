package com.catalog.gateway.service;

import com.catalog.gateway.client.OmdbClient;
import com.catalog.gateway.dto.MovieDetailDto;
import com.catalog.gateway.dto.OmdbResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ConsultaFilmeService {
    @Autowired
    private OmdbClient omdbClient;

    @Value("${omdb.api.key}")
    private String apikey;

    @Cacheable("filmes")
    public OmdbResponse pesquisar(String titulo, String ano, String tipo, Integer pagina) {

        log.info("Iniciando busca OMDb: {}, Ano: {}, Tipo: {}, Pagina: {}", titulo, ano, tipo, pagina);

        return omdbClient.buscarFilmes(titulo, ano, tipo, pagina, apikey);
    }

    @Cacheable("detalhes")
    public MovieDetailDto buscarDetalhes(String id, String plot) {

        log.info("Buscando detalhes completos ID: {} e plot: {}", id, plot);

        return omdbClient.buscarPorId(id, plot, apikey);
    }
}
