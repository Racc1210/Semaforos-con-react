class Semaforo {
  constructor(turno) {
    this.verde = false
    this.rojo = true
    this.amarillo = false
    this.turno = turno
  }

  Verde() {
    this.verde = true
    this.rojo = false
    this.amarillo = false
  }

  Rojo() {
    this.rojo = true
    this.verde = false
    this.amarillo = false
  }

  Amarillo() {
    this.amarillo = true
    this.verde = false
    this.rojo = false
  }

  estado() {
    return {
      turno: this.turno,
      verde: this.verde,
      rojo: this.rojo,
      amarillo: this.amarillo
    }
  }
}

class Referencia {
  constructor() {
    this.tiempo = 0
  }

  avanzar() {
    this.tiempo += 1
    if (this.tiempo > 60) {
      this.tiempo = 1
    }
    return this.tiempo
  }
}

function Sincronizacion(semaforo, seccion, referencia) {
  if (referencia.tiempo >= seccion.inicio && referencia.tiempo <= seccion.fin-1) {
    if (referencia.tiempo <= seccion.fin - 4) {
      semaforo.Verde()
    } else {
      semaforo.Amarillo()
    }
  } else {
    semaforo.Rojo()
  }
}

let semaforos = []
let referencia = null
let secciones = []
let intervalo = null

function inicializar() {
  semaforos = []
  for (let i = 1; i <= 4; i++) {
    semaforos.push(new Semaforo(i))
  }

  referencia = new Referencia()

  const ciclo = 60
  const seccionTiempo = ciclo / 4
  secciones = []
  
  for (let s = 0; s < 4; s++) {
    secciones.push({
      inicio: (seccionTiempo * s) + 1,
      fin: seccionTiempo * (s + 1)
    })
  }

}

function Temporizador() {
  const tiempoActual = referencia.avanzar()
  for (let s = 0; s < semaforos.length; s++) {
    Sincronizacion(semaforos[s], secciones[s], referencia)
  }
  const estadosSemaforos = semaforos.map(sem => sem.estado())
  
  self.postMessage({
    tipo: 'actualizacion',
    tiempo: tiempoActual,
    semaforos: estadosSemaforos
  })

}

self.onmessage = function(e) {
  const { comando } = e.data

  if (comando === 'iniciar') {
    inicializar()
    
    intervalo = setInterval(Temporizador, 1000)
    
    self.postMessage({
      tipo: 'iniciado',
      mensaje: 'Sistema de semáforos iniciado'
    })
  } 
  else if (comando === 'detener') {
    if (intervalo) {
      clearInterval(intervalo)
      intervalo = null
    }
    
    self.postMessage({
      tipo: 'detenido',
      mensaje: 'Sistema de semáforos detenido'
    })
  }
}
