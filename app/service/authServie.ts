import { EnvConfig } from "@/util/envConfg"


export const getConsentScreenURL = () => {
  return `${EnvConfig.backend}${EnvConfig.basePath}/oauth/authorization/google`;
};