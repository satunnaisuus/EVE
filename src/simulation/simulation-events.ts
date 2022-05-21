export class Event {
    constructor() {
        
    }
}

export class InsertCellEvent extends Event {
    constructor(public type: string) {
        super();
    }
}

export class DeleteCellEvent extends Event {
    constructor(public type: string) {
        super();
    }
}

export class EndEvent extends Event {
    constructor(public type: string) {
        super();
    }
}

export class SimulationEvents {
    preStep: typeof Event = Event;
    postStep: typeof Event = Event;
    step: typeof Event = Event;
    start: typeof Event = Event;
    pause: typeof Event = Event;
    deleteCell: typeof DeleteCellEvent = DeleteCellEvent;
    insertCell: typeof InsertCellEvent = InsertCellEvent;
    end: typeof InsertCellEvent = InsertCellEvent;
}