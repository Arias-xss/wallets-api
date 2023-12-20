import type { Currency } from "../../shared";

type CurrenciesApiClient = {
  getAll(): Promise<Array<Currency>>;
};

export function useCurrenciesApi(): CurrenciesApiClient {
  const config = useAppConfig();
  const url = `${config.apiUrl}/currencies`;

  return {
    async getAll(): Promise<Array<Currency>> {
      const response = await fetch(url);
      return response.json();
    },
  };
}
