import { CashuMint } from "@cashu/cashu-ts";
import type { GetInfoResponse, SwapPayload, SwapResponse, MintQuotePayload, MintQuoteResponse, MintPayload, MintResponse, MeltQuotePayload, MeltQuoteResponse, MeltPayload, MintActiveKeys, MintAllKeysets, CheckStatePayload, CheckStateResponse, SerializedBlindedMessage, PostRestoreResponse } from "@cashu/cashu-ts";
import {  NMCClient } from "./NMCClient.js";
    export class NMCMint extends CashuMint {
    _relays: string[] = []
    _client: NMCClient
    constructor(pubkey: string, relays:string []) {
        super(pubkey)
        this._relays = relays
        console.log('create nmc mint instance')
        this._client = NMCClient.getInstance(pubkey, relays)
    }

    get mintUrl(): string {
        return this.mintUrl
    }

    async getInfo(): Promise<GetInfoResponse> {
        try {
            const res = await this._client.sendCommand({
                command: 'get_info'
            })
            if (!res?.data) {
                throw new Error("Could not get mint info");
            }
            return res.data as Promise<GetInfoResponse>
            
        } catch (error) {
            console.error(error)
            throw new Error("err");
        }
    }

    async swap(swapPayload: SwapPayload): Promise<SwapResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'swap',
                data: 
                    swapPayload
                
            }
        
        )
        if (!res?.data) {
            throw new Error("Could not swap");
        }
        return res.data as Promise<SwapResponse>
    }
    async createMintQuote(mintQuotePayload: MintQuotePayload): Promise<MintQuoteResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'create_mint_quote',
                data: mintQuotePayload
                
            }
        
        )
        if (!res?.data) {
            throw new Error("Could not create mint quote");
        }
        return res.data as Promise<MintQuoteResponse>
    }
    async checkMintQuote(quote: string): Promise<MintQuoteResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'get_mint_quote',
                data: {
                    quote
                }
            }
        
        )
        if (!res?.data) {
            throw new Error("Could not get mint quote");
        }
        return res.data as Promise<MintQuoteResponse>
    }
    async mint(mintPayload: MintPayload): Promise<MintResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'mint',
                data: 
                    mintPayload
                
            }
        )
        if (!res?.data) {
            throw new Error("Could not mint");
        }
        return res.data as Promise<MintResponse>
    }
    async createMeltQuote(meltQuotePayload: MeltQuotePayload): Promise<MeltQuoteResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'create_melt_quote',
                data: 
                    meltQuotePayload
                
            }
        )
        if (!res?.data) {
            throw new Error("Could not mint");
        }
        return res.data as Promise<MeltQuoteResponse>
    }
    async checkMeltQuote(quote: string): Promise<MeltQuoteResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'get_melt_quote',
                data: {
                    quote
                }
            }
        )
        if (!res?.data) {
            throw new Error("Could not get melt quote");
        }
        return res.data as Promise<MeltQuoteResponse>
    }
    async melt(meltPayload: MeltPayload): Promise<MeltQuoteResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'melt',
                data: 
                    meltPayload
                
            }
        )
        if (!res?.data) {
            throw new Error("Could not melt");
        }
        return res.data as Promise<MeltQuoteResponse>
    }
    async getKeys(keysetId?: string | undefined, mintUrl?: string | undefined): Promise<MintActiveKeys> {
        const res = await this._client.sendCommand(
            {
                command: 'get_keys',
                data: {
                    keysetId
                }
            }
        
        )
        if (!res?.data) {
            throw new Error("Could not get mint keys");
        }
        return res.data as Promise<MintActiveKeys>
    }
    async getKeySets(): Promise<MintAllKeysets> {
        const res = await this._client.sendCommand(
            {
                command: 'get_keysets',
            }
        )
        if (!res?.data) {
            throw new Error("Could not get mint keysets");
        }
        return res.data as Promise<MintAllKeysets>

    }
    async check(checkPayload: CheckStatePayload): Promise<CheckStateResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'check_state',
                data: 
                    checkPayload
                
            }
        )
        if (!res?.data) {
            throw new Error("Could not check state");
        }
        return res.data as Promise<CheckStateResponse>
    }
    async restore(restorePayload: { outputs: SerializedBlindedMessage[]; }): Promise<PostRestoreResponse> {
        const res = await this._client.sendCommand(
            {
                command: 'restore',
                data: 
                    restorePayload           
            }
        )
        if (!res?.data) {
            throw new Error("Could not restore");
        }
        return res.data as Promise<PostRestoreResponse>
    }
    async connectWebSocket(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    disconnectWebSocket(): void {
        throw new Error("Method not implemented.");
    }
    get webSocketConnection(): undefined {
        throw new Error("Method not implemented.");
    }
    
}