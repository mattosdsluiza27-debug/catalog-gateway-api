package com.catalog.gateway.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    private final Map<String, Long> limitePorIp = new ConcurrentHashMap<>();
    private static final long INTERVALO = 200;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = request.getRemoteAddr();
        long agora = System.currentTimeMillis();

        if (limitePorIp.containsKey(ip) && (agora - limitePorIp.get(ip) < INTERVALO)) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Aguarde! Muitas requisições seguidas.");
            return false;
        }
        limitePorIp.put(ip, agora);
        return true;
    }
}
