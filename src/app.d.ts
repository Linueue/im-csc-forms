import type { DBClient, StorageClient } from "$lib/server"

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            db: DBClient,
            storage: StorageClient,
        }
		// interface PageData {}
		// interface PageState {}
		interface Platform {
            env?: Env,
        }
	}
}

export {};
