

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.6V1i4ALx.js","_app/immutable/chunks/DfxLU_3W.js","_app/immutable/chunks/DlXFpOFv.js","_app/immutable/chunks/B8Eevg5d.js","_app/immutable/chunks/DLQ-_Clx.js"];
export const stylesheets = ["_app/immutable/assets/3.Ct1Pi-3d.css"];
export const fonts = [];
