import { makeObservable, observable, computed, action, runInAction } from "mobx";
import Game from "../game/game";
import { DeleteCellEvent } from "../game/game-events";
import createGame, { GameOptions } from "../game/game-factory";
import CanvasRenderer, { RenderStrategy } from "../render/canvas-renderer";

export class Store {
    private game: Game;

    private renderer: CanvasRenderer;

    private canvas: HTMLCanvasElement;

    @observable
    private rendererTheme: RenderStrategy = 'default';

    @observable
    private paused: boolean = true;

    @observable
    private stepDelay: number = 50;

    @observable
    private step: number = 0;

    @observable
    private stepsPerSecond: number = 0;

    private stepsPreviusPeriod: number = 0;

    @observable
    private organismCount: number = 0;

    constructor(
        private gameFactory: typeof createGame,
        private options: GameOptions,
    ) {
        makeObservable(this);

        this.newGame(options);

        setInterval(() => runInAction(() => {
            this.stepsPerSecond = (this.step - this.stepsPreviusPeriod);
            this.stepsPreviusPeriod = this.step;
        }), 1000);
    }

    render(): void {
        this.renderer && this.renderer.render();
    }

    @action
    newGame(options?: GameOptions): void {
        this.game && this.game.pause();
        this.paused = true;
        this.game = this.gameFactory(options);
        this.game.setTimeoutDelay(this.stepDelay);
        this.newRenderer();
        this.step = 0;
        this.stepsPreviusPeriod = 0;
        this.stepsPerSecond = 0;
        this.organismCount = 0;
        this.game.subscribe('postStep', (event) => runInAction(() => {this.step = this.game.getStep()}));
        this.game.subscribe('deleteCell', (event: DeleteCellEvent) => runInAction(() => {
            event.type === 'organism' && this.organismCount--;
        }));
        this.game.subscribe('insertCell', (event: DeleteCellEvent) => runInAction(() => {
            event.type === 'organism' && this.organismCount++;
        }));
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.newRenderer();
    }

    @action
    changeRenderTheme(theme: RenderStrategy): void {
        this.rendererTheme = theme;
        if (this.renderer) {
            this.renderer.setRenderStrategy(theme);
            this.renderer.render();
        }
    }

    getRenderTheme(): RenderStrategy {
        return this.rendererTheme;
    }

    @action
    pause(): void {
        this.paused = true;
        this.game && this.game.pause();
    }

    @action
    start(): void {
        this.paused = false;
        this.game && this.game.start();
    }

    isPaused(): boolean {
        return this.paused;
    }

    @action
    changeStepDelay(delay: number): void {
        this.stepDelay = delay;
        this.game && this.game.setTimeoutDelay(delay);
    }

    getStepDelay(): number {
        return this.stepDelay;
    }

    getStep(): number {
        return this.step;
    }

    getStepsPerSecond(): number {
        return this.stepsPerSecond;
    }

    getOrganismCount(): number {
        return this.organismCount;
    }

    private newRenderer(): void {
        if (this.game && this.canvas) {
            this.renderer = new CanvasRenderer(this.canvas, this.game, this.rendererTheme);
            this.renderer.render();
            this.game.subscribe('step', (game) => this.renderer.render());
        }
    }
}