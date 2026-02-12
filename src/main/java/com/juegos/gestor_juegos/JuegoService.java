package com.juegos.gestor_juegos;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.juegos.gestor_juegos.Enums.EstadoJuego;
import com.juegos.gestor_juegos.Enums.GeneroJuego;
import com.juegos.gestor_juegos.Excepciones.JuegoNoEncontradoExcepcion;

@Service
public class JuegoService {
    private final JuegoRepository juegoRepository;

    public JuegoService(JuegoRepository juegoRepository){
        this.juegoRepository = juegoRepository;
    }

    public List<Juego> getListaJuegos() {
        return juegoRepository.findAll();
    }

    public Juego guardar(Juego juego) {
        return juegoRepository.save(juego);
    }

    public void eliminarJuegoPorId(Integer id) {
        if(!juegoRepository.existsById(id)){
            throw new JuegoNoEncontradoExcepcion(id);
        }
        juegoRepository.deleteById(id);
    }


    public Juego agregarJuego(JuegoDTO juego) {
       
        return guardar(juego.toEntity());
    }

    public Juego buscarJuegoPorId(Integer id) {
        return juegoRepository.findById(id).orElseThrow(() -> new JuegoNoEncontradoExcepcion(id));
    }

    public Juego actualizarJuego(Integer id, JuegoDTO nuevoJuego){
       
        Juego juego = buscarJuegoPorId(id);

        juego.setDuracion(nuevoJuego.getDuracion());
        juego.setEstado(nuevoJuego.getEstado());
        juego.setGenero(nuevoJuego.getGenero());
        juego.setNombre(nuevoJuego.getNombre());
        
        return guardar(juego);
    }

    //BUSCADOR POR FILTRO
    public Page<Juego> buscarPorFiltro(EstadoJuego estado, GeneroJuego genero, Pageable pageable){
        
        if(estado != null && genero != null){
            return juegoRepository.findByEstadoAndGenero(estado, genero,pageable);
        }
        if(estado !=null){
            return juegoRepository.findByEstado(estado,pageable);
        }
        if(genero !=null){
            return juegoRepository.findByGenero(genero,pageable);
        }
        return juegoRepository.findAll(pageable);
    }

}
