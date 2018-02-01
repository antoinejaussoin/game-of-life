import Engine from './color-engine';

describe('When initialising a new engine to blank', () => {
    const engine = new Engine(10);
    engine.initToBlank();

    it('should have created a grid of 10 by 10', () => {
        const grid = engine.toArray();
        expect(grid.length).toBe(10);
        expect(grid[0].length).toBe(10);
    });

    it('should have set all cells to 0', () => {
        const grid = engine.toArray();
        grid.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(0);
            });
        });
    });

    it('should still be all 0s after one generation', () => {
        engine.play();
        const grid = engine.toArray();
        grid.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(0);
            });
        });
    });
});

describe('When initialising a new engine to all alive', () => {
    const engine = new Engine(10);
    engine.initToRandom(100); // 100% change of being alive

    it('should have created a grid of 10 by 10', () => {
        const grid = engine.toArray();
        expect(grid.length).toBe(10);
        expect(grid[0].length).toBe(10);
    });

    it('should have set all cells to 1', () => {
        const grid = engine.toArray();
        grid.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(1);
            });
        });
    });

    it('should still be all 0s after one generation', () => {
        engine.play();
        const grid = engine.toArray();
        grid.forEach(row => {
            row.forEach(cell => {
                expect(cell).toBe(0);
            });
        });
    });
});

describe('When playing a set game for 10 generations', () => {
    const engine = new Engine(10);
    engine.initToBlank();
    engine.inject(0, 0, [
        [ 1, 1, 0, 1, 0, 0, 0, 1, 0, 0 ],
        [ 0, 1, 0, 1, 0, 0, 0, 1, 1, 0 ],
        [ 0, 0, 1, 1, 0, 1, 0, 0, 1, 0 ],
        [ 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 ],
        [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0, 1, 1, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0, 1, 1, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]);
    for(let i = 0; i < 10; i++) {
        engine.play();
    }

    it('should still have a grid of 10 by 10', () => {
        const grid = engine.toArray();
        expect(grid.length).toBe(10);
        expect(grid[0].length).toBe(10);
    });

    it('should have changed all cells to this final state', () => {
        const grid = engine.toArray();
        const expected = [[1,0,0,0,0,0,0,1,0,0],[1,0,0,0,0,1,1,0,0,0],[1,1,0,0,1,1,0,1,1,1],[1,1,1,1,0,0,0,1,0,0],[0,0,0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0,1,1],[0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,1,0,0,0],[0,1,1,1,0,1,1,1,0,0],[0,1,0,0,0,0,1,1,0,1]]
        expect(grid).toEqual(expected);
    });

    it('should have counted 10 generations', () => {
        expect(engine.generation).toBe(10);
    });
});