import type { ClinicConfig } from './types';
import configData from './data/clinicConfig.json';

export function getClinicConfig(): ClinicConfig {
  return configData as ClinicConfig;
}
