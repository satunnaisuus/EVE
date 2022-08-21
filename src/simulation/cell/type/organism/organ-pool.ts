import { Organ } from "../organism-cell";
import { AbstractOrgan } from "./abstract-organ";
import { Armour } from "./organ/armour";
import { Chloroplast } from "./organ/chloroplast";
import { Eye } from "./organ/eye";
import { Fermenter } from "./organ/fermenter";
import { Fin } from "./organ/fin";
import { Mouth } from "./organ/mouth";
import { Oxidizer } from "./organ/oxidizer";
import { Reproductor } from "./organ/reproductor";
import { Spine } from "./organ/spine";

export class OrganPool {
    private armour: Armour = new Armour();

    private chloroplast: Chloroplast = new Chloroplast();

    private eye: Eye = new Eye();

    private fermeneter: Fermenter = new Fermenter();

    private fin: Fin = new Fin();

    private mouth: Mouth = new Mouth();

    private oxidizer: Oxidizer = new Oxidizer();

    private reproductor: Reproductor = new Reproductor();

    private spine: Spine = new Spine();

    getArmour(): Armour {
        return this.armour;
    }

    getChloroplast(): Chloroplast {
        return this.chloroplast;
    }

    getEye(): Eye {
        return this.eye;
    }

    getFermenter(): Fermenter {
        return this.fermeneter;
    }

    getFin(): Fin {
        return this.fin;
    }

    getMouth(): Mouth {
        return this.mouth;
    }

    getOxidizer(): Oxidizer {
        return this.oxidizer;
    }

    getReproductor(): Reproductor {
        return this.reproductor;
    }

    getSpine(): Spine {
        return this.spine;
    }

    getOrgan(organ: Organ): AbstractOrgan {
        switch (organ) {
            case Organ.ARMOUR: return this.getArmour();
            case Organ.CHLOROPLAST: return this.getChloroplast();
            case Organ.EYE: return this.getEye();
            case Organ.FERMENTER: return this.getFermenter();
            case Organ.FIN: return this.getFin();
            case Organ.MOUTH: return this.getMouth();
            case Organ.NONE: return null;
            case Organ.OXIDIZER: return this.getOxidizer();
            case Organ.REPRODUCTOR: return this.getReproductor();
            case Organ.SPINE: return this.getSpine();
        }
    }
}