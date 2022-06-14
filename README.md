# Turing Machine

Un semplice inteprete di una macchina di Turing.

## Funzionamento

L' interprete prende come argomento 3 parametri:

* la lista degli stati: contente tutti gli stati che può assumere la macchina.
* il buffer allo stato 0.
* la velocità (ms).

Per convenzione la macchina parte sempre dallo stato 0 e con la testina in posizione 0.
La macchina si ferma quando non può cambiare stato e come output stampa: stato corrente, buffer e posizione testina.

## Formattazione Stati

Uno stato è una tupla (stato iniziale, lettura buffer, nuovo stato, scrittura buffer, movimento testina):

* Stato iniziale: stato in cui si deve trovare la macchina prima di eseguire la transizione
* Lettura buffer: contenuto del buffer alla posizione della testina che deve avere per transitare oppure i [Caratteri Speciali](#caratteri-speciali)
* Nuovo stato: lo stato in cui la macchina transita se sono verificati i punti precedenti.
* Scrittura buffer: il carattere con cui sostituire il contenuto corrente del buffer.
  (Anche in questo caso sono consentiti alcuni dei [Caratteri Speciali](#caratteri-speciali))
* Posizione testina: dopo che il buffer è stato riscritto la testina può essere fatta scorrere tramite:
  
  | Simbolo | Direzione |
  |:-------:|:---------:|
  | ```<``` | Sinistra |
  | ```>``` | Destra |
  | ```_``` | Non scorrere |

### Esempio

```(0, A, 1, B, >)``` si traduce come: Se sei nello stato 0 e stai leggendo A allora vai nello stato 1 e scrivi B poi muovi la testina a destra

## Caratteri Speciali

La seguente tabella contiene tutti i caratteri speciali utilizzabili e una breve descrizione del loro funzionamento

| Simbolo | Nome| Descrizione|Consentito in lettura|Consentito in scrittura|
|:--------:|:-----------:|:------------------------------------------------:|:-:|:-:
| ```**``` | AnyNotEmpty | Qualsiasi carattere che non sia uno spazio vuoto | :white_check_mark: | :x: |
| ```_``` | Empty | Carattere vuoto | :white_check_mark: | :white_check_mark: |
| ```__``` | Space | Carattere spazio | :white_check_mark: | :white_check_mark: |
| ```#``` | Commento | La linea viene ignorata | :x: | :x: |
