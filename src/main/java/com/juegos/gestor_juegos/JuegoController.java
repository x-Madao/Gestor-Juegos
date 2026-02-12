package com.juegos.gestor_juegos;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juegos.gestor_juegos.Enums.EstadoJuego;
import com.juegos.gestor_juegos.Enums.GeneroJuego;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/juegos") 
public class JuegoController {

    private final JuegoService juegoService;

    public JuegoController(JuegoService juegoService) {
        this.juegoService = juegoService;
    }

    @GetMapping
    public Page<JuegoDTO> listarJuegos(
        @RequestParam(required = false) EstadoJuego estado,
        @RequestParam(required = false) GeneroJuego genero, Pageable pageable) {
        
        return juegoService.buscarPorFiltro(estado, genero,pageable).map(JuegoDTO::fromEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JuegoDTO> buscarJuego(@PathVariable Integer id) {

        Juego juego = juegoService.buscarJuegoPorId(id);

        return ResponseEntity.ok(JuegoDTO.fromEntity(juego));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> borrarJuego(@PathVariable Integer id){

        juegoService.eliminarJuegoPorId(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<JuegoDTO> modificarJuego(@PathVariable Integer id,@RequestBody JuegoDTO nuevoJuego) {

        Juego actualizado = juegoService.actualizarJuego(id, nuevoJuego);

        return ResponseEntity.ok(JuegoDTO.fromEntity(actualizado));
    }
    
        
    @PostMapping
    public ResponseEntity<JuegoDTO> crearJuego(@Valid @RequestBody JuegoDTO juego) {
        
        Juego juegoCreado = juegoService.agregarJuego(juego);

        return ResponseEntity.status(HttpStatus.CREATED).body(JuegoDTO.fromEntity(juegoCreado));
    }

}
