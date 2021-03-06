import config from '../config';
import { initRender } from '../render';
import { initRouter } from '../router';
import { initEvent } from '../event';
import { initFetch } from '../fetch';
import { isFn } from '../util/core';
import { initLifecycle, callHook } from './lifecycle';

export function initMixin(proto) {
  proto._init = function() {
    const vm = this;
    vm.config = config(vm);

    initLifecycle(vm); // Init hooks
    initPlugin(vm); // Install plugins
    callHook(vm, 'init');
    initRouter(vm); // Add router
    initRender(vm); // Render base DOM
    initEvent(vm); // Bind events
    initFetch(vm); // Fetch data
    callHook(vm, 'mounted');
  };
}

function initPlugin(vm) {
  [].concat(vm.config.plugins).forEach(fn => isFn(fn) && fn(vm._lifecycle, vm));
}
