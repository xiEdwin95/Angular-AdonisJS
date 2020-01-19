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
var NbAclService_1;
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { NB_SECURITY_OPTIONS_TOKEN } from '../security.options';
const shallowObjectClone = (o) => Object.assign({}, o);
const ɵ0 = shallowObjectClone;
const shallowArrayClone = (a) => Object.assign([], a);
const ɵ1 = shallowArrayClone;
const popParent = (abilities) => {
    const parent = abilities['parent'];
    delete abilities['parent'];
    return parent;
};
const ɵ2 = popParent;
/**
 * Common acl service.
 */
let NbAclService = NbAclService_1 = class NbAclService {
    constructor(settings = {}) {
        this.settings = settings;
        this.state = {};
        if (settings.accessControl) {
            this.setAccessControl(settings.accessControl);
        }
    }
    /**
     * Set/Reset ACL list
     * @param {NbAccessControl} list
     */
    setAccessControl(list) {
        for (const [role, value] of Object.entries(list)) {
            const abilities = shallowObjectClone(value);
            const parent = popParent(abilities);
            this.register(role, parent, abilities);
        }
    }
    /**
     * Register a new role with a list of abilities (permission/resources combinations)
     * @param {string} role
     * @param {string} parent
     * @param {[permission: string]: string|string[]} abilities
     */
    register(role, parent = null, abilities = {}) {
        this.validateRole(role);
        this.state[role] = {
            parent: parent,
        };
        for (const [permission, value] of Object.entries(abilities)) {
            const resources = typeof value === 'string' ? [value] : value;
            this.allow(role, permission, shallowArrayClone(resources));
        }
    }
    /**
     * Allow a permission for specific resources to a role
     * @param {string} role
     * @param {string} permission
     * @param {string | string[]} resource
     */
    allow(role, permission, resource) {
        this.validateRole(role);
        if (!this.getRole(role)) {
            this.register(role, null, {});
        }
        resource = typeof resource === 'string' ? [resource] : resource;
        let resources = shallowArrayClone(this.getRoleResources(role, permission));
        resources = resources.concat(resource);
        this.state[role][permission] = resources
            .filter((item, pos) => resources.indexOf(item) === pos);
    }
    /**
     * Check whether the role has a permission to a resource
     * @param {string} role
     * @param {string} permission
     * @param {string} resource
     * @returns {boolean}
     */
    can(role, permission, resource) {
        this.validateResource(resource);
        const parentRole = this.getRoleParent(role);
        const parentCan = parentRole && this.can(this.getRoleParent(role), permission, resource);
        return parentCan || this.exactCan(role, permission, resource);
    }
    getRole(role) {
        return this.state[role];
    }
    validateRole(role) {
        if (!role) {
            throw new Error('NbAclService: role name cannot be empty');
        }
    }
    validateResource(resource) {
        if (!resource || [NbAclService_1.ANY_RESOURCE].includes(resource)) {
            throw new Error(`NbAclService: cannot use empty or bulk '*' resource placeholder with 'can' method`);
        }
    }
    exactCan(role, permission, resource) {
        const resources = this.getRoleResources(role, permission);
        return resources.includes(resource) || resources.includes(NbAclService_1.ANY_RESOURCE);
    }
    getRoleResources(role, permission) {
        return this.getRoleAbilities(role)[permission] || [];
    }
    getRoleAbilities(role) {
        const abilities = shallowObjectClone(this.state[role] || {});
        popParent(shallowObjectClone(this.state[role] || {}));
        return abilities;
    }
    getRoleParent(role) {
        return this.state[role] ? this.state[role]['parent'] : null;
    }
};
NbAclService.ANY_RESOURCE = '*';
NbAclService = NbAclService_1 = __decorate([
    Injectable(),
    __param(0, Optional()), __param(0, Inject(NB_SECURITY_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], NbAclService);
export { NbAclService };
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=acl.service.js.map