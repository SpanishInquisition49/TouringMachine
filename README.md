# Touring Machine
Un semplice inteprete di una macchina di Turing.

# Funzionamento:
L' interprete prende come argomento 3 parametri: 
* la lista degli stati: contente tutti gli stati che può assumere la macchina. 
* il buffer allo stato 0.
* la velocità (ms).

Per convenzione la macchina parte sempre dallo stato 0 e con la testina in posizione 0.
La macchina si ferma quando non può cambiare stato e come output stampa la combinazione di stato corrente, buffer e posizione testina.

# Formattazione Stati:

Uno stato è una tupla (stato iniziale, lettura buffer, nuovo stato, scrittura buffer, movimento testina):

* Stato iniziale: stato in cui si deve trovare la macchina prima di eseguire la transizione
* Lettura buffer: contenuto del buffer alla posizione della testina che deve avere per transitare oppure i seguenti caratteri speciali:
  * AnyNotEmpty '**': qualsiasi carattere che non sia uno spazio vuoto.
  * Empty '_': spazio vuoto.
* Nuovo stato: lo stato in cui la macchina transita se sono verificati i punti precedenti.
* Scrittura buffer: il carattere con cui sostituire il contenuto corrente del buffer. In questo caso i caratteri speciali avranno il seguente comportamento:
  * AnyNotEmpty: Non utilizzabile
  * Empty: mantiene il contenuto corrente del buffer
* Posizione testina: dopo che il buffer è stato riscritto la testina può scorrere a:
  * Sinistra '<'
  * Destra '>'
  * Non scorrere '_'

## Esempio

(0, A, 1, B, >) si traduce come: Se sei nello stato 0 e stai leggendo A allora vai nello stato 1 e scrivi B poi muovi la testina a destra
