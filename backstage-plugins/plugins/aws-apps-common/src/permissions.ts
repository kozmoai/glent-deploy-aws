// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { createPermission } from '@backstage/plugin-permission-common';

export const readGlentAppAuditPermission = createPermission({
  name: 'glent.app.audit.read',
  attributes: {
    action: 'read',
  },
});

export const glentPermissions = [readGlentAppAuditPermission];
