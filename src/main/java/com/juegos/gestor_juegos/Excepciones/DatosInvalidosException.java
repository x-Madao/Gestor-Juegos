package com.juegos.gestor_juegos.Excepciones;

public class DatosInvalidosException extends RuntimeException{
    public DatosInvalidosException(String mensaje){
        super(mensaje);
    }
    
}
