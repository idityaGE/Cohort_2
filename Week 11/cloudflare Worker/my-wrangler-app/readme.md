## How to deploy on cloudflare workers

1. Initialize a worker

```bash
npm create cloudflare -- my-app
```

- select sample of application
- select typescript / javascript
- select deployment to `no`

2. Start the worker locally

```bash
cd my-app
npm run dev
```

3. Explore package.json and src/index.ts

```typescript
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);

		if (request.method === 'GET') {
			return Response.json({
				message: 'you sent a get request',
			});
		} else {
			return Response.json({
				message: 'you did not send a get request',
			});
		}
	},
};
```

## Deploy to cloudflare

1. Login using wrangler

```bash
npx wrangler login
```

2. Deploy your worker

```bash
npx wrangler publish
```

3. Now go to the cloudflare dashboard and check the worker
4. Go to setting of your deployed worker
5. then go to trigger and there you will found and endpoint(link) of your deployed application
