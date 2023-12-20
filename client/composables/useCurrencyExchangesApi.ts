import type { CurrencyExchange, UpdateCurrencyExchange } from "../../shared";

type CurrencyExchangesApiClient = {
  getAll(): Promise<Array<CurrencyExchange>>;
  update(id: number, model: UpdateCurrencyExchange): Promise<CurrencyExchange>;
};

export function useCurrencyExchangesApi(): CurrencyExchangesApiClient {
  const config = useAppConfig();
  const url = `${config.apiUrl}/currency-exchanges`;

  return {
    async getAll(): Promise<Array<CurrencyExchange>> {
      const response = await fetch(url);
      return response.json();
    },

    async update(
      id: number,
      model: UpdateCurrencyExchange
    ): Promise<CurrencyExchange> {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      }

      throw new Error(String(data.message));
    },
  };
}
