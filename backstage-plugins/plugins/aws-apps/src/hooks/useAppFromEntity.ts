// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { GLENTAppData } from '../types';
import { Entity } from '@backstage/catalog-model';

export function useAppFromEntity(entity: Entity): GLENTAppData {
  const appData = (entity.metadata.annotations as GLENTAppData) ?? '';
  // ToDo Validate entity as AWS Entity, has proper data (i.e repo, association with env etc.)

  return appData;
}
