var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, Injector } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { NbAuthService } from '../auth.service';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '../../auth.options';
let NbAuthJWTInterceptor = class NbAuthJWTInterceptor {
    constructor(injector, filter) {
        this.injector = injector;
        this.filter = filter;
    }
    intercept(req, next) {
        // do not intercept request whose urls are filtered by the injected filter
        if (!this.filter(req)) {
            return this.authService.isAuthenticatedOrRefresh()
                .pipe(switchMap(authenticated => {
                if (authenticated) {
                    return this.authService.getToken().pipe(switchMap((token) => {
                        const JWT = `Bearer ${token.getValue()}`;
                        req = req.clone({
                            setHeaders: {
                                Authorization: JWT,
                            },
                        });
                        return next.handle(req);
                    }));
                }
                else {
                    // Request is sent to server without authentication so that the client code
                    // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                    return next.handle(req);
                }
            }));
        }
        else {
            return next.handle(req);
        }
    }
    get authService() {
        return this.injector.get(NbAuthService);
    }
};
NbAuthJWTInterceptor = __decorate([
    Injectable(),
    __param(1, Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER)),
    __metadata("design:paramtypes", [Injector, Object])
], NbAuthJWTInterceptor);
export { NbAuthJWTInterceptor };
//# sourceMappingURL=jwt-interceptor.js.map