import { Event, SimplePool, UnsignedEvent, finalizeEvent, generateSecretKey, getPublicKey, nip04 } from "nostr-tools";
import { EncryptedDirectMessage } from "nostr-tools/kinds";

//nostr mint connect

export type NMCCommand = {
  command: 'create_mint_quote' | 'create_melt_quote' | 'get_mint_quote' | 'get_melt_quote' | 'melt' | 'mint' | 'get_info' | 'get_keys' | 'get_keysets' | 'swap' | 'check_state' | 'restore'
  data?: unknown
}

export class NMCClient {
  private static _instances: NMCClient[] = []
  private _mintPubkey: string | undefined = undefined
  private _relays: string[] = []
  private _pool: SimplePool | undefined
  // private _privKeys: string[] = []
  private constructor(mintPubkey: string, relays: string[]) {
    this._mintPubkey = mintPubkey
    this._relays = relays
    console.log('create nmc client instance')
    this._pool = new SimplePool()
  }

  static getInstance(pubkey: string, relays:string[]) {
    const instance = NMCClient._instances.find(i=> i._mintPubkey===pubkey)
    if (instance) {
      return instance
    }
    else {
      const newInstance = new NMCClient(pubkey, relays)
      NMCClient._instances.push(newInstance)
      return newInstance
    }
  }

  async sendCommand(command: NMCCommand): Promise<NMCCommand> {
    if (!this._mintPubkey) {
      throw new Error('could not send: no mint pubkey')
    }
    const sk = generateSecretKey()
    const pk = getPublicKey(sk)

    const commandString = JSON.stringify(command)

    const event: UnsignedEvent = {
      kind: EncryptedDirectMessage,
      tags: [['p', this._mintPubkey]],
      content: await nip04.encrypt(sk, this._mintPubkey, commandString),
      created_at: Math.floor(Date.now() / 1000),
      pubkey: pk
    };
    const signedEvent = finalizeEvent(event, sk)
    console.log('send event', signedEvent)
    console.log(this._relays)
    await this._pool?.publish(this._relays, signedEvent)
    const eventPromise = new Promise(async (resolve, reject)=> {
      const sub = await this._pool?.subscribeMany(this._relays, [{ "#p": [pk] }], {
        onevent: async (e: Event) => {
          console.log(e)
          try {
          const payload = await nip04.decrypt(sk, e.pubkey, e.content)
            const json = JSON.parse(payload)
            resolve(json)
          } catch (error) {
            reject(error)
          }
          sub?.close()
        }
      })
    })
    return eventPromise as Promise<NMCCommand>
  };
}
