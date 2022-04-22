
import { assertGreaterOrEqualThan } from "./asserts";
import Int from "./int";

export default class UInt extends Int {
    constructor(value: number) {
        super(value);
        
        assertGreaterOrEqualThan(value, 0);
    }
}