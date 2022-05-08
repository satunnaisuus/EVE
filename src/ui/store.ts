import { makeObservable, observable, computed, action } from "mobx";
import Game from "../game/game";
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

    constructor(
        private gameFactory: typeof createGame,
        private options: GameOptions,
    ) {
        makeObservable(this);

        this.newGame(options);
    }

    render(): void {
        this.renderer && this.renderer.render();
    }

    @action
    newGame(options?: GameOptions): void {
        this.paused = true;
        this.game = this.gameFactory(options);
        this.game.setTimeoutDelay(this.stepDelay);
        this.newRenderer();
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

    private newRenderer(): void {
        if (this.game && this.canvas) {
            this.renderer = new CanvasRenderer(this.canvas, this.game, this.rendererTheme);
            this.renderer.render();
            this.game.subscribe('step', (game) => this.renderer.render());
        }
    }
}