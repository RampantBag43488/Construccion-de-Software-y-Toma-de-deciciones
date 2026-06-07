const { calcularDanio } = require('../src/combate');

describe("combate", () => {

    // 1	Daño normal: ataque > defensa	Retorna ataque − defensa
    test('daño normal: ataque mayor que defensa', () => {
        // Arrange
        const a = { ataque: 15 };
        const d = { defensa: 5 };

        // Act
        const danio = calcularDanio(a, d);

        // Assert
        expect(danio).toBe(10);
    });

    // 2	Defensa = ataque (frontera)	Retorna 1 (mínimo garantizado)
    test('defenza igual al ataque', () => {
        // Arrange
        const a = { ataque: 10 };
        const d = { defensa: 10 };

        //Act
        const danio = calcularDanio(a, d);

        //Assert
        expect(danio).toBe(1);
    });

    // 3	Defensa > ataque	Retorna 1 (no negativo)
    test('defensa mayor que ataque', () => {
        // Arrange
        const a = { ataque: 5 };
        const d = { defensa: 10 };

        //Act
        const danio = calcularDanio(a, d);

        //Assert
        expect(danio).toBe(1);
    });

    // 4	Ataque y defensa iguales a cero	Retorna 1
    test('ataque y defensa iguales a cero', () => {
        // Arrange
        const a = { ataque: 0 };
        const d = { defensa: 0 };

        //Act
        const danio = calcularDanio(a, d);

        //Assert
        expect(danio).toBe(1);
    });
});