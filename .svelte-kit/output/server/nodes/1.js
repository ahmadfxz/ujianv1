

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.s0eDjdw6.js","_app/immutable/chunks/DfxLU_3W.js","_app/immutable/chunks/DlXFpOFv.js","_app/immutable/chunks/B8Eevg5d.js"];
export const stylesheets = [];
export const fonts = [];
