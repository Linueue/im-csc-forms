import cfAdapter from '@sveltejs/adapter-cloudflare';
import nodeAdapter from '@sveltejs/adapter-node';
import dotenv from "dotenv";

dotenv.config();

function getAdapter()
{
    if(process.env.ADAPTER == "CLOUDFLARE")
    {
        return cfAdapter({
            routes: {
                include: ["/*"],
                exclude: ["<all>"],
            },
            platformProxy: {
                configPath: "wrangler.toml",
                environment: undefined,
                experimentalJsonConfig: false,
                persist: false,
            },
        })
    }

    return nodeAdapter();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: getAdapter(),
	},
    alias: {
      "@/*": "./src/lib/*",
    },
};

export default config;
