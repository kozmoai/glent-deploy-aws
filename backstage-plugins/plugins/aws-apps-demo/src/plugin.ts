// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createPlugin, createComponentExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const awsAppsDemoPlugin = createPlugin({
  id: 'aws-apps-demo',
  routes: {
    root: rootRouteRef,
  },
});

export const AWSLogoFull = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'AWSLogoFull',
    component: { lazy: () => import('./components/AWSLogoFull').then(m => m.AWSLogoFull) },
  }),
);

export const AWSLogoIcon = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'AWSLogoIcon',
    component: { lazy: () => import('./components/AWSLogoIcon').then(m => m.AWSLogoIcon) },
  }),
);

export const GLENTLogoFull = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'GLENTLogoFull',
    component: { lazy: () => import('./components/GLENTLogoFull').then(m => m.GLENTLogoFull) },
  }),
);

export const GLENTLogoIcon = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'GLENTLogoIcon',
    component: { lazy: () => import('./components/GLENTLogoIcon').then(m => m.GLENTLogoIcon) },
  }),
);

export const CustomerLogoIcon = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'CustomerLogoIcon',
    component: { lazy: () => import('./components/CustomerLogoIcon').then(m => m.CustomerLogoIcon) },
  }),
);
export const CustomerLogoFullTitleLight = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'CustomerLogoFullTitleLight',
    component: {
      lazy: () => import('./components/CustomerLogoFullTitleLight').then(m => m.CustomerLogoFullTitleLight),
    },
  }),
);
export const CustomerLogoFullLight = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'CustomerLogoFullLight',
    component: { lazy: () => import('./components/CustomerLogoFullLight').then(m => m.CustomerLogoFullLight) },
  }),
);

export const AWSAppsHomePage = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'AWSAppsHomePage',
    component: {
      lazy: () => import('./components/AWSAppsHomePage/AWSAppsHomePage').then(m => m.AWSAppsHomePage),
    },
  }),
);

export const GLENTHomePage = awsAppsDemoPlugin.provide(
  createComponentExtension({
    name: 'AWSAppsHomePage',
    component: {
      lazy: () => import('./components/GLENTHomePage/GLENTHomePage').then(m => m.GLENTHomePage),
    },
  }),
);
