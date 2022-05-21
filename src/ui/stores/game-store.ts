import { makeObservable, observable, action, runInAction } from "mobx";
import { Game } from "../../game/game";
import { DeleteCellEvent } from "../../game/game-events";
import { createGame, GameOptions } from "../../game/game-factory";
import { CanvasRenderer, RenderStrategy } from "../../render/canvas-renderer";
import { saveOptions } from "../storage";
import { GameOptionsStore } from "./game-options-store";
import { GameParamsStore } from "./game-params-store";

export class GameStore {
    private game: Game;

    private renderer: CanvasRenderer;

    private canvas: HTMLCanvasElement;

    @observable
    private rendererTheme: RenderStrategy = 'default';

    @observable
    private renderingDisabled: boolean = false;

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

    @observable
    private options: GameOptionsStore;

    @observable
    private params: GameParamsStore;

    constructor(
        private gameFactory: typeof createGame,
        options: GameOptions
    ) {
        makeObservable(this);

        this.options = new GameOptionsStore(options);
        this.params = new GameParamsStore();

        this.newGame();

        setInterval(() => runInAction(() => {
            this.stepsPerSecond = (this.step - this.stepsPreviusPeriod);
            this.stepsPreviusPeriod = this.step;
        }), 1000);
    }

    @action
    newGame(): void {
        this.game && this.game.end();
        this.paused = true;
        this.game = this.gameFactory(this.options.toGameOptions(), this.params.getGameParams());
        this.game.setTimeoutDelay(this.stepDelay);
        this.newRenderer();
        this.setRenderingDisabled(false);
        this.step = 0;
        this.stepsPreviusPeriod = 0;
        this.stepsPerSecond = 0;
        this.organismCount = 0;

        for (const {cell} of this.game.getGrid()) {
            cell.getType() === 'organism' && this.organismCount++;
        }

        this.game.subscribe('postStep', (event) => runInAction(() => {this.step = this.game.getStep()}));
        this.game.subscribe('deleteCell', (event: DeleteCellEvent) => runInAction(() => {
            event.type === 'organism' && this.organismCount--;
        }));
        this.game.subscribe('insertCell', (event: DeleteCellEvent) => runInAction(() => {
            event.type === 'organism' && this.organismCount++;
        }));
        saveOptions(this.options.toGameOptions());
    }

    getGame(): Game {
        return this.game;
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        if (! this.canvas) {
            this.canvas = canvas;
            this.newRenderer();
        }
    }

    @action
    changeRenderTheme(theme: RenderStrategy): void {
        this.rendererTheme = theme;
        if (this.renderer) {
            this.renderer.setRenderStrategy(theme);
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

    isRenderingDisabled(): boolean {
        return this.renderingDisabled;
    }

    @action
    setRenderingDisabled(value: boolean): void {
        this.renderingDisabled = value;
        this.renderer && (value ? this.renderer.disableHandlingStep() : this.renderer.enableHandlingStep())
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

    makeStep(): void {
        this.game && this.game.nextStep();
    }

    getOptions(): GameOptionsStore {
        return this.options;
    }

    getParams(): GameParamsStore {
        return this.params;
    }

    private newRenderer(): void {
        if (this.game && this.canvas) {
            this.renderer = new CanvasRenderer(this.canvas, this.game, this.rendererTheme);
        }
    }
}