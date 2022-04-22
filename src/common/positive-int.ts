import { assertGreaterOrEqualThan } from "./asserts";
import UInt from "./uint";

export default class PositiveInt extends UInt {
    constructor(value: number) {
        assertGreaterOrEqualThan(value, 1);

        super(value);
    }
}