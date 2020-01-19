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
import { NB_AUTH_INTERCEPTOR_HEADER } from '../../auth.options';
let NbAuthSimpleInterceptor = class NbAuthSimpleInterceptor {
    constructor(injector, headerName = 'Authorization') {
        this.injector = injector;
        this.headerName = headerName;
    }
    intercept(req, next) {
        return this.authService.getToken()
            .pipe(switchMap((token) => {
            if (token && token.getValue()) {
                req = req.clone({
                    setHeaders: {
                        [this.headerName]: token.getValue(),
                    },
                });
            }
            return next.handle(req);
        }));
    }
    get authService() {
        return this.injector.get(NbAuthService);
    }
};
NbAuthSimpleInterceptor = __decorate([
    Injectable(),
    __param(1, Inject(NB_AUTH_INTERCEPTOR_HEADER)),
    __metadata("design:paramtypes", [Injector, String])
], NbAuthSimpleInterceptor);
export { NbAuthSimpleInterceptor };
//# sourceMappingURL=simple-interceptor.js.map