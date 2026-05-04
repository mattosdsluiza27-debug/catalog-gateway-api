package com.catalog.gateway.client;

import com.catalog.gateway.dto.MovieDetailDto;
import com.catalog.gateway.dto.OmdbResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "omdbClient", url = "${omdb.api.url}")
public interface OmdbClient {

    @GetMapping("/")
    OmdbResponse buscarFilmes(
            @RequestParam("s") String termo,
            @RequestParam(value = "y", required = false) String ano,
            @RequestParam(value = "type", required = false) String tipo,
            @RequestParam(value = "page", required = false) Integer pagina,
            @RequestParam("apiKey") String apikey
    );

    @GetMapping("/")
    MovieDetailDto buscarPorId(
            @RequestParam("i") String imdbId,
            @RequestParam("plot") String plot,
            @RequestParam("apikey") String apikey
    );
}
