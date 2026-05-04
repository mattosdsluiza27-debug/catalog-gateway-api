package com.catalog.gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MovieDetailDto {
    @JsonProperty("Title")
    private String title;

    @JsonProperty("Year")
    private String year;

    @JsonProperty("Plot")
    private String plot;

    @JsonProperty("Actors")
    private String actors;

    @JsonProperty("Director")
    private String director;

    @JsonProperty("imdbRating")
    private String rating;

    @JsonProperty("Poster")
    private String poster;
}
