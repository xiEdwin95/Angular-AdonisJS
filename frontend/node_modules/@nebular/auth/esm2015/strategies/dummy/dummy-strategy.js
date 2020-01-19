var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbDummyAuthStrategy_1;
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthResult } from '../../services/auth-result';
import { dummyStrategyOptions } from './dummy-strategy-options';
/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: NbAuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
let NbDummyAuthStrategy = NbDummyAuthStrategy_1 = class NbDummyAuthStrategy extends NbAuthStrategy {
    /**
     * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
     *
     *
     * Strategy settings.
     *
     * ```ts
     * export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
     *   name = 'dummy';
     *   token = {
     *     class: NbAuthSimpleToken,
     *   };
     *   delay? = 1000;
     *   alwaysFail? = false;
     * }
     * ```
     */
    constructor() {
        super(...arguments);
        this.defaultOptions = dummyStrategyOptions;
    }
    static setup(options) {
        return [NbDummyAuthStrategy_1, options];
    }
    authenticate(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    register(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    requestPassword(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    resetPassword(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    logout(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    refreshToken(data) {
        return observableOf(this.createDummyResult(data))
            .pipe(delay(this.getOption('delay')));
    }
    createDummyResult(data) {
        if (this.getOption('alwaysFail')) {
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        try {
            const token = this.createToken('test token', true);
            return new NbAuthResult(true, this.createSuccessResponse(data), '/', [], ['Successfully logged in.'], token);
        }
        catch (err) {
            return new NbAuthResult(false, this.createFailResponse(data), null, [err.message]);
        }
    }
};
NbDummyAuthStrategy = NbDummyAuthStrategy_1 = __decorate([
    Injectable()
], NbDummyAuthStrategy);
export { NbDummyAuthStrategy };
//# sourceMappingURL=dummy-strategy.js.map