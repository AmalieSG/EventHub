Forklaring

1. Handler
Dette laget fungerer som inngangspunkt for API-endepunkter, routing eller actions.
Handleren mottar requesten fra frontend eller server og sender den videre til controlleren.

2. Controller
Controller-laget håndterer validering og flyt mellom handler og service.
Dette er stedet for å sjekke input og bestemme hva som skal kalles i service-laget.

3. Service
Service-laget inneholder forretningslogikk — altså hva systemet faktisk skal gjøre.
Det er her du kaller repository for å hente, endre eller slette data.

4. Repository
Dette laget håndterer datatilgang.
