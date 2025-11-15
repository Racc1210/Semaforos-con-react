import time
import threading

class Semaforo:
    def __init__(self,turno):
        print(f"Se crea semaforo {turno}")
        self.verde = False
        self.rojo = False
        self.amarillo = False
        self.turno = turno

    def Verde(self):
        self.verde = True
        self.rojo = False
        self.amarillo = False

    def Rojo(self):
        self.rojo = True
        self.verde = False
        self.amarillo = False

    def Amarillo(self):
        self.amarillo = True
        self.verde = False
        self.rojo = False

    def estado(self):
        return f"Semaforo: {self.turno}, verde: {self.verde}, rojo: {self.rojo}, amarillo: {self.amarillo}\n"
    
class Referencia:
    def __init__(self):
        self.tiempo = 0

    def avanzar(self):
        time.sleep(1)
        self.tiempo += 1
        if self.tiempo > 60:
            self.tiempo = 0
        print(self.tiempo)


def Sincronizacion(Semaforo, seccion, referencia):
    while True:
        if referencia.tiempo >= seccion['inicio'] and referencia.tiempo <= seccion['fin']:
            if referencia.tiempo <= seccion['fin'] - 3:
                Semaforo.Verde()
            else:
                Semaforo.Amarillo() 
        else:
            Semaforo.Rojo()
        #print(Semaforo.estado())

def Temporizador(referencia,Semaforos):
    while True:        
        referencia.avanzar()
        for i in Semaforos:
           print(i.estado()) 
        


if __name__ == "__main__":
    Semaforos = [Semaforo(i) for i in range (1,5)]
    referencia =  Referencia()
    ciclo = 60
    Secciones = ciclo//4

     
    hilos = []
    for s in range(len(Semaforos)):
        h = threading.Thread(target=Sincronizacion, args=(Semaforos[s], {'inicio': (Secciones*s)+1, 'fin': Secciones*(s+1)}, referencia))
        hilos.append(h)
        h.start()

    h_referencia = threading.Thread(target=Temporizador, args=(referencia,Semaforos)).start()

    for h in hilos:
        h.join()
