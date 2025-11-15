import { useState, useEffect, useRef } from 'react'
import './App.css'

function ComponenteSemaforo({ semaforo, numeroSemaforo }) {
  return (
    <div className={`semaforo semaforo-${numeroSemaforo}`}>
      <img 
        src="/traffic-light-traffic-signal-light-sign-transparent-png-svg-vector-33.png" 
        alt="Semáforo" 
        className="imagen-semaforo" 
      />
      <div className="luces-semaforo">
        <div className={`luz-circular roja ${semaforo.rojo ? 'activa' : ''}`}></div>
        <div className={`luz-circular amarilla ${semaforo.amarillo ? 'activa' : ''}`}></div>
        <div className={`luz-circular verde ${semaforo.verde ? 'activa' : ''}`}></div>
      </div>
    </div>
  )
}

function App() {
  const [tiempoReferencia, setTiempoReferencia] = useState(0)
  const [semaforos, setSemaforos] = useState([
    { turno: 1, verde: false, rojo: false, amarillo: false },
    { turno: 2, verde: false, rojo: false, amarillo: false },
    { turno: 3, verde: false, rojo: false, amarillo: false },
    { turno: 4, verde: false, rojo: false, amarillo: false }
  ])

  const workerRef = useRef(null)

  useEffect(() => {
    const worker = new Worker('/semaforo.worker.js')
    workerRef.current = worker

    worker.onmessage = function(e) {
      const { tipo, tiempo, semaforos: semaforosWorker } = e.data

      if (tipo === 'actualizacion') {
        setTiempoReferencia(tiempo)
        setSemaforos(semaforosWorker)
      }
    }

    worker.postMessage({ comando: 'iniciar' })

    return () => {
      worker.postMessage({ comando: 'detener' })
      worker.terminate()
    }
  }, [])

  return (
    <div className="contenedor-principal">
      <div className="temporizador">
        Tiempo de referencia
        <div className="tiempo">{tiempoReferencia}s</div>
      </div>

      <div className="contenedor-cruce">
        <img src="/cruce.jpg" alt="Cruce de calles" className="imagen-cruce" />
        
        <ComponenteSemaforo semaforo={semaforos[0]} numeroSemaforo={1} />
        <ComponenteSemaforo semaforo={semaforos[1]} numeroSemaforo={2} />
        <ComponenteSemaforo semaforo={semaforos[2]} numeroSemaforo={3} />
        <ComponenteSemaforo semaforo={semaforos[3]} numeroSemaforo={4} />
      </div>
    </div>
  )
}

export default App
