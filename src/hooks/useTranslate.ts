import { useTranslation as original } from "react-i18next";

import { ResourceKey } from "../common/localization/resources/resource";

type CustomTranslate = (
  key: ResourceKey | ResourceKey[],
  options?: Record<string, string> | string
) => string;

const useTranslate = (...parameters: Parameters<typeof original>) => {
  const originalResult = original(...parameters);
  const customT: CustomTranslate = originalResult.t;
  const { t, ...rest } = originalResult;

  return { translate: customT, ...rest };
};

export default useTranslate;
