export function assertInteger(value: any): void {
    if (! Number.isInteger(value)) {
        throw new AssertIntegerError;
    }
}

export function assertGreaterThan(value: any, comparedValue: any): void {
    if (value <= comparedValue) {
        throw new AssertGreaterThanError;
    }
}

export function assertGreaterOrEqualThan(value: any, comparedValue: any): void {
    if (value < comparedValue) {
        throw new AssertGreaterOrEqualThanError;
    }
}

export function assertLessThan(value: any, comparedValue: any): void {
    if (value >= comparedValue) {
        throw new AssertLessThanError;
    }
}

export function assertLessOrEqualThan(value: any, comparedValue: any): void {
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