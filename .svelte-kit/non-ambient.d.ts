
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/hasil" | "/konfirmasi-selesai" | "/login" | "/pembetulan-data" | "/petunjuk" | "/pilih-kelas" | "/pilih-mapel" | "/sertifikat" | "/soal";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/hasil": Record<string, never>;
			"/konfirmasi-selesai": Record<string, never>;
			"/login": Record<string, never>;
			"/pembetulan-data": Record<string, never>;
			"/petunjuk": Record<string, never>;
			"/pilih-kelas": Record<string, never>;
			"/pilih-mapel": Record<string, never>;
			"/sertifikat": Record<string, never>;
			"/soal": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/hasil" | "/hasil/" | "/konfirmasi-selesai" | "/konfirmasi-selesai/" | "/login" | "/login/" | "/pembetulan-data" | "/pembetulan-data/" | "/petunjuk" | "/petunjuk/" | "/pilih-kelas" | "/pilih-kelas/" | "/pilih-mapel" | "/pilih-mapel/" | "/sertifikat" | "/sertifikat/" | "/soal" | "/soal/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}