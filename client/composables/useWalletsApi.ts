import type {
  CreateWallet,
  FindAllWallets,
  UpdateWallet,
  Wallet,
} from "../../shared";

type WalletsApiClient = {
  getAll(options: Required<FindAllWallets>): Promise<Array<Wallet>>;
  getByAddress(id: string): Promise<Wallet | undefined>;
  create(model: CreateWallet): Promise<Wallet>;
  update(address: string, model: UpdateWallet): Promise<Wallet>;
  refreshBalance(address: string): Promise<Wallet>;
  remove(id: string): Promise<void>;
};

export function useWalletsApi(): WalletsApiClient {
  const config = useAppConfig();
  const url = `${config.apiUrl}/wallets`;

  return {
    async getAll(options: Required<FindAllWallets>): Promise<Array<Wallet>> {
      const urlWithParams = new URL(url);
      urlWithParams.searchParams.set("sort", options.sort);

      const response = await fetch(urlWithParams.href);
      return response.json();
    },

    async getByAddress(id: string): Promise<Wallet | undefined> {
      const response = await fetch(`${url}/${id}`);
      if (response.status === 404) {
        return undefined;
      }

      return response.json();
    },

    async create(model: CreateWallet): Promise<Wallet> {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(model),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (
        response.status === 409 ||
        response.status === 400 ||
        response.status === 502
      ) {
        throw new Error(data.message);
      }

      return data;
    },

    async update(address: string, model: UpdateWallet): Promise<Wallet> {
      const response = await fetch(`${url}/${address}`, {
        method: "PATCH",
        body: JSON.stringify(model),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.status === 409 || response.status === 400) {
        throw new Error(data.message);
      }

      return data;
    },

    async refreshBalance(address: string): Promise<Wallet> {
      const response = await fetch(`${url}/${address}/refresh-balance`, {
        method: "POST",
      });

      const data = await response.json();
      if (response.status === 404) {
        throw new Error(data.message);
      }

      return data;
    },

    async remove(id: string): Promise<void> {
      const response = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to remove wallet");
      }
    },
  };
}
