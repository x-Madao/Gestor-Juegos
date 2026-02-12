package com.juegos.gestor_juegos;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.juegos.gestor_juegos.Enums.EstadoJuego;
import com.juegos.gestor_juegos.Enums.GeneroJuego;



public interface JuegoRepository extends JpaRepository<Juego, Integer> {

    Page<Juego> findByEstado(EstadoJuego estado, Pageable pageable);

    Page<Juego> findByGenero(GeneroJuego genero, Pageable pageable);

    Page<Juego> findByEstadoAndGenero(EstadoJuego estado, GeneroJuego genero, Pageable pageable);

    Page<Juego> findAll(Pageable pageable);
}
