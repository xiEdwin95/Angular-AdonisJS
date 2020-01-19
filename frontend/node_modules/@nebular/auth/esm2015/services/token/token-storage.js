var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NbAuthTokenParceler } from './token-parceler';
export class NbTokenStorage {
}
/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
let NbTokenLocalStorage = class NbTokenLocalStorage extends NbTokenStorage {
    constructor(parceler) {
        super();
        this.parceler = parceler;
        this.key = 'auth_app_token';
    }
    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    get() {
        const raw = localStorage.getItem(this.key);
        return this.parceler.unwrap(raw);
    }
    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    set(token) {
        const raw = this.parceler.wrap(token);
        localStorage.setItem(this.key, raw);
    }
    /**
     * Clears token from localStorage
     */
    clear() {
        localStorage.removeItem(this.key);
    }
};
NbTokenLocalStorage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NbAuthTokenParceler])
], NbTokenLocalStorage);
export { NbTokenLocalStorage };
//# sourceMappingURL=token-storage.js.map