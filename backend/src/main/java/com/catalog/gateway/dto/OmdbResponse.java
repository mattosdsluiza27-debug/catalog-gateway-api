package com.catalog.gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OmdbResponse {
    @JsonProperty("Search")
    private List<MovieDto> search;

    @JsonProperty("totalResults")
    private String totalResults;

    @JsonProperty("Response")
    private String response;
}
