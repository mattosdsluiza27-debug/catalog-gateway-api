package com.catalog.gateway;

import com.catalog.gateway.controller.MovieController;
import com.catalog.gateway.dto.OmdbResponse;
import com.catalog.gateway.service.ConsultaFilmeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MovieController.class)
public final class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConsultaFilmeService consultaFilmeService;

    @Test
    public void deveRetornarStatusOkAoBuscarFilme() throws Exception {

        OmdbResponse mockResponse = new OmdbResponse();
        mockResponse.setResponse("True");
        Mockito.when(consultaFilmeService.pesquisar(anyString(), any(), any(), any()))
                .thenReturn(mockResponse);

        mockMvc.perform(get("/api/filmes/buscar").param("titulo", "Batman"))
                .andExpect(status().isOk());
    }
}
