const Personaje = require('../src/personaje');

describe('Personaje', () => {

    let heroe;

    beforeEach(() => {
        heroe = new Personaje('A', 100, 15, 5);
    });

    test('Personaje recién creado tiene vida completa', () => {
        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(100);
    });

    test('recibirDanio reduce la vida correctamente', () => {
        // Act: ejecutar la acción
        heroe.recibirDanio(30);

        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(70);
    });

    test('recibirDanio con valor letal deja la vida en 0', () => {
        // Act: ejecutar la acción
        heroe.recibirDanio(100);

        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(0);
    });

    test('recibirDanio con valor negativo lanza error', () => {
        let danioRecibido = () => heroe.recibirDanio(-100);

        // Assert: verificar resultado
        expect(danioRecibido).toThrow();
    });

    test('curar aumenta VidaActual correctamente)',() => {
        heroe.vidaActual = 50;
        const curacion = heroe.curar(20);

        expect(curacion).toBe(70);
    });

    test('curar no puede exceder maxVida',() =>{
        const curarmax = heroe.curar(100);
        expect(curarmax).toBe(heroe.vidaMaxima);
    });

    test('estaVivo retorna true si la vida>0',() =>{
        const vivo = heroe.estaVivo();

        expect(vivo).toBeTruthy();
    });

    test('Si vida = 0 retorna false',() =>{
        heroe.vidaActual =0;
        const vivo = heroe.estaVivo();
        expect(vivo).toBeFalsy();
    });
});