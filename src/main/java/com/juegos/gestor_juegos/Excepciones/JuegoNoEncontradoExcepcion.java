package com.juegos.gestor_juegos.Excepciones;

public class JuegoNoEncontradoExcepcion extends RuntimeException {
    public JuegoNoEncontradoExcepcion(Integer id){
        super("No existe un juego con id " + id);
    }
    
}
