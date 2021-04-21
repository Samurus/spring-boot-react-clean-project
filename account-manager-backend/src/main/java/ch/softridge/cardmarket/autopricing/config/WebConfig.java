package ch.softridge.cardmarket.autopricing.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler(
        "/webjars/**",
        "assets/**",
        "/static/**")

        .addResourceLocations(
        "classpath:/META-INF/resources/webjars/",
        "classpath:/static/assets/",
            "classpath:/templates/static/"
    );

  }

  @Override
  public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
    configurer.defaultContentType(MediaType.APPLICATION_JSON);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**");
    registry.addMapping("/**/**");
  }

}
