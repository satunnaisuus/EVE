export function assertInteger(value: number): void {
    if (! Number.isInteger(value)) {
        throw new AssertIntegerError;
    }
}

export function assertGreaterThan(value: number, comparedValue: number): void {
    if (value <= comparedValue) {
        throw new AssertGreaterThanError;
    }
}

export function assertGreaterOrEqualThan(value: number, comparedValue: number): void {
    if (value < comparedValue) {
        throw new AssertGreaterOrEqualThanError;
    }
}

export function assertLessThan(value: number, comparedValue: number): void {
    if (value >= comparedValue) {
        throw new AssertLessThanError;
    }
}

export function assertLessOrEqualThan(value: number, comparedValue: number): void {
    if (value > comparedValue) {
        throw new AssertLessOrEqualThanError;
    }
}

export class AssertError extends Error {

}

export class AssertIntegerError extends AssertError {
    
}

export class AssertGreaterThanError extends AssertError {
    
}

export class AssertGreaterOrEqualThanError extends AssertError {
    
}

export class AssertLessThanError extends AssertError {
    
}

export class AssertLessOrEqualThanError extends AssertError {
    
}