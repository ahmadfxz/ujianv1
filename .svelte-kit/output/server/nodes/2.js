

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BFPGkLZq.js","_app/immutable/chunks/DfxLU_3W.js","_app/immutable/chunks/DlXFpOFv.js"];
export const stylesheets = ["_app/immutable/assets/2.82Joxpcs.css"];
export const fonts = [];
