package com.juegos.gestor_juegos;
import com.juegos.gestor_juegos.Enums.EstadoJuego;
import com.juegos.gestor_juegos.Enums.GeneroJuego;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity


public class Juego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;    

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 1, max = 50, message = "El nombre debe tener entre 1 y 50 caracteres")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El estado es obligatorio")
    private EstadoJuego estado;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El genero es obligatorio")
    private GeneroJuego genero;

    @NotNull(message = "La duracion es obligatoria")
    @Min(value = 1,message = "La duracion debe ser mayor a 0")
    @Max(value = 1000, message = "La duracion no puede superar 1000")
    private Integer duracion;

    public Juego(String suNombre,EstadoJuego estadoActual,GeneroJuego genero,Integer duracion){
        this.nombre = suNombre;
        this.estado = estadoActual;
        this.genero = genero;
        this.duracion = duracion;
    }

    public Juego(){}

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nuevoNombre){
        nombre = nuevoNombre;
    }

    public EstadoJuego getEstado(){
        return estado;
    }

    public void setEstado(EstadoJuego nuevoEstado){
        estado = nuevoEstado;
    }

    public GeneroJuego getGenero(){
        return genero;
    }

    public void setGenero(GeneroJuego nuevoGenero){
        genero = nuevoGenero;
    }

    public Integer getDuracion(){
        return duracion;
    }

    public void setDuracion(Integer nuevaDuracion){
        duracion = nuevaDuracion;
    }

    public Integer getId() {
        return id;
    }
}

