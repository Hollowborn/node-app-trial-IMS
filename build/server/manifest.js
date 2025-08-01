const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","uploads/employees/7953bd97-ccb3-45b3-a2ca-a589be346c33.jpg","uploads/employees/8e3ea370-8680-48d6-b04e-68b763c5f42e.jpg","uploads/employees/a71758bc-2267-4b1e-8e02-c36fbe7f122f.jpg","uploads/employees/b5b9f682-fd4c-4e4b-b291-ce3486e41c61.jpg","uploads/profiles/1005422e-c22a-4a88-98fe-4045917e65fa.jpg","uploads/profiles/33087994-c7cf-44be-96c6-1df125c86465.jpg","uploads/profiles/51199c35-4b69-406c-83c2-af79a735f3df.jpg","uploads/profiles/514c534e-6e26-4ddc-8641-4aee2213da54.jpg","uploads/profiles/65dac272-f4e7-4598-9118-dcfdd2ea10e3.jpg","uploads/profiles/767e3d23-97d0-4dc8-8aef-57341dd4ceb3.png","uploads/profiles/7e047bb3-f933-4294-9faa-4e7a4ec7ccdf.jpg","uploads/profiles/934c6aee-ad9c-4d30-8ac4-f0a503b28e45.jpg","uploads/profiles/a2f6e75d-d14a-4955-be75-6c7f0d0ae989.png","uploads/profiles/b6708481-c276-4f24-80ac-e6d8691d20d6.jpg","uploads/profiles/cbfe4f1c-2a73-4d76-b2b4-8defdfea88e2.png","uploads/profiles/e0717832-5c0d-44aa-83aa-d28fec0c1154.png","uploads/profiles/e3141b56-b37d-4129-a9db-4b5d9a20eccd.jpg","uploads/profiles/ecd7bb41-9a90-4651-8376-705530e647d1.jpg","uploads/profile_images/1-1751782782640-25c85817-4d40-4cc1-b292-caf3be8b519e.jpg","uploads/profile_images/1-1751961734835-layos.jpg","uploads/profile_images/1-1751962092160-hercules.jpg","uploads/profile_images/1-1752233201422-hercules.jpg","uploads/profile_images/1-1752417740719-layos.jpg","uploads/profile_images/1-1752418128678-layos.jpg","uploads/profile_images/1-1752484108966-ladyknight.jpg","uploads/profile_images/1-1752484233474-layos.jpg","uploads/profile_images/1-1752484763576-layos.jpg","uploads/profile_images/1-1752486717618-Screenshot 2025-07-09 190417.png","uploads/profile_images/1-1752492769288-Screenshot 2025-07-01 235253.png","uploads/profile_images/1-1752553432961-download (10).jpg","uploads/profile_images/1-1752557361280-download (9).jpg","uploads/profile_images/1-1752580624073-download (10).jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BYTwlP2u.js",app:"_app/immutable/entry/app.Ctj6QAkH.js",imports:["_app/immutable/entry/start.BYTwlP2u.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/entry/app.Ctj6QAkH.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BxwOPTHF.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-WOBVOARg.js')),
			__memo(() => import('./chunks/1-BwIk0Tu7.js')),
			__memo(() => import('./chunks/2-Bw9mOJ7d.js')),
			__memo(() => import('./chunks/3-DASoZnA9.js')),
			__memo(() => import('./chunks/4-BRFmLS_D.js')),
			__memo(() => import('./chunks/5-BG0B_wpH.js')),
			__memo(() => import('./chunks/6-SAAIeWWI.js')),
			__memo(() => import('./chunks/7-BVU2R9u5.js')),
			__memo(() => import('./chunks/8-DDIAgKM3.js')),
			__memo(() => import('./chunks/9-ChflVDIc.js')),
			__memo(() => import('./chunks/10-B_8hMULH.js')),
			__memo(() => import('./chunks/11-DjtHgjQE.js')),
			__memo(() => import('./chunks/12-DofMCal8.js')),
			__memo(() => import('./chunks/13-CdqAREnL.js')),
			__memo(() => import('./chunks/14-O2vjjUbF.js')),
			__memo(() => import('./chunks/15-1BQ_O-GD.js')),
			__memo(() => import('./chunks/16-Db1jrmAA.js')),
			__memo(() => import('./chunks/17-CoGUQWND.js')),
			__memo(() => import('./chunks/18-BLxOyJ9O.js')),
			__memo(() => import('./chunks/19-w1inlPtq.js')),
			__memo(() => import('./chunks/20-BczF9jsr.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/download-db",
				pattern: /^\/api\/download-db\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-4dLiWv09.js'))
			},
			{
				id: "/api/uploads/[...path]",
				pattern: /^\/api\/uploads(?:\/(.*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BnDS0MuQ.js'))
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dashboard/bookings",
				pattern: /^\/dashboard\/bookings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard/clients",
				pattern: /^\/dashboard\/clients\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/clients/[clientId]/stocking-info",
				pattern: /^\/dashboard\/clients\/([^/]+?)\/stocking-info\/?$/,
				params: [{"name":"clientId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/clients/[clientId]/stocking-info/[stockingId]/harvest-info",
				pattern: /^\/dashboard\/clients\/([^/]+?)\/stocking-info\/([^/]+?)\/harvest-info\/?$/,
				params: [{"name":"clientId","optional":false,"rest":false,"chained":false},{"name":"stockingId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/clients/[clientId]/stocking-info/[stockingId]/sales",
				pattern: /^\/dashboard\/clients\/([^/]+?)\/stocking-info\/([^/]+?)\/sales\/?$/,
				params: [{"name":"clientId","optional":false,"rest":false,"chained":false},{"name":"stockingId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/employees",
				pattern: /^\/dashboard\/employees\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/guide",
				pattern: /^\/dashboard\/guide\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory/feeds",
				pattern: /^\/dashboard\/inventory\/feeds\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/dashboard/inventory/hardware",
				pattern: /^\/dashboard\/inventory\/hardware\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/dashboard/ponds",
				pattern: /^\/dashboard\/ponds\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/ponds/[pondId]",
				pattern: /^\/dashboard\/ponds\/([^/]+?)\/?$/,
				params: [{"name":"pondId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/search-results",
				pattern: /^\/dashboard\/search-results\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/login-05",
				pattern: /^\/login-05\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/unauthorized",
				pattern: /^\/unauthorized\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
